"""
app.py:
- contains main code with app routes
- frontend can fetch and send payloads to endpoints (routes)
- login, logout
- signup
"""
#------------    <imports>    ------------#
import os

try:
    import fade
    from flask import Flask, request, jsonify, session, Response
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import init_db, get_db_connection, get_uuid
except ImportError:
    print("installing dependencies...")
    os.system("pip install -r requirements.txt")
    import fade
    from flask import Flask, request, jsonify, session, Response
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import init_db, get_db_connection, get_uuid
#------------ </imports>    ------------#


# ... (imports remain the same, remove 'models' and 'flask_sqlalchemy')


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

# Initialize the table on startup
with app.app_context():
    init_db()


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
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db_connection()
    # SQL QUERY: Fetch user by ID
    user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user["id"],
        "username": user["username"]
    })


@app.route("/api/register", methods=["POST"])
def register_user():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_db_connection()
    # SQL QUERY: Check if user exists
    user_exists = conn.execute('SELECT id FROM users WHERE username = ?', (username,)).fetchone()

    if user_exists:
        conn.close()
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_id = get_uuid()

    # SQL QUERY: Insert new user
    try:
        conn.execute('INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
                     (new_id, username, hashed_password))
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

    conn.close()
    session["user_id"] = new_id
    return jsonify({"id": new_id, "username": username}), 200


@app.route("/api/login", methods=["POST"])
def login_user():
    username = request.json.get("username")
    password = request.json.get("password")

    conn = get_db_connection()
    # SQL QUERY: Find user by username
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if user is None or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user["id"]
    return jsonify({"id": user["id"], "username": user["username"]})

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

