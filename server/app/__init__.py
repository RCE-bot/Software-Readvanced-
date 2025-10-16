# construct api endpoints from endpoint pacage
from .endpoints import endpoints
from .db import Database
from .models import Models

from flask import Flask
from .endpoints import endpoints

app = Flask(__name__)
app.register_blueprint(endpoints)


