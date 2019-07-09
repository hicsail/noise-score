# Noise Score
<p align="center">
    <img src="assets/one-hand-1024.jpg"/>
</p>

Mobile-app for users to record and comment on community noise levels.

Download and start **React Native Debugger** for help debugging.

## Setting Up The Server 
1. cd into the server folder: ```cd server/```

1. Run the first time setup command: 
    
    ```npm run first-time-setup```
    
1. Follow the prompts on the console. Once finished you follow the instructions below. 

    Note: The email and password you set up as the root user is what will be used to view the data in the backend.

## Android 
### Requirements
1. Android Studio
1. Android Virtual Machine
1. MongoDB (running on localhost:27017)

### To start: 
1. From Android Studio, start an emulator. (Tools -> AVD Manager)
1. Cd into the project folder and start Metro Builder:

     ```react-native start``` or ```react-native start --reset-cache```
1. Open a new window and start mongoDB
  
    ```mongod```
1. Open a new window and start the backend 
    
    1. First cd into the server folder ```cd server/```
    
    1. Start the server ```npm start```
1. Open a new window (starting at the root of the project) and start the app
    
    ```npm run android```

The app should now open up in the Android simulator. Check the Metro Bundler tab to check if the app is being deployed.
### Notes
- Remember to change 'localhost' to '10.0.2.2' if you are running android on a local server. 

## iOS 
### Requirements
1. XCode 10+
1. Node JS 
1. MongoDB (running on localhost:27017)

### To start: cd into the project folder: 

1. Start Metro Bundler
    
    ```react-native start``` or ```react-native start --reset-cache```
1. Open a new window and start mongoDB
  
    ```mongod```
1. Open a new window and start the backend 
    
    1. First cd into the server folder ```cd server/```
    
    1. Start the server ```npm start```
1. Open a new window (starting at the root of the project) and start the app
    
    ```npm run ios```


The app should now open up in the iOS simulator. Check the Metro Bundler tab to check if the app is being deployed. 
     

## Debugging
Control D on emulator (Control M on Android) - to set automatic reloads and allow remote debugging.

Download React Native Debugger [here](https://github.com/jhen0409/react-native-debugger) for more options. 


## Notes

1. You will need up update the API Key for the Geolocator under server/.env
