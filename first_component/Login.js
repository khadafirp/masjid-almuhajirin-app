import React, {Component} from 'react';
import SplashScreen from './SplashScreen'
import {StyleSheet, Alert, SafeAreaView, AsyncStorage, Text, View, TouchableOpacity, TextInput, Image, Platform} from 'react-native';
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
        resStatusCode: "",
        filter: ""
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
        await AsyncStorage.setItem('filterLogin', '1')
      } catch (error) {
        console.log(error)
      }
    };

    fetchLogin = (username, password) => {
      fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/filterDataUser', {
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
      );
  }

  secondStore = async () => {
    var value = await AsyncStorage.getItem('filterLogin')
    var username = await AsyncStorage.getItem('username')
    var pass = await AsyncStorage.getItem('password')

    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', pass);
    await AsyncStorage.setItem('filterLogin', value)
  }

  filterLogin = async () => {
    var value = await AsyncStorage.getItem('filterLogin')
    var username = await AsyncStorage.getItem('username')
    var pass = await AsyncStorage.getItem('password')
    
    setTimeout(() => {
      this.setState({
        filter: value,
        textUsername: username,
        textPassword: pass
      })
      console.log("filter = " + this.state.filter)
      console.log("username = " + this.state.textUsername);
      console.log("password = " + this.state.textPassword);
      
    }, 100)
  }

  componentDidMount (){
    var that = this
    setTimeout(function (){
      // that._storeData()
      that.secondStore()
      that.filterLogin()
      that.setState({
          isVisible: false
      });
    }, 5000)
  }

  render() {

    // let test = (
    //   setTimeout(() => {
    //     this.fetchLogin(this.state.textUsername, this.state.textPassword)
    //   }, 500)
    // )

      if(this.state.isVisible === true){
        return splash_screen
      }

      try{
        if(this.state.filter === "1"){
          this.fetchLogin(this.state.textUsername, this.state.textPassword)
        }
      }catch(error){
        console.log(error)
      }

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




// import React, {Component} from 'react';
// import SplashScreen from './SplashScreen'
// import {StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native'
// import Regis from './Regis'

// const Stack = createStackNavigator();

// export default class Login extends Component {

//     state = {
//         isVisible: true
//     }
    
//     componentDidMount (){
//         var that = this
//         setTimeout(function (){
//             that.setState({
//                 isVisible: false
//             });
//         }, 5000)
//     }
  
//   render() {
//     let splash_screen = (
//         <SplashScreen/>
//     )

//       if(this.state.isVisible === true){
//         return splash_screen    
//       }else{
//           return(
//             <NavigationContainer>
//                 <Stack.Navigator
//                     screenOptions={{
//                         headerShown: false
//                     }}
//                 >
//                     <Stack.Screen name="Login" component={this.loginPage}/>
//                     <Stack.Screen name="Registrasi" component={this.regisPage}/>
//                 </Stack.Navigator>
//             </NavigationContainer>
//           );
//       }
//     }

//     loginPage = ({navigation}) => {
//         return (
//             <View style={styles.container}>
//                 {/* <Image style={{marginBottom:50, width:70, height:70}} source={require('./asset/icon-app.png')} /> */}
                    
//                 <TextInput 
//                     style={styles.textInput}
//                     placeholder='Email'
//                     utoCapitalize="none"
//                 />
//                 <TextInput 
//                     secureTextEntry
//                     style={[styles.textInput]}
//                     placeholder='Password'
//                     placeholderTextColor='#ffffff'
//                 />
                        
//                 <TouchableOpacity 
//                     style={styles.buttonStyle}
//                     onPress={() => navigation.navigate("Registrasi")}
//                 >
//                     <Text style={styles.textSignup}>
//                         Login
//                     </Text>
//                 </TouchableOpacity>
//                 <Text style={styles.instructions}>Don’t have account? Register</Text>
//             </View>
//         );
//     }

//     regisPage = ({navigation}) => {
//         return(
//             <Regis/>
//         );
//     }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1ABC9C',
//     flexDirection: 'column'
//   },
//   textInput:{
//     height: 40,
//     borderColor: '#ffffff',
//     borderWidth: 1,
//     color:'#ffffff',
//     paddingLeft:10,
//     paddingRight:10,
//     marginBottom:10,
//     width:350
//   },
//   buttonStyle:{
//     backgroundColor:'#ffffff',
//     paddingLeft:10,
//     paddingRight:10,
//     marginTop:10,
//     width:350
//   },
//   textSignup: {
//     fontSize: 16,
//     textAlign: 'center',
//     margin: 10,
//     color:'#1ABC9C'
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#ffffff',
//     marginBottom: 5,
//     marginTop:10
//   },
// });