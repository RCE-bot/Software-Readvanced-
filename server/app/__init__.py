# construct api endpoints from endpoint package
try:
    from flask import Flask
    from .models import Models
    from .endpoints import endpoints
except ImportError:
    print('could not import models/endpoints from app/__init__.py')

# construct app use __main__
def create_app():
    app = Flask("api.software-readvanced")
    app.register_blueprint(endpoints)
    Models(app)
    return app