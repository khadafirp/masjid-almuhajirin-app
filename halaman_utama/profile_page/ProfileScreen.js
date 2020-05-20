import React, {Component} from 'react';
import {StyleSheet, FlatList, Alert, AsyncStorage, Platform, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import ActionSheet from 'react-native-action-sheet';

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

export default class ProfileScreen extends React.Component {

    state = {
        username: "",
        password: "",
        namaUser: "",
        noHpUser: "",
        alamatUser: "",
    }

    secondStore = async () => {
        try{
            // await AsyncStorage.setItem('username', "");
            // await AsyncStorage.setItem('password', "");
            // await AsyncStorage.setItem('filterLogin', "0")
            
            var value = await AsyncStorage.getItem('filterLogin')
            var valuee = await AsyncStorage.getItem('username')
            var valueee = await AsyncStorage.getItem('password')

            console.log("filter = " + value);
            console.log("username = " + valuee);
            console.log("username = " + valueee);
        }catch(error){
            console,log(error)
        }
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

          fetch('http://localhost:3306/api/user', {
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

    componentDidMount(){
        setTimeout(() => {
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
                                source={require('../../images/menu_dot.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    
                    <View style={{height: 120, width: 120, borderRadius: 60, marginStart: 15, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center"}}>
                        <Image
                            style={{height: 90, width: 90, tintColor: "#919191"}}
                            source={require("../../images/ic_akun.png")}
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#f8f8f8"
    },

})