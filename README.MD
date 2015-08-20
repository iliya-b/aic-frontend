
Cloning the project
===================

Use the option --recursive in order to clone also the subprojects
dependencies (like NoVNC).

Example:

```
git clone git@git.android-in-cloud.com:aic_vm/front-end-app.git -b proto1 --recursive
```

Development installation
========================

Run ```npm install``` to install all packages needed to start the
project.


Run ```npm start``` to start a development web server and open then
application in the browser.


Run ```npm build``` to build the project at build/ folder. Any
webserver can be used to serve this folder and run the application.


Application configuration files are in ```src/app/configs/*```

The backend vertx machine IP can be changed at ```src/app/configs/app-config.jsx``` .

You can also use the following environment variables to set the
front-end configuration (before ```npm start``` or ```npm build```):

Variables         | Default       | Description
------------------|---------------|-----------------------------------
BACKEND_PROTOCOL  | 'http'        | Protocol of the backend API host
BACKEND_HOST      | 'localhost'   | IP/Domain of the backend API host
BACKEND_PORT      | '12345'       | Port of the backend API host
BACKEND_TIMEOUT   | 5000          | Value in miliseconds for timeout the API calls