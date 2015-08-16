##Running the code
Before running the sample, make sure you have Node.js installed and gulp package is installed globally on your system.

After cloning the sample, open a command prompt and run the following commands to install the dependencies:

 -  npm install (to install node.js dependencies)
 -  bower install (to install front-end packages)

The sample is an Angular application written in ES6. It uses Babel to transpile the code to ES5. It converts the modules into either AMD or, CommonJS depending on the Gulp task you choose to run.

 -  gulp amd (Converts the code to ES5 with AMD style modules and starts Node.js server)
 -  gulp commonjs (Converts the code to ES5 with CommonJS style modules and starts Node.js server)

After running one of the above commands, you will have to uncomment/comment a section on index.html file. I have put comments in that file to make it easy to identify the sections. Once you made the change, open a browser and change the URL to http://localhost:8000
