/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler'
import App from './App';
import Splash from './first_component/SplashScreen.js'
import Login from './first_component/Login.js'
import Registrasi from './first_component/Regis.js'
import RouterHome from './halaman_utama/home_page/router_home'
import LandingPage from './halaman_utama/LandingPage.js'
import Profil from "./halaman_utama/profile_page/ProfileScreen"
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Profil);
