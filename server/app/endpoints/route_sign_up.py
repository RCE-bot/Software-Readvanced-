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
        self._username = username #private
        self._password = password  #private
        self._database = "database/app.db" #database path
        if self._username not in self._database:
            pass
            #add variables to database and redirect


@endpoints.route('/api/signup', methods=['POST', 'GET'])
def getSignUp():
    pass



