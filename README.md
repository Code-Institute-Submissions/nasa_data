# Kepler Data-set Dashboard
## Overview
### What is this app for?
This dashboard looks at data gathered by the Keplar telescope.

Although this project will be focusing on plotting data for Kepler's data-sets on exo-planets, 
Ive added in a tab for stars too.

In future i hope to continue this project by adding graphs for star objects observed by the Kepler telescope, and cross refernce the two to
try work out if a exo planet is in a stars 'habitability zone'. However this would requiring learning the math first. If any of that is at all possible that is!

### What does it do?
The dashboard plots the different methods used to find exo-planets, and crossfilters the data against:
- Year found
- Classification list (which could be used to find out the reliabilty of each method)
- Type of planet list (can be used to see which method is best at identifying different types)
- Provides a table with records of the planets

### How does it work
- Mongodb for hosting and storing data
- Crossfilter for filtering the data for the charts
- Dc for the charting 
- Thanks to Nasa for making their datasets avaible to the public
## Features
### Existing Features


### Features Left to Implement
- Star graphs
- Habitability calculator
## Tech Used
### Some the tech used includes:
- [Bootstrap](http://getbootstrap.com/)
	- We use **Bootstrap** to give our project a simple, responsive layout
- [npm](https://www.npmjs.com/)
	- We use **npm** to help manage some of the dependencies in our application
- [bower](https://bower.io/)
	- **Bower** is used to manage the installation of our libraries and frameworks
- [AngularJS](https://angularjs.org/)
	- We use **AngularJS** to handle page routing
## Contributing

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After you've that you'll need to make sure that you have **npm** and **bower** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
  2. Once you've done this you'll need to run the following command:
  	 `npm install -g bower # this may require sudo on Mac/Linux`
3. Once **npm** and **bower** are installed, you'll need to install all of the dependencies in *package.json* and *bower.json*
  ```
  npm install

  bower install
  ```
4. After those dependencies have been installed you'll need to make sure that you have **http-server** installed. You can install this by running the following: ```npm install -g http-server # this also may require sudo on Mac/Linux```
5. Once **http-server** is installed run ```http-server```
6. The project will now run on [localhost](http://127.0.0.1:8080)
7. Make changes to the code and if you think it belongs in here then just submit a pull request