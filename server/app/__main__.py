import os
import colorama
try:
    from app import create_app
    app = create_app()
except Exception as e:
    print("error: installing required packages!")
    os.system("pip install -r app/requirements.txt")
    import colorama
    from app import create_app
    app = create_app()


class Banner(object):
    def __init__(self):
        self.banner = \
"""

"""

if __name__ == "__main__":
    os.system("color 5")
    app.run(debug=True)

