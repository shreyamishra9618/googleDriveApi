<p align="center">
    <img src="https://img.shields.io/badge/Javascript-yellow" />
    <img src="https://img.shields.io/badge/express-orange" />
    <img src="https://img.shields.io/badge/dotenv-green" />
    <img src="https://img.shields.io/badge/node.js-blue"/>
  
</p>

# Google Drive Api Project
## User Story
Build an app (preferably in Javascript/NodeJS) where you connect to Google Drive and

* list files,

* download files

* list all users who have access to a file

* It should also be real time where if new users are added to the file, in real time, you get an  event and you display the new users. Similarly, if users are removed from the file.

## Prerequisites
To use this app, you will need:\
A Google account\
Node.js installed on your machine\
A client ID and client secret for the Google Drive API, which can be obtained by creating a new project in the Google Developers Console and enabling the Drive API.


## Project setup
   Create a directory named drive-api-node by executing the command below
   or alternately you can create a repository on github and use git clone "your http/ssh key"
   ``` 
   mkdir googgledriveapi
   cd googgledriveapi
   ```
   To create the Node.js application, we will run the command below to initialize a package.json file.
   ```
   npm init -y
   npm i express googleapis dotenv fs http open url
   ```
   ### Setting up Auth credentials
   We need a client ID and secret to access the drive storage.

## Steps to enable Google Drive API for your project
1. Visit [console.cloud.google.com](https://console.cloud.google.com/) and login with your Google account.
2. Create a new project by clicking on the project dropdown menu on the top right corner of the page. If you already have a project, you can skip to step 3.
3. Select your project from the project dropdown menu, then click on the "APIs & Services" tab on the left-hand sidebar.
4. Click on the "ENABLE APIS AND SERVICES" button, then search for "Google Drive API" in the search box and enable it for your project.
5. Once the API is enabled, you need to create credentials to access it. Click on the "CREATE CREDENTIALS" button and select "OAuth client ID" from the dropdown menu.
6. Select "Web application" as the application type and enter a name for your client ID. In the "Authorized JavaScript origins" field, enter the origin of your application (e.g., `http://localhost:3000`). In the "Authorized redirect URIs" field, enter the URL that Google should redirect the user to after they authenticate (e.g., `http://localhost:3000/callback`).
7. Next, click on the "CONFIGURE CONSENT SCREEN" button and fill out the required fields. Once you've saved your changes, return to the credentials screen.
8. On the credentials screen, you should see your client ID and client secret. Copy these values to your application.
9. To test your application, you'll need to add a user to the authorized user list. Click on the "ADD USER" button and enter the email address of a Google account that you want to test the application with.

## Installation
To use this code, follow these steps:

Clone this repository to your local machine.
Install the dependencies by running npm install.
Set the client ID and client secret in the code.
Start the server by running npm start.

## Usage & Detailed Explanation
This is a program that uses the Google Drive API to do things like list files, download files, and list users who have access to a file. Here's a step-by-step explanation:

1. The program starts by importing some libraries that it needs to run, like 'googleapis', 'http', 'url', 'dotenv', and 'fs'.
2. Then, it loads some environment variables from a file called ".env" using the 'dotenv' library.
3. It sets up a 'PORT' variable to 8080.
4. It creates a new 'OAuth2' object from the 'google.auth' library, which will handle the authentication with the Google Drive API.
5. Next, it creates a 'drive' object using the 'google.drive' library, which will allow the program to interact with the Google Drive API.
6. Then, it sets up a server using the 'http' library that will handle OAuth2 callbacks. This is necessary because the Google Drive API requires the user to log in and authorize the program to access their files.
7. The program defines some functions that will interact with the Google Drive API, like 'listFiles()', 'downloadFile()', 'listUsers()', and 'watchFile()'. These functions perform tasks like listing files in the user's Drive account, downloading a file by its ID, listing users who have access to a file, and setting up real-time notifications using Push Notifications.
8. The program starts the server and opens the OAuth2 login page in the user's default browser using the 'open' library. This will allow the user to log in and authorize the program to access their files.
9. Finally, the program exports the functions for use in other modules.


This example includes three functions:

listFiles(): Lists all files in the user's Drive account.
downloadFile(fileId, destPath): Downloads a file by ID to the specified destination path.
listUsers(fileId): Lists all users who have access to a file by ID.
You can use these functions in your own code by importing the google-drive-api-nodejs-example module:

```
const googleDrive = require('google-drive-api-nodejs-example');

googleDrive.listFiles()
  .then(files => {
    console.log(files);
  })
  .catch(err => {
    console.error(err);
  });
  ```

## Credits 
The site is created by Shreya Mishra.
 
You can find my other projects here:  [Shreya](https://github.com/shreyamishra9618)

## License
This code is licensed under the MIT License.






