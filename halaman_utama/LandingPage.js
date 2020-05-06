import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from "../halaman_utama/home_page/HomeScreen"
import ProfilPages from "../halaman_utama/profile_page/RouterProfil"
import Regis from "../first_component/Regis.js"
import Profil from "../halaman_utama/profile_page/ProfileScreen"

// export default class LandingPage extends React.Component {

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <AppTabNavigator/>
//       </SafeAreaView>
//     );
//   }
// }

class HomeScreens extends React.Component {
    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <HomePage/>
            </View>
        )
    }
}

class SejarahScreen extends React.Component {
    render(){
        return(
            <View style={{flex: 1,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>
                    Sejarah Screen
                </Text>
            </View>
        )
    }
}

class DokumentasiScreen extends React.Component {
    render(){
        return(
            <View style={{flex: 1,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>
                    Dokumentasi Screen
                </Text>
            </View>
        )
    }
}

class PengurusScreen extends React.Component {
    render(){
        return(
            <View style={{flex: 1,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>
                    Pengurus Screen
                </Text>
            </View>
        )
    }
}

class ProfilScreen extends React.Component {
    render(){
        return(
            <ProfilPages/>
        )
    }
}

const AppTabNavigator = createMaterialBottomTabNavigator({
    Home: {screen: HomeScreens, 
           navigationOptions: {
             tabBarLabel: 'Beranda',
             tabBarIcon:({tintColor}) => (
                <Image 
                    style={{ width: 24, height: 24, tintColor: tintColor }} 
                    source={require('../images/beranda.png')} />
             ),
           }},
    Sejarah: {screen: SejarahScreen, 
           navigationOptions: {
           tabBarLabel: 'Sejarah',
           tabBarIcon:({tintColor}) => (
            <Image 
                style={{ width: 24, height: 24, tintColor: tintColor }} 
                source={require('../images/sejarah.png')} />
            ),
        }},

    Dokumentasi: {screen: DokumentasiScreen, 
        navigationOptions: {
        tabBarLabel: 'Dokumentasi',
        tabBarIcon:({tintColor}) => (
        <Image 
            style={{ width: 24, height: 24, tintColor: tintColor }} 
            source={require('../images/dokumentasi.png')} />
         ),
    }},

    Pengurus: {screen: PengurusScreen, 
        navigationOptions: {
        tabBarLabel: 'Pengurus',
        tabBarIcon:({tintColor}) => (
            <Image 
                style={{ width: 24, height: 24, tintColor: tintColor }} 
                source={require('../images/pengurus.png')} />
            ),
        }},
    Profil: {screen: ProfilScreen, 
        navigationOptions: {
        tabBarLabel: 'Profil',
        tabBarIcon:({tintColor}) => (
            <Image 
                style={{ width: 24, height: 24, tintColor: tintColor }} 
                source={require('../images/profil.png')} />
            ),
        }},
  }, {
    initialRouteName: "Home",
    activeColor: '#91bd0e',
    inactiveColor: "#919191",
    shifting: false,
    barStyle:{
        backgroundColor: "#f0f0f0",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    }
  })

  export default createAppContainer(AppTabNavigator)

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}