# noise-score
Mobile-app for users to record and comment on community noise levels.

Download and start **React Native Debugger** for help debugging.

## Android (Not working yet)
From Android Studio, start an emulator. (Tools -> AVD Manager)

``` 
npm run android
```
Control M on emulator - to set automatic reloads and allow remote debugging


## IOS 
### Requirements
1. XCode 10+
1. Node JS 
1. MongoDB (running on localhost:27017)

To start: cd into the project folder: 

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
Control D on emulator - to set automatic reloads and allow remote debugging.

Download React Native Debugger [here](https://github.com/jhen0409/react-native-debugger) for more options. 

