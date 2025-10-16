import os
try:
    from . import app
except ImportError:
    print("error: installing required packages!")
    os.system("pip install -r requirements.txt")
    from . import app


if __name__ == "__main__":
    app.run(debug=True)

