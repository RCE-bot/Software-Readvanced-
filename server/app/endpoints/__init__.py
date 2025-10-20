from flask import Blueprint

# Create a Blueprint called 'endpoints'
endpoints = Blueprint('endpoints', __name__)

# Import all your route files (they will attach their routes to `endpoints`)
try:
    from . import route_delete_account
    from . import route_log_out
    from . import route_login_in
    from . import route_sign_up
    from . import test
    print("Loaded endpoints successfully!")
except ImportError as e:
    print(f"{e}\nFailed to construct endpoint packages\nat: app/endpoints/__init__.py")
