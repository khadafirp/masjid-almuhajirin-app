import React, {Component} from 'react';
import {StyleSheet, FlatList, Alert, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

var SharedPreferences = require('react-native-shared-preferences')

export default class Regis extends Component {
  
  state = {
    isFocused: false,
    isLoading: true,
    dataUser: "",
    namaDepan: "",
    namaBelakang: "",
    txtUsername: "",
    date: "",
    showPassword: false,
    passwordText: "",
    validasiPasswordText: "",
    tglLahir: "",
    noHp: "",
    alamat: ""
  }

  handleFocus = event => {
    this.setState({isFocused: true})

    if(this.props.onFocus){
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    this.setState({isFocused: false})

    if(this.props.onBlur){
      this.props.onBlur(event)
    }
  }

  fetchRegis = () => {
    // let formData = new FormData()
    // formData.append("username", "khadafi")

    fetch('http://localhost:3306/api/regis', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.txtUsername,
        password: this.state.passwordText,
        posisi: "user",
        nama_lengkap: this.state.namaDepan + " " + this.state.namaBelakang,
        tanggal_lahir: this.state.tglLahir,
        alamat: this.state.alamat,
        no_hp: this.state.noHp,
        status_aktif: 0
      }, console.log(this.state.body))
    })
      .then((response) => response.json())
      .then((responseJson) => 
        console.log(responseJson)
      )
      .catch((error) => 
        console.error(error)
      )
      .finally(() => this.setState({isLoading: false}));

      console.log("Registrasi berhasil")
  }

  validasiPassword = (passwordSatu, passwordDua) => {
    if(passwordSatu !== passwordDua){
      Alert.alert("Password tidak sama")
    }
  }

  // secPrefTest = () => {
  //   SharedPreferences.getItem("key", function(value) {
  //     console.log(value)
  //   })
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <ScrollView style={{height: "100%"}}>

      <View>
        <View style={{marginStart: 12, margin: 20}}>

          <View style={{flexDirection: "row"}}>
            <View>
              <Text style={{fontSize: 9}}>
                Nama Depan
              </Text>
              <TextInput
                style={styles.textInputNamaDepan}
                onChangeText={(text) => this.setState({namaDepan: text})}
              />
            </View>

            <View style={{marginLeft: 25}}>
              <Text style={{fontSize: 9}}>
                Nama Belakang
              </Text>
              <TextInput
                style={styles.textInputNamaDepan}
                onChangeText={(text) => this.setState({namaBelakang: text})}
              />
            </View>
          </View>

          <View style={{marginTop: 16, width: "100%"}}>
            <Text style={{fontSize: 9}}>
              Username
            </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({txtUsername: text})
                }
              />
          </View>

          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 9}}>
              Password
            </Text>
            <View 
            style={styles.textInput}>
              <TextInput
                style={{height: 40, width: "88%", paddingLeft: 10}}
                secureTextEntry={(this.state.showPassword === false) ? true : false}
                onChangeText={(text) => this.setState({passwordText: text})
                }
              />

              <TouchableOpacity style={{height:25, width: 25}}
                onPress= {() => (this.state.showPassword === false) ? this.setState({showPassword: true}) : this.setState({showPassword: false}) }
              >
                <Image
                  style={{height: 20, width: 20, marginTop: 10, marginStart: 6}}
                  source={(this.state.showPassword === true) ? require("../images/showpassword.png") : require("../images/hidepassword.png")}
                />
              </TouchableOpacity>
            
            </View>
          </View>

          <View style={{marginTop: 16}}>
          <Text style={{fontSize: 9}}>
              Validasi Password
            </Text>
            {/* <Text>
              {
                this.state.dataUser
              }
            </Text> */}
              {/* {this.state.isLoading ? <ActivityIndicator/> : (
                <FlatList
                  data={this.state.dataUser}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <Text>{item.nama_lengkap}, {item.tanggal_lahir}</Text>
                  )}
                />
              )} */}
            <View 
            style={styles.textInput}>
              <TextInput
                style={{height: 40, width: "88%", paddingLeft: 10}}
                secureTextEntry={(this.state.showPassword === false) ? true : false}
                onChangeText={(text) => this.setState({validasiPasswordText: text})}
              />

              <TouchableOpacity style={{height:25, width: 25}}
                onPress= {() => 
                  (this.state.showPassword === false) ? this.setState({showPassword: true}) : this.setState({showPassword: false}) 
                }
              >
                <Image
                  style={{height: 20, width: 20, marginTop: 10, marginStart: 6}}
                  source={(this.state.showPassword === true) ? require("../images/showpassword.png") : require("../images/hidepassword.png")}
                />
              </TouchableOpacity>
            
            </View>
          </View>

          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 9}}>
              Tanggal Lahir
            </Text>
              <DatePicker
                style={{width: 200, marginTop: 15}}
                date={this.state.tglLahir}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({tglLahir: date})}}
            />
          </View>

          <View style={{marginTop: 15, marginBottom: 0}}>
              <Text style={{fontSize: 9}}>
                No Handphone
              </Text>
              <TextInput
                 style={styles.textInputNoHp}
                 placeholder={"08XXXXXXXXXX"}
                 onChangeText={(text) => this.setState({noHp: text})}
              />
          </View>

          <View style={{marginTop: 15, marginBottom: 0}}>
              <Text style={{fontSize: 9}}>
                Alamat
              </Text>
              <TextInput
                 style={styles.textInputNoHp}
                 placeholder={"Blok A-Z/nomor"}
                 onChangeText={(text) => this.setState({alamat: text})}
              />
          </View>

          <View style={{width: "100%", 
                        borderRadius: 8, 
                        height: 40, 
                        backgroundColor: "#91bd0e", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginTop: 25}}>
            <TouchableOpacity 
              onPress={() => this.fetchRegis()}
            >
              <Text style={{color:"white"}}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.instructions}>Sudah punya akun?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('login')}
              >
              <Text style={styles.instructionsRegister}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center"
  },
  textInputNamaDepan:{
    height: 40,
    color:'#000000',
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom:0,
    marginTop: 15,
    width:180
  },
  textInputNoHp:{
    height: 40,
    color:'#000000',
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom:0,
    marginTop: 15,
    width:"100%"
  },
  textInput:{
    height: 40,
    color:'#000000',
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom:0,
    marginTop: 15,
    width:"100%"
  },
  textInputPassword:{
    height: 40,
    color:'#000000',
    paddingLeft:10,
    paddingRight:10,
    width:"70%"
  },
  buttonStyle:{
    backgroundColor:'#1ABC9C',
    paddingLeft:10,
    paddingRight:10,
    marginTop:10,
    width:350
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color:'#FFFFFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
    marginTop:10
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 12,
    marginBottom: 5,
    marginTop:10
  },
  instructionsRegister: {
    textAlign: 'center',
    color: '#91bd0e',
    fontSize: 12,
    marginBottom: 5,
    marginTop:10,
    marginStart: 5
  },
});