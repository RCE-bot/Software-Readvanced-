# Software Readvanced PWA App Development 

## Project requirements
- nodejs (npm)
- python (backend, auto setup)
- git (to clone the project)
  - ``you can also install the project through releases or press code -> download the zip file``
- ``recommend operating system: windows``
  - project was build and developed on the windows environment
## Project description
- first react project for year12 AT1

    - uses react to run
    - uses tailwind for styling
    - uses gsap for animations
    - uses vite for running in browser (testing, production)
    - uses nodejs for package install , base

## Running the app on your machine (automation)

### option 1
1. run this in cmd (requires git installed on computer) or download the zip file and unzip it
```sh
git clone https://github.com/Airstriker123/Software-Readvanced.git
cd Software-Readvanced
python run.py
```
``open run.py to start (if it does not open)``

2. select option 2 (production) to build into raw html,css,js 
- this will open the client server and database server



## Running the app on machine (manual)

1. head into the server directory
2. run start.py
   - this will start backend api server
3. head into client directory
4. open terminal in the client directory
5. run command below to install
```sh 
npm i  
``` 
6. then run the command below to compile app into html,css,js
```sh
npm run build
```  
7. finally run this command to run the app
```sh
npm run serve  
```
- run the script in order 1. build 2. serve
8. pwa should be running now
