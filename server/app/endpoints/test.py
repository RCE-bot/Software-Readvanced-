# endpoints/test.py
from . import endpoints
from flask import jsonify

@endpoints.route('/api/test')
def test_route():
    return jsonify({"message": "SOFTWARE READVANCED BACKEND IS WORKING!"})
