import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import Home from "../home_page/HomeScreen.js"
import Regis from '../../first_component/Regis'
import Profil from "../profile_page/ProfileScreen"
import EditProfil from "../profile_page/EditProfil"
import JadwalMasjid from '../../jadwal_masjid/JadwalMasjid'
import DetailJadwal from '../../jadwal_masjid/DetailJadwalMasjid'

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

  jadwalMasjid:
  {
    screen: JadwalMasjid,
    navigationOptions: ({navigation}) => {
      return{
        title: "Jadwal",
        headerLeft: 
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{height: 15, width: 15, marginStart: 5}} source={require('../../images/leftarrow.png')}/>
          </TouchableOpacity>
      }
    }
  },
  detailJadwal:
  {
    screen: DetailJadwal,
    navigationOptions: ({navigation}) => {
      return{
        title: "Detail",
        headerLeft: 
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{height: 15, width: 15, marginStart: 5}} source={require('../../images/leftarrow.png')}/>
          </TouchableOpacity>
      }
    }
  }
})

const AppContainer = createAppContainer(AppSwitchNavigator)