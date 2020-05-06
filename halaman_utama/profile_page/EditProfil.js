import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, NavigationActions, FlatList, Alert, Platform, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';

export default class EditProfil extends React.Component {

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
        this._retrieveData()
    }

    fetchEditProfil = async () => {
        const value = await AsyncStorage.getItem('username');
        console.log(value);
        this.setState({username: value})
        console.log(this.state.username)

        const values = await AsyncStorage.getItem('password');
        console.log(values);
        this.setState({password: values})
        console.log(this.state.password)

        fetch(`http://localhost:3306/api/updateProfil?username=${this.state.username}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nama_lengkap: this.state.namaUser,
              alamat: this.state.alamatUser,
              no_hp: this.state.noHpUser,
            }, 
            console.log(this.state.body))
            })
            .then((response) => response.json())
            .then((responseJson) => 
              console.log(responseJson)
            // this.setState(
            //     {
            //     namaUser: responseJson.body.nama_lengkap,
            //     noHpUser: responseJson.body.no_hp,
            //     alamatUser: responseJson.body.alamat
            //     }
            // )
            )
            .catch((error) => 
            console.error(error)
            )
            .finally(() => this.setState({isLoading: false}));

            this.props.navigation.replace('profil')
      }

    render(){
        return(
            <SafeAreaView style={styles.container}>

                <View>
                    <TouchableOpacity
                    // onPress={() => Alert.alert(this.state.namaUser)}
                        onPress={() => this.fetchEditProfil()}
                    >
                        <View style={{width: "100%", position: 'absolute', marginStart: "85%", marginTop: 20}}>
                            <Text>
                                Selesai
                            </Text>
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
                            <TextInput style={{marginStart: 10}}
                                onChangeText={(text) => this.setState({namaUser: text})}
                            >
                                {
                                    this.state.namaUser
                                }
                            </TextInput>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 11, color: "black"}}>
                            No Handphone
                        </Text>

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 8, borderRadius: 8}}>
                            <TextInput style={{marginStart: 10}}
                                onChangeText={(text) => this.setState({noHpUser: text})}                            
                            >
                                {
                                    this.state.noHpUser
                                }
                            </TextInput>
                        </View>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 11, color: "black"}}>
                            Alamat
                        </Text>

                        <View style={{backgroundColor: 'white', height: 35, justifyContent: 'center', marginTop: 8, borderRadius: 8}}>
                            <TextInput style={{marginStart: 10}}
                                onChangeText={(text) => this.setState({alamatUser: text})}                            
                            >
                                {
                                    this.state.alamatUser
                                }
                            </TextInput>
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