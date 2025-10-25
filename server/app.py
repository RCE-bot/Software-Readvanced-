"""
app.py:
- contains main code with app routes
- frontend can fetch and send payloads to endpoints (routes)
- login, logout
- signup, delete account
"""
import os
try:
    import fade
    from flask import Flask, request, jsonify, session
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import db, User
except ImportError:
    os.system("pip install -r requirements.txt")
    import fade
    from flask import Flask, request, jsonify, session
    from flask_bcrypt import Bcrypt
    from flask_cors import CORS, cross_origin
    from flask_session import Session
    from config import ApplicationConfig
    from models import db, User



app = Flask("api.software.readvanced")
app.config.from_object(ApplicationConfig)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username
    })


@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    })


@app.route("/login", methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=False)



