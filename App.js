import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import MapScreen from './src/screens/Map/MapScreen';
import MeasureScreen from './src/screens/Measure/MeasureScreen';
import MeasureScreen1 from './src/screens/Measure/MeasureScreen1';
import MeasureScreen2 from './src/screens/Measure/MeasureScreen2';
import MeasureScreen3 from './src/screens/Measure/MeasureScreen3';
import AccountScreen from './src/screens/Account/AccountScreen';

console.disableYellowBox = ["Unable to symbolicate"];

const MeasureStack = createStackNavigator({
  Measure: MeasureScreen,
  Measure1: MeasureScreen1,
  Measure2: MeasureScreen2,
  Measure3: MeasureScreen3,
});



const brightGreen = "#31BD4B";

export default createAppContainer(createBottomTabNavigator(
  {
    Map: MapScreen,
    Measure: MeasureStack,
    Account: AccountScreen
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Account') {
          iconName = `user`;
        } else if (routeName === 'Map') {
          iconName = `map`;
        } else if (routeName === 'Measure') {
          iconName = `microphone`;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor}/>;
      }
    }),
    tabBarOptions: {
      activeTintColor: brightGreen,
      inactiveTintColor: 'gray',
    }
  }
  ),
);


