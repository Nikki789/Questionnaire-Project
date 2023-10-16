# Key features
This README.md file explains the key features of this application, how to use them and additional details about the design and implementation rationale.

The index.html page is the main page of the Questionnaire engine.
All of the pages will change their theme according to the system and browser's theme settings of the user.
There is a light and a dark theme, both with colours which are consistent with one another and neutral so that the user can focus on the questionnaire.

You can login with Facebook or Google on the main page. 

The Facebook feature was implemented by using the Facebook JS SDK (//connect.facebook.net/en_US/sdk.js).
By logging in, you will see your login status, profile picture, account ID and name.

The Google oAuth feature was based on the Passport strategy (http://www.passportjs.org/packages/passport-google-oauth/).
It uses routing to navigate through the pages and receive a callback in order to lead back to the questionnaire app.
By logging in, you should be able to see your ID, Token, Email and your name. Afterwards you can log out or load the questionnaire.

You can fill in a questionnaire based on the example JSON file and submit the data. 
The questionnaire follows a linear flow of questions and lets the user go back to the main page with a button.
The user will get personalised messages (due to the validation check for each question) based on his input in each of the questions, so that he can submit the questionnaire successfully.
After the submission the user should click twice on the Submit button in order to confirm that he wants to access the download feature.
Only after the submission of the answers the user will be able to see a download button in order to download a JSON file consisting of the answers.
The JSON file also includes the date and the time of the submission so that the user's answers are easier to identify.

The answers of the questionnaire are saved in the local storage.

In order for the application to fit on phone screen, the components of the Questionnaire HTML page have been adjusted according to the size of the screen.
The token exchanged for the Google Login has been truncated so that the content will to be visible on phone screen.

A server has been made which serves the client application and runs on http://localhost:8080.
The server handles possible errors, uses express and is set to run .ejs and html files.
The database and the features's required imports are added in order for the app to run properly.

The package.json is set to run on the command "npm start" and includes details about the package so that it is compatible with Node.js. 

The stylesheets have been split into multiple files, with a index.css file and themes.css as main stylesheets whose content is used by two or more pages.
The rest of the stylesheets are used only by one html/ejs page.

# Instructions to run
1. To run the questionnaire website, navigate to the current directory in the terminal.
2. Type in "npm start" and navigate to http://localhost:8080/
