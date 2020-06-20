import React from 'react';
import {StyleSheet, FlatList, Alert, AsyncStorage, Platform, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer} from 'react-navigation'
import HomePage from "../halaman_utama/home_page/router_home"
import ProfilPages from "../halaman_utama/profile_page/ProfileScreen"
import PengurusPage from '../pengurus_masjid/RouterPengurus'
import Regis from "../first_component/Regis.js"
import Profil from "../halaman_utama/profile_page/ProfileScreen"
import Sejarah from '../sejarah_masjid/RouterSejarah'

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
            <HomePage/>
        )
    }
}

class SejarahScreen extends React.Component {
    render(){
        return(
            <Sejarah/>
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

var BUTTONSiOS = [
    'Edit Profil',
    'Logout',
    'Cancel'
  ];
   
  var BUTTONSandroid = [
    'Edit Profil',
    'logout',
    'Cancel'
  ];
   
  var DESTRUCTIVE_INDEX = 1;
  var CANCEL_INDEX = 2;

class PengurusScreen extends React.Component {
    render(){
        return(
            <PengurusPage/>
        )
    }
}

class ProfilScreen extends React.Component {
      
    state = {
        username: "",
        password: "",
        namaUser: "",
        noHpUser: "",
        alamatUser: "",
    }

    _retrieveData = async () => {
        const value = await AsyncStorage.getItem('username');
        console.log(value);
        this.setState({username: value})
        console.log(this.state.username)

        const values = await AsyncStorage.getItem('password');
        console.log(values);
        this.setState({password: values})
        console.log(this.state.password)

          fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/filterDataUser', {
          method: "POST",
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          }, 
          console.log(this.state.body))
          })
          .then((response) => response.json())
          .then((responseJson) => 
          //   console.log(responseJson.body.nama_lengkap)
          this.setState(
              {
              namaUser: responseJson.body.nama_lengkap,
              noHpUser: responseJson.body.no_hp,
              alamatUser: responseJson.body.alamat
              }
          )
          )
          .catch((error) => 
          console.error(error)
          )
          .finally(() => this.setState({isLoading: false}));
    };

    secondStore = async () => {
        try{
            await AsyncStorage.setItem('username', JSON.stringify(""));
            await AsyncStorage.setItem('password', JSON.stringify(""));
            await AsyncStorage.setItem('filterLogin', "0")
            
            // var value = await AsyncStorage.getItem('filterLogin')
            // var valuee = await AsyncStorage.getItem('username')
            // var valueee = await AsyncStorage.getItem('password')

            // console.log("filter = " + value);
            // console.log("username = " + valuee);
            // console.log("username = " + valueee);
        }catch(error){
            console,log(error)
        }
      }

    clearAsync = async () => {
        AsyncStorage.clear()
    }

    componentDidMount(){
        setTimeout(() => {
            // this.secondStore()
            this._retrieveData()
        }, 1000
      )
    }

    showActionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
            options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            cancelButtonIndex: CANCEL_INDEX,
            tintColor: 'black'
          },
          (buttonIndex) => {
            // console.log('button clicked :', buttonIndex);
            if (buttonIndex === 0) {
                this.props.navigation.navigate('editProfil')   
            }else if (buttonIndex === 1) {
                this.secondStore()
                this.props.navigation.replace('loginNew')
            }

        })
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>

                <View>
                    <TouchableOpacity
                        onPress={() => 
                            this.showActionSheet()
                        }
                    >
                        <View style={{width: "100%", position: 'absolute', marginStart: "90%", marginTop: 20}}>
                            <Image
                                style={{height: 20, width: 20}}
                                source={require('../images/menu_dot.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    
                    <View style={{height: 120, width: 120, borderRadius: 60, marginStart: 15, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center"}}>
                        <Image
                            style={{height: 90, width: 90, tintColor: "#919191"}}
                            source={require("../images/ic_akun.png")}
                        />
                    </View>
                </View>

                <View style={{margin: 20}}>
                    <View>
                        <Text style={{fontSize: 11, color: "black"}}>
                            Nama
                        </Text>

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 8, borderRadius: 8}}>
                            <Text style={{marginStart: 10}}>
                                {
                                    this.state.namaUser
                                }
                            </Text>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 11, color: "black"}}>
                            No Handphone
                        </Text>

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 8, borderRadius: 8}}>
                            <Text style={{marginStart: 10}}>
                                {
                                    this.state.noHpUser
                                }
                            </Text>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 11, color: "black"}}>
                            Alamat
                        </Text>

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 8, borderRadius: 8}}>
                            <Text style={{marginStart: 10}}>
                                {
                                    this.state.alamatUser
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
           title: 'Sejarah',
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
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8"
    },
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