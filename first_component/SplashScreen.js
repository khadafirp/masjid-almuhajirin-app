import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

export default class SplashScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
      {/* <View style={styles.viewStyles}> */}
        <Text style={styles.textStyles}>
          Blitz Reading
        </Text>
      {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}