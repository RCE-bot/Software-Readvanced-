# construct api endpoints from endpoint package
from flask import Flask
from .models import Models
from .endpoints import endpoints

# construct app use __main__
def create_app():
    app = Flask(__name__)
    app.register_blueprint(endpoints)
    return app


