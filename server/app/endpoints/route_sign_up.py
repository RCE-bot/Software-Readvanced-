from flask import Flask, jsonify
from . import endpoints


class SignUp(object):
    """Handles signup process and communicates with database"""
    """
BEGIN SignUp
		username = get input from user
		password = get input from user
		IF username NOT exist in database THEN
			append.database(username, password)
			OUTPUT "account created"
			REDIRECT to homepage with login(username,password)
		ELSE
			OUTPUT "username taken!"
		ENDIF
END SignUp 
"""
    def __init__(self, username, password):
        if request.method == "POST":  # When user submits the form
            username = request.form["username"]
            password = request.form["password"]

            conn = get_db_connection()
            try:
                # Insert new user into database
                conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
                conn.commit()
                conn.close()

                # After signup, redirect to login page
                return redirect(url_for("login"))

            except sqlite3.IntegrityError:
                # This happens if the username already exists
                return "Username already exists! Try another."

            # If GET request, show signup form
        return render_template("signup.html")

@endpoints.route('/api/signup', methods=['POST', 'GET'])
def getSignUp():
    pass



