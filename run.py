import os

"""
BEGIN server_setup
	server_dir = "server/run.bat"
	OUTPUT "server starting!"
	IF server_dir NOT found THEN
		OUTPUT "failed to start server not found!"
	ELSE
		OUTPUT "server started"
		START(server_dir)	// run the server
	ENDIF
END server_setup 
"""
def server_setup():
    """
    handle running server
    - automation
     - runs the server
     - installs external requirements.txt
    """
    os.system(r'color E')
    print("🚀 Starting backend server...")
    os.system(r'start cmd /k "cd server && python -m app"') #no need for if statement cmd will display error if file not found

"""
BEGIN client_setup
	client_dir = "client/run.py" // path to running client
	IF client_dir NOT found THEN
		OUTPUT "could not start client file not found!"
	ELSE
		OUTPUT "client started"
		START(client_dir) // run the client
	ENDIF
END client_setup
"""
def client_setup():
    """
    handle running client
    - automation
        - installs client dependencies for user
        - runs client for user
        - saves time to users with less experience
    """
    os.system(r'color 2')
    print("🚀 Starting frontend client...")
    # logic to setup client
    os.chdir("client") #change dir to client folder
    if not os.path.exists("node_modules"):              # check if user ran npm i
        os.system(r'color E')
        # handle installing endpoints and running client
        print("installing client dependencies...")
        os.system("npm i")
        os.system("npm run dev")
    else:
        #handle running client
        os.system(r'color B')
        print("running client")
        os.system("npm run dev")

# run functions + handle if script is ran

"""
BEGIN main
	// RUN THE PROCEDURES
	// this procedure will be entrance to the pwa
	server_setup()
	client_setup()
END main
"""
if __name__ == "__main__":
    try:
        server_setup()
        client_setup()
    except Exception as e:
        print('failed to setup ')
        print(e)
else:
    print("invalid use!")
    print("run this script to setup frontend + backend")