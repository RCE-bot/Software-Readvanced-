import os

class Banner(object):
    """
    class stores look of banner
    - cosmetic for terminal does nothing but display server text development
    """
    def __init__(self):
        self.banner = \
"""
·▄▄▄▄  ▄▄▄▄·     .▄▄ · ▄▄▄ .▄▄▄   ▌ ▐·▄▄▄ .▄▄▄  
██▪ ██ ▐█ ▀█▪    ▐█ ▀. ▀▄.▀·▀▄ █·▪█·█▌▀▄.▀·▀▄ █·
▐█· ▐█▌▐█▀▀█▄    ▄▀▀▀█▄▐▀▀▪▄▐▀▀▄ ▐█▐█•▐▀▀▪▄▐▀▀▄ 
██. ██ ██▄▪▐█    ▐█▄▪▐█▐█▄▄▌▐█•█▌ ███ ▐█▄▄▌▐█•█▌
▀▀▀▀▀• ·▀▀▀▀      ▀▀▀▀  ▀▀▀ .▀  ▀. ▀   ▀▀▀ .▀  ▀
"""

        self.faded_banner = Banner.purplepink(self.banner)




    @staticmethod
    def purplepink(text):
        """
        method to print a banner gradient purple gradient in this case
        """
        faded = ""
        red = 40
        for line in text.splitlines():
            faded += (f"\033[38;2;{red};0;220m{line}\033[0m\n")
            if not red == 255:
                red += 15
                if red > 255:
                    red = 255
        return faded

print(Banner().faded_banner) #print banner
os.system("python app.py") #start the actual backend
