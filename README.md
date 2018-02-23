# HackU6-Hackathon by Team Arrow

Google Home is a Wi-Fi speaker that can act as a personal assistant for the entire family. You can use it to playback entertainment throughout your home, effortlessly manage everyday tasks, and ask Google things you want to know. In this Project we are going to interact with Google home to search for properties which are available to buy and rent.  The Google home can trigger an email or a message to the respective agent dealing with the property and can act as a mediator for the transcations.The application uses Firebase, Google Dialg Flow and Nodejs.

 * In short One needs to create an application which interacts with Nosql database through firebase.
 * Second we need to create dialog flow through google dialog flow.
 * Combined will provide you a way to have a perfect product at your hand
 
 ## Firebase setup

* Create a new project in firebase console
* Import your json data into the database

To deploy your project into the firebase cloud 
* Enter "firebase login" in the command prompt 
* Enter "firebase init" in the command prompt at the project directory.
* Select all default options
* Go with "firebase deploy" in the project directory.
* Save the URL provided by the firebase to interact with the Dialog Flow

## Basic Dialog Flow Setup
* Create a new Dialogflow project
* Log into the Dialogflow console.
* Follow the introduction tutorial from google developer console to create your first agent.
* Fill in with name and description
* Under "Google Project", select the Firebase project you created in the Firebase step.
* Click SAVE
* Update the fulfillment webhook
* In the left navigation pane click on Fulfillment.
* The Webhook should already be enabled; if it isn't, toggle the ENABLED switch.
* Replace or fill in the URL field with the URL from firebase
* Click SAVE
* From the Dialogflow console in the left navigation menu, select "Integrations.
* In the settings form that appears, leave everything as default and click TEST.

##Firebase Data base Queires:
 
Firebase Queries documentation[link](https://firebase.google.com/docs/reference/js/firebase.database.Query) will provide you the basic information to interact with the database. 
