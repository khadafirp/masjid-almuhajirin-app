import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import * as Progress from 'react-native-progress';

export default class SplashScreen extends React.Component {

    state = {
        progressBar: 0,
        tes: ""
    }

    handleMax = () => {
        if(this.state.progressBar === 1 || this.state.progressBar > 1){
            return this.setState({tes : "Full"})
        }

        if(this.state.progressBar === 0.1){
            return this.setState({tes : 10})
        }

        if(this.state.progressBar === 0.2){
            return this.setState({tes : 20})
        }

        return this.setState({tes : JSON.stringify(this.state.progressBar).substr(2, 2)})
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({progressBar: this.state.progressBar + ((2100 / 10000))})
            this.handleMax()
        }, 1000)
    }

  render() {
      var a = JSON.stringify(this.state.tes) + "%"
    return (
      <SafeAreaView style={styles.viewStyles}>
        <Image 
          style={{width: 300, height: 300, marginBottom: 60}}
          source={require("../images/masjidalmuhajirin.png")}/>

        <Progress.Bar 
            styleAttr="Horizontal"
            progress={this.state.progressBar} 
            width={200} 
            indeterminate={false}
        />
            
        <Text>
            {
                this.state.tes
            }
        </Text>
        
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