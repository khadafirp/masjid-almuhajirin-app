import React, {Component} from 'react';
import {StyleSheet, Alert, SafeAreaView, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, ToastAndroid} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

export default class FormSignUp extends Component {
  
  state = {
    isFocused: false,
    date: "",
    showPassword: false,
    passwordText: "",
    validasiPasswordText: ""
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

  validasiPassword = (passwordSatu, passwordDua) => {
    if(passwordSatu !== passwordDua){
      Alert.alert("Password tidak sama")
    }
  }

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
              />
            </View>

            <View style={{marginLeft: 25}}>
              <Text style={{fontSize: 9}}>
                Nama Belakang
              </Text>
              <TextInput
                style={styles.textInputNamaDepan}
              />
            </View>
          </View>

          <View style={{marginTop: 16, width: "100%"}}>
            <Text style={{fontSize: 9}}>
              Username
            </Text>
            <TextInput
                style={styles.textInput}
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
                onChangeText={(text) => this.setState({passwordText: text}), 
                  console.log(this.state.passwordText)
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
                date={this.state.date}
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
                onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>

          <View style={{marginTop: 15, marginBottom: 0}}>
              <Text style={{fontSize: 9}}>
                No Handphone
              </Text>
              <TextInput
                 style={styles.textInputNoHp}
                 placeholder={"08XXXXXXXXXX"}
              />
          </View>

          <View style={{marginTop: 15, marginBottom: 0}}>
              <Text style={{fontSize: 9}}>
                Alamat
              </Text>
              <TextInput
                 style={styles.textInputNoHp}
                 placeholder={"Blok A-Z/nomor"}
              />
          </View>

          <View style={{width: "100%", 
                        borderRadius: 8, 
                        height: 40, 
                        backgroundColor: "#91bd0e", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginTop: 25}}>
            <TouchableOpacity onPress={() => this.validasiPassword(this.state.passwordText, this.state.validasiPasswordText)}>
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