import os
try:
    from app import create_app
    app = create_app()
except Exception as e:
    os.system('color 4')
    print("error: installing required packages!")
    os.system("pip install -r app/requirements.txt")
    from app import create_app
    app = create_app()
app.run(debug=False)