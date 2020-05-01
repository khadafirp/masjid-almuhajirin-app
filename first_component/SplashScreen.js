import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';

export default class SplashScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
        <Image 
          style={{width: 300, height: 300, marginBottom: 60}}
          source={require("../images/masjidalmuhajirin.png")}/>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}