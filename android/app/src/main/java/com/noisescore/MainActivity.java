package com.noisescore;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.GooglePlayServicesUtil;
import android.util.Log;

public class MainActivity extends ReactActivity {


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "noisescore";
    }


    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }



    public boolean checkGooglePlayServicesAvailable() {

        // GoogleApiAvailability only works on GPS 8.4.0+,
        // per https://stackoverflow.com/questions/39363566/connectionresult-success-but-still-getting-googleplayservicesnotavailableexcepti

        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int status = googleApiAvailability.isGooglePlayServicesAvailable(this);

        if(status != ConnectionResult.SUCCESS) {
            if(googleApiAvailability.isUserResolvableError(status)) {
                Log.d("ReactNative", "$$$$ Popup asking users to update Google Play Services.");
                //below tested, works on peter's phone and nexus 5x api 24 emulator
                //googleApiAvailability.getErrorDialog(this,status,9000).show();
                googleApiAvailability.showErrorDialogFragment(this, status, 9000);
            }
            return false;
        }

        Log.v("ReactNative", "$$$$ Google API is " + GoogleApiAvailability.getInstance());

        return true;
    }

     //https://github.com/evollu/react-native-fcm/issues/630
    @Override
    protected void onResume() {
        super.onResume();
        checkGooglePlayServicesAvailable();
        Log.d("ReactNative", "$$$$ MainActivity - IN ONCREATE().");
    }


}
