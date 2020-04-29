/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler'
import App from './App';
import Splash from './first_component/SplashScreen.js'
import Login from './first_component/Login.js'
import Registrasi from './first_component/Regis.js'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
