"""
app.py:
- contains main code with app routes
- frontend can fetch and send payloads to endpoints (routes)
- login, logout
- signup
"""
#------------    <imports>    ------------#
import os
import logging
from typing import Union, Tuple
try:
    import fade
    from flask import Flask, request, jsonify, session, Response
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import db, User
except ImportError:
    print("installing dependencies...")
    os.system("pip install -r requirements.txt")
    import fade
    from flask import Flask, request, jsonify, session, Response
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import db, User
#------------ </imports>    ------------#


#------------ <app construct>    ------------#
"""
BEGIN app init
    // create app instance
    // configure app
    // initialize bcrypt
    // initialize cors
    // initialize session
    // initialize database
    // create tables
END app init
"""
app = Flask("api.software.readvanced")
app.config.from_object(ApplicationConfig)

"""
Bcrypt class container for password hashing and checking logic using bcrypt,
of course. This class may be used to initialize the Flask app object.
The purpose is to provide a simple interface 
for overriding Werkzeug's built-in password hashing utilities.
"""
bcrypt = Bcrypt(app) #hashing method
CORS(app, supports_credentials=True)
server_session = Session(app) #api server
db.init_app(app) #construct database
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING) #stop spam sql in terminal


with app.app_context():
    db.create_all()

#------------ </app construct> ------------#


#------------ <app routes ------------#


#base route when open api url
@app.route("/")
def base() -> str:
    return \
"""
<style> 
    :root
    {
    background-color: black;
    color: red;
    }
</style>
<h1>welcome to the backend api of SR </h1> 
<p>
- to fetch data use a valid endpoint e.g /api/test <br>
- to view client use the vite server terminal and press <br>
the o key<br>
- make sure proxy server is set to the ip running on this server or client will not connect to backend
</p>
"""
@app.route('/api/test')
def test() -> Response:
    # test if api works CALLABLE from client
    print(f"SUCCESS -- called message from BACKEND")
    return jsonify(
    {
        "message": "BACKEND IS WORKING!",
    }
)

@app.route("/api/@me")
def get_current_user() -> Union[Response, Tuple[Response, int]]:
    # get the client user and check if they are authorized
    user_id = session.get("user_id")

    if not user_id:
        # if user id is not found in session
        return jsonify(
        {
            "error": "Unauthorized"
        }
    ), 401

    # if found do this
    user = User.query.filter_by(id=user_id).first() # query user from database
    return jsonify(
    {
        # return json data to client for storage
        "id": user.id,
        "username": user.username
    }
)


@app.route("/api/register", methods=["POST"])
def register_user() -> tuple:  # register a new user
    """
BEGIN registeruser(username,password)
		username = get input from client user
		password = get input from client user
		IF username does not exist in database THEN
			append username,password to database
			DISPLAY "account created"
			renderapp = redirect to homepage with login(username,password)
		ELSE
			DISPLAY "username taken!"
		ENDIF
END registeruser(username,password)
    """
    # as you can tell from amount of exceptions that function was annoying to code
    try:
        try:
            # request json data from client (username and password)
            username = request.json["username"]
            password = request.json["password"]
        except KeyError as e:
            print(f"[ERROR] failed to fetch username and password from client \n {e}")
            return()
        try:
            # CHECK IF USER EXISTDS IN DATABASE
            user_exists = User.query.filter_by(username=username).first() is not None

            if user_exists:
                # if they do exist, notify client that user exists and prevent duplicate accounts
                return jsonify(
                {
                    "error": "User already exists"
                }
            ), 409
        except KeyError as e:
            print(f"[ERROR] failed to perform SQL query in database \n {e}")
            return()

        try:
            # ---- security methods (encryption/hasing passwords) ----#
            hashed_password = bcrypt.generate_password_hash(password)
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            # ---- </security methods> ----#
        except Exception as e:
            print(f"[ERROR] failed to perform hashing/encrypting of account \n {e}")
            return()

        print("[SUCCESS] user registered")
        # store user id in session
        session["user_id"] = new_user.id

        # return json data to client for storage
        return jsonify(
        {
            "id": new_user.id,
            "username": new_user.username
        }
    ) , 200

    except Exception as e:
        print("[FAILED ROUTE] at account creation /api/register")
        print(e)
        return()

@app.route("/api/login", methods=["POST"])
def login_user(): #login a user by checking if they exist in database and if password is correct
    """
BEGIN Login(username,password)
	username = get input from the client user
	password = get input from the client user
	User_id = username and password
	IF User_id does not match database records THEN
		DISPLAY "invalid username or password"
	ELSE
		renderapp = redirect to homepage with login(username,password)
		session_id = append user_id to local storage
	ENDIF
END Login(username,password)
    """

    # request json data username and password
    username = request.json["username"]
    password = request.json["password"]

    # query in database for user
    user = User.query.filter_by(username=username).first()

    if user is None: #if requested username and password not found
        return jsonify(
        {
            "error": "Unauthorized"
        }
    ), 401

    # check if password is correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify(
        {
            "error": "Unauthorized"
        }
    ), 401

    print("[SUCCESS] A USER LOGGED IN!")
    session["user_id"] = user.id # store user id in session
    # return to client user id and username
    return jsonify(
    {
        "id": user.id,
        "username": user.username
    }
)

#------------ </app routes> ------------#

#------------ <app run> ------------#
if __name__ == "__main__":
    app.run(port=5000 , debug=False)
    #  BACKEND NEEDS TO BE RUNNING ON http://127.0.0.1:5000
    """
     IF IT IS NOT - CHANGE VITE.CONFIG.TS SERVER PROXY URL 
     TO WHATEVER URL BACKEND IS RUNNING ON 
     OR CLIENT WILL NOT CONNECT TO BACKEND 
    """
#------------ </app run> ------------#

