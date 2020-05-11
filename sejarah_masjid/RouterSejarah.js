import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Icon} from "react-native-vector-icons";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import Sejarah from '../sejarah_masjid/SejarahMasjid'
import DetailSejarah from '../sejarah_masjid/DetailSejarah'

class RouterSejarah extends React.Component {
  render() {
    try{
      return <AppContainer/>
    }catch(error){
      console.log(error)
    }
  }
}

export default RouterSejarah;

const AppSwitchNavigator = createStackNavigator({
  Sejarah: 
    {
      screen: Sejarah,
      navigationOptions: {
        title: "Sejarah",
      }
    },
})

const AppContainer = createAppContainer(AppSwitchNavigator)