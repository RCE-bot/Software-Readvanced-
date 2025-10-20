# construct api endpoints from endpoint package
from flask import Flask
from .db import Database
from .models import Models
from .endpoints import endpoints

def create_app():
    app = Flask(__name__)
    app.register_blueprint(endpoints)
    return app
