"""
app.py:
- contains main code with app routes
- frontend can fetch and send payloads to endpoints (routes)
- login, logout
- signup, delete account
"""
import os

#------------    <imports>    ------------#
try:
    import fade
    from flask import Flask, request, jsonify, session
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import db, User
except ImportError:
    print("installing dependencies...")
    os.system("pip install -r requirements.txt")
    import fade
    from flask import Flask, request, jsonify, session
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

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

#------------ </app construct> ------------#


#------------ <app routes ------------#
@app.route('/api/test')
def test():
    # test if api works CALLABLE from client
    print(f"SUCCESS -- called message from BACKEND")
    return jsonify({
        "message": "BACKEND IS WORKING!"})

@app.route("/api/@me")
def get_current_user():
    # get the client user and check if they are authorized
    user_id = session.get("user_id")

    if not user_id:
        # if user id is not found in session
        return jsonify({"error": "Unauthorized"}), 401

    # if found do this
    user = User.query.filter_by(id=user_id).first() # query user from database
    return jsonify({
        # return json data to client for storage
        "id": user.id,
        "username": user.username
    })


@app.route("/api/register", methods=["POST"])
def register_user():  # register a new user

    #request json data from client (username and password)
    username = request.json["username"]
    password = request.json["password"]

    # CHECK IF USER EXISTDS IN DATABASE
    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        # if they do exist, notify client that user exists and prevent duplicate accounts
        return jsonify({"error": "User already exists"}), 409

    # ---- security methods (encryption/hasing passwords) ----#
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    # ---- </security methods> ----#

    # store user id in session
    session["user_id"] = new_user.id

    # return json data to client for storage
    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    })


@app.route("/api/login", methods=["POST"])
def login_user(): # login a user by checking if they exist in database and if password is correct

    # request json data username and password
    username = request.json["username"]
    password = request.json["password"]

    # query in database for user
    user = User.query.filter_by(username=username).first()

    if user is None: #if requested username and password not found
        return jsonify({"error": "Unauthorized"}), 401

    # check if password is correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id # store user id in session

    # return to client user id and username
    return jsonify({
        "id": user.id,
        "username": user.username
    })


@app.route("/api/logout", methods=["POST"])
def logout_user(): # logout a user by removing user id from session
    session.pop("user_id") # remove session from storage
    return "200"

#------------ </app routes> ------------#

#------------ <app run> ------------#
if __name__ == "__main__":
    app.run(debug=False)
#------------ </app run> ------------#



