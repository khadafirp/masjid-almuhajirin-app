import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import Home from "../home_page/HomeScreen.js"
import Regis from '../../first_component/Regis'

class router_home extends React.Component {
  render() {
    return <AppContainer/>
  }
}

export default router_home;

const AppSwitchNavigator = createStackNavigator({
  home: 
    {
      screen: Home,
      navigationOptions: {
          headerShown: false
      }
    },
    regis: 
    {
      screen: Regis,
      navigationOptions: {
          headerShown: false
      }
    }
})

const AppContainer = createAppContainer(AppSwitchNavigator)