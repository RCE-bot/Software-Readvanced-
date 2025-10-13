import os

def server_setup():
    """
    handle running server
    - automation
     - runs the server
     - installs external requirements
    """
    print("🚀 Starting backend server...")



def client_setup():
    """
    handle running client
    - automation
        - installs client dependencies for user
        - runs client for user
        - saves time to users with less experience
    """
    print("🚀 Starting frontend client...")
    os.chdir("client")
    if not os.path.exists("node_modules"):
        print("installing client dependencies...")
        os.system("npm i")
        os.system("npm run dev")
    else:
        print("running client")
        os.system("npm run dev")


if __name__ == "__main__":
    try:
        server_setup()
        client_setup()
    except Exception as e:
        print('failed to setup ')
        print(e)

