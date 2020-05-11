import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import Home from "../home_page/HomeScreen.js"
import Regis from '../../first_component/Regis'
import App from '../../App'
import Profil from "../profile_page/ProfileScreen"
import EditProfil from "../profile_page/EditProfil"

class RouterProfil extends React.Component {
  render() {
    return <AppContainer/>
  }
}

export default RouterProfil;

const AppSwitchNavigator = createStackNavigator({
  profil: 
  {
    screen: Profil,
    navigationOptions: {
      headerShown: false
    }
  },
  editProfil: 
  {
    screen: EditProfil,
    navigationOptions: {
      headerShown: false
    }
  },
})

const AppContainer = createAppContainer(AppSwitchNavigator)