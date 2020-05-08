import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Icon} from "react-native-vector-icons";
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
        title: "Pengurus",
        headerLeft: 
            <Image style={{height: 40, width: 40, marginStart: 5}} source={require('../images/masjidalmuhajirin.png')}/>
      }
    },
  DetailPengurus: 
    {
      screen: DetailPengurus,
      navigationOptions: ({navigation}) => {
        return{
          title: "Detail Pengurus",
          headerLeft: 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{height: 15, width: 15, marginStart: 5}} source={require('../images/leftarrow.png')}/>
            </TouchableOpacity>
        }
      }
    },
})

const AppContainer = createAppContainer(AppSwitchNavigator)