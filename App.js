import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import MapScreen from './src/screens/Map/MapScreen';
import RecordScreen from './src/screens/Record/RecordScreen';
import RecordScreen1 from './src/screens/Record/RecordScreen1';
import RecordScreen2 from './src/screens/Record/RecordScreen2';
import AccountScreen from './src/screens/Account/AccountScreen';

console.disableYellowBox = ["Unable to symbolicate"];

const RecordStack = createStackNavigator({
  Measure: RecordScreen,
  Record1: RecordScreen1,
  Record2: RecordScreen2,
});


export default createAppContainer(createBottomTabNavigator(
  {
    Map: MapScreen,
    Measure: RecordStack,
    Account: AccountScreen
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Account') {
          iconName = `ios-person`;
        } else if (routeName === 'Map') {
          iconName = `ios-map`;
        } else if (routeName === 'Measure') {
          iconName = `ios-microphone`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
  ),
);


