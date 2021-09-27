# SpaiceChallenge
Create a react program to parse JSON file and create a nested list

## How to Run
Requires a local server to run as well as the react app. Navigate to their respective directories and use `npm install` to install dependencies. Afterwards run both applications using the command `npm start`. The local server uses the port 3001 which can be edited to another value by changing the `PORT` variable in the `.env` file. 

If the `PORT` is edited the login and register components located in the spaice-challenge react app will need to be edited. Axios.post will default have  this address `"http://localhost:3001/login"` so the port # will have to be changed accordingly.

The `.env` file should be placed in the server directory.

If the server index.js file is not run the tree viewing and fetching functionality will still work but the login/registration functionality will not so the testing of editing nodes and uploading JSON files will not work.

Login/Registration Functionality might take a bit to load due to Heroku having to initialize when it hasn't been loaded for a while.

## Summary of the Assignment
In this assignment was to create a react application that can display a collapsible JSON tree, for any valid JSON file, as well as edit the values within the tree. The specific functionality required is:
- Expansion and collapse of the JSON treee
- Allowing the editing of nodes in the tree
- Node types being displayed
- Authentication
- File Handling
- SQL database

## Overall Approach
To get the base functionality of the application I used a recursive approach that iterated over the whole JSON file. It would check whether or not each node had a child node and if it did would continue to make subheadings until it reached the end where it would print out the value. This allowed for the JSON data to be rendered in an accordion like structure allowing for each heading to expand and collapse based on information located inside. Once it reached the end I created a function that allowed one to edit the values of the final nodes if they were authenticated. 

Authentication was done by creating a server file using express and Node JS to query a database hosted on heroku to see if the user's login information was correct or to see if the registering user had information that already matched what was on the database. Once logged in the state of the user was set allowing for one to edit the child nodes on the tree as well as enter an admin dashboard that allowed one to upload any JSON file and view how it would look.

## Features Implemented
- Expansion and collapsing of the JSON tree
- Editing of the JSON nodes
- Stating the type of data of the nodes
- Basic login/registration functionality (express, nodeJs, axios, cors)
- Protected Routes
- SQL database on Heroku containing user data
- Download JSON files
- Upload and view JSON files

## Given more time, what else would you have liked to complete?
- Nicer UI
- Addition/Removal of nodes
- Editing of main tree node so that when a user downloads the JSON file it will contain the edits
  - my method involved the use of recursion making the passing down of states messy, but for an iterative version I could just edit the direct state
- JWT encoding for the login/registration information
- Better testing methods
- Allow the editing of nodes other than the leaf nodes
- Host both server and application on Heroku or an alternative
- Email response using Sendgrid to notify user of proper registration.
