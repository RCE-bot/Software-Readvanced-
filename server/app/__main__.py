import os
"""
Flask Login System with SQLite
Features:
- Signup (create new account)
- Login (check user credentials)
- Session (to remember login state)
- Cookies (to store last visit info)
- "Remember Me" option (stay logged in even after closing browser)
"""
# fetch app when running as package
try:
    from app import create_app
    app = create_app()
except Exception as e:
    # if error occurs (import error/ packages not found)
    os.system('color 4')
    print("error: installing required packages!")
    os.system("pip install -r app/requirements.txt")
    from app import create_app
    app = create_app()
app.run(debug=False) # should be set to false in final submit