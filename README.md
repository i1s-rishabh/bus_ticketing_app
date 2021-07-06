# bus_ticketing_app

In this project, I have made a bus ticketing app using node and express, where a user can book the tickets and a particular admin can add his bus.
I have used  JWT authentication to verify if the user is valid or not. I am using Mongodb Atlas database to store the data.


## Installation process and Execution


First and foremost, install the latest version of NodeJS and npm.
in your system, if it is not installed yet. 
    
You can also check the version of NodeJS and npm by writing
    `node -v` and `npm -v`

Next, you need to make a clone of this repository and get into the repository on your terminal and hit the command "cd backend". Now, you need to install the required dependencies from your `package.json`.
For this, you've to write `sudo npm install`.


Open the repo in text editor,in backend, create a file default.json in config folder.
Create an object "{ }" 
put "mongoURL" as a key and set your mongodb atlas url as the value of that key.
put "jwtSecret" as a key and set a random string.


Run "npm start" command
Now you will se "Server is running at port 4000"
                'MongoDB Connected'


Now, you need to install postman, that helps you to develop APIs and getting responses from it, by writing the following commands on your terminal.

    sudo apt-get install snap
    snap install postman

Now open the the postmon and hit the api's

Happy coding ):
