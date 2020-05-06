import React, {Component} from 'react';
import {StyleSheet, FlatList, Alert, Platform, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import ActionSheet from 'react-native-action-sheet';

var BUTTONSiOS = [
    'Edit Profil',
    'Cancel'
  ];
   
  var BUTTONSandroid = [
    'Edit Profil',
    'Cancel'
  ];
   
  var DESTRUCTIVE_INDEX = 1;
  var CANCEL_INDEX = 1;

export default class ProfileScreen extends React.Component {

    state = {
        username: "khadafi",
        password: "123",
        namaUser: "",
        noHpUser: "",
        alamatUser: "",
    }

    fetchDataProfil = (username, password) => {
        fetch('http://localhost:3306/api/user', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
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
    }

    componentDidMount(){
        this.fetchDataProfil(
            this.state.username, this.state.password
        )
    }

    showActionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
            options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: 'black'
          },
          (buttonIndex) => {
            console.log('button clicked :', buttonIndex);
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

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 10, borderRadius: 8}}>
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

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 10, borderRadius: 8}}>
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

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 10, borderRadius: 8}}>
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