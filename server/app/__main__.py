import os
import colorama
try:
    from . import app
except ImportError:
    print("error: installing required packages!")
    os.system("pip install -r requirements.txt")
    import colorama

class Banner(object):
    def __init__(self):
        self.banner = \
"""

"""

if __name__ == "__main__":
    os.system("color 5")
    app.run(debug=True)

