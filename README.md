# cs426 - RockFIIT

## About RockFIIT
Our creators all have a background in some sort of fitness, some of us are rock climbers, some of us are weightlifters, and some of us are both. The goal of RockFIIT, was to create an application that merged both these aspects of fitness together. Creating one centralized application where climbers and lifters could log their exercises, create their own programs and set their own fitness goals. 

1. RockFIIT Functionalities
   - Home Screen
     - Graph that displays data based on logged exercises
     - Timer, so the user is able to time their rest in between sets
     - Log Exercise button, that takes the user to a modal, containing a drop down list of all exercises in the database so the user can select and log a workout
     - Date and time
   - Login Screen
     - Basic login screen that has form validation so that it checks if the user has entered the required fields
     - If the user has created an account, when the login button is pressed the applicaiton will check within the database if the user exists
     - If user exists, then prior to loading into the application the program will grab all the users information from the database   
   - Signup Screen
     - Basic signup screen with form validation to check if the user has entered the fields correctly
     - Once the user hits sign up, the application checks if the user is not yet within the database, if not the user has successfully created an account 
   - Calendar
     - Grabs all of the users previously and current logged exercises, and displays them on the date that they were logged
   - Fitness Screen
     - Comes with preloaded default exercises from the database, that users are able to choose and add to their account
     - The user is also able to create their own custom programs using exercises from the database and add them to their account
     - When selecting on a program the user also has the ability to check the descriptions of each workout
   - Goals Screen
     - The user has the ability to create goals based on the exercises within the database
     - When a user logs an exercise, the application checks if one of their goals matches the logged exercise if so the goal is marked as completed
   - Settings Screen
     - Sign Out button that lets the user log out of their account
     - Change password button, allows the user to change their password and if password changed logs them out and has them resign in
2. Technology Stack
   - Frontend(React Native)
     - Used to have the ability to create an application that works with both Android and iOS 
   - Server API(Python/Flask)
     - In order for the application to communicate to the backend we needed to create an API server
     - The entire serverAPI file was written in python, and since Louis Doherty has had experience using python he decided it was the easiest way to create our server
     - Utilizing pythons Flask module, we were able to get the API routes, from the backend to frontend
   - Backend(SQLite Database)
     - SQLite databases allow for small memory size, so alongside fullstack development we wanted to minimize the memory size of the application as much as possible
     - Also used it for the Atomicity that SQLite provides
3. Challenges
   - Most of our team had little to none experience with React Native, so in the beginning it was difficult for us to create a fully fucntioning application that not only looked good, but performed well also.
   - We also had almost no experience in creating a server API that could communicate between our frontend and backend, so creating that and implementing the actual connection between React Native and our SQLite databse was tough.
   - Also with many other classes and projects our team had times where we weren't all able to meet together, making it harder to work out bugs and create new ideas
4. Future Implementation
   - Creating a Dynamic graph for the homescreen that users would be able to select an exercise that they have logged and check the progress that they have made
   - Progression Tracker that takes in users workout data, and is able to calculate how far the user is from their goals
   - More programs and exercises not just for bodybuilding/rock climbing, but for other types of fitness like crossfit, powerlifting, and olympic weightlifting
   - Integrating a social media aspect where users are able to share their workouts and exercises, so other users can see their progress or critique their form
   - Add video links to the exercises so new lifter/climbers could see how to properly perform the workout

## Installation and How to Run
In order to run you will need node.js and expo installed. Clone repository (or simply download rockfiit folder), and enter the rockFIIT folder using your terminal. Run npm install to install expo to the project. Then simply run npm start, and open the project on an emulator or your mobile device.
  
NOTE: All of the dependencies should be included in the github folder. We have had some errors where some get uninstalled upon cloning, though. In this case, just run npm install ..., where ... is the dependency that the errors are saying could not be found. 

## Authors
Cyrille Bernabe, Louis Doherty, Juan Caridad, Rommel Macatlan Jr., Aitor Navarte

*Note - Cyrille's contributions were not tracked correctly on this Github Repository. All of Cyrille's contributions can be viewed on the team's commit history under the name "Cyrille Bernabe", as well as the username "cyrilleeleazarb"
