# endpoints/test.py
# example request for testing purposes to determine if api is hooked to backend
from . import *

#store message and different tests
class Test:
    def message(self):
        print(f"SUCCESS -- called message from BACKEND")
        return {
            "message": "BACKEND IS WORKING!"
        }

#fetch from class
@endpoints.route('/api/test')
def test_route():
    return jsonify(Test().message())

