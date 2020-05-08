import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import ListPengurus from '../pengurus_masjid/ListPengurus.js'
import DetailPengurus from '../pengurus_masjid/DetailPengurus.js'

class App extends React.Component {
  render() {
    return <AppContainer/>
  }
}

export default App;

const AppSwitchNavigator = createStackNavigator({
  ListPengurus: 
    {
      screen: ListPengurus,
      navigationOptions: {
          headerShown: false
      }
    },
  DetailPengurus: 
    {
      screen: DetailPengurus,
      navigationOptions: {
          headerShown: false
      }
    },
})

const AppContainer = createAppContainer(AppSwitchNavigator)