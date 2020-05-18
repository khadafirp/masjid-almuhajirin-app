import React, {Component} from 'react';
import SplashScreen from './SplashScreen'
import {StyleSheet, Alert, SafeAreaView, AsyncStorage, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import Regis from './Regis'
import LandingPage from '../halaman_utama/LandingPage'

var SharedPreferences = require('react-native-shared-preferences')

const Stack = createStackNavigator();

let splash_screen = (
  <SplashScreen/>
)

export default class Login extends Component {

    state = {
        isVisible: true,
        isEnable: false,
        isLoading: false,
        textUsername: "",
        textPassword: "",
        resStatusCode: ""
    }
  
    btnDisable = () => {
      if (this.state.textUsername === "" && this.state.textPassword === "") {
        return false
      }
      return true
    }

    _storeData = async () => {
      try {
        await AsyncStorage.setItem('username', this.state.textUsername);
        await AsyncStorage.setItem('password', this.state.textPassword);
        await AsyncStorage.setItem('filterLogin', "1")
      } catch (error) {
        console.log(error)
      }
    };

    fetchLogin = (username, password) => {
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
        // console.log(responseJson.statusCode)
        this.setState(
          {
            resStatusCode: responseJson.statusCode
          }
        )
      )
      .catch((error) => 
        console.error(error)
      )
      .finally(() => 

      setTimeout(() => {

        if (this.state.resStatusCode !== 200) {
          Alert.alert('Maaf, user tidak ada\nsilahkan daftar terlebih dahulu')

        }else{
          this.props.navigation.replace('home')
          this._storeData()
        }
      }, 1000
      )
    )
  }

  render() {
        return (
          <SafeAreaView style={styles.container}>
          <Image style={{width:300, height:300}} source={require('../images/masjidalmuhajirin.png')} />

          <View style={{marginTop: 70}}>
          <TextInput 
              style={styles.textInput}
              placeholder='Username'
              utoCapitalize="none"
              onChangeText={(text) => this.setState({textUsername: text})}
          />
          <TextInput 
              secureTextEntry={true}
              style={[styles.textInput]}
              placeholder='Password'
              onChangeText={(text) => this.setState({textPassword: text})}
          />

          <TouchableOpacity 
           style={ styles.buttonStyle}
          //  disabled={
          //    (this.state.textUsername === "" && this.state.textPassword === "") ? false : true
          //  }
          onPress={() =>
            this.fetchLogin(this.state.textUsername, this.state.textPassword)
          }
          >
          <Text style={styles.textSignup}>
            Masuk
          </Text>
          </TouchableOpacity>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <Text style={styles.instructions}>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('regis')}
              >
              <Text style={styles.instructionsRegister}>Daftar</Text>
              </TouchableOpacity>
            </View>
          </View>    
      {/* </View> */}
      </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput:{
    height: 40,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    color:'#000000',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:10,
    width:350
  },
  buttonDisable:{
    backgroundColor: "#f0f0f0",
    paddingLeft:10,
    borderRadius: 8,
    paddingRight:10,
    marginTop:10,
    width:350
  },
  buttonStyle:{
    backgroundColor:'#91bd0e',
    paddingLeft:10,
    borderRadius: 8,
    paddingRight:10,
    marginTop:10,
    width:350
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color:'white'
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