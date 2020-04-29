import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

export default class FormSignUp extends Component {
  
  state = {
    isFocused: false,
    date: ""
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

  render() {
    return (
      <View style={styles.container}>
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

          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 9}}>
              Username
            </Text>
            <TextInput
                style={styles.textInput}
                selectionColor={"#000000"}
                underlineColorAndroid={
                  (this.state.isFocused) ? "#1ABC9C" : "#000000"
                }
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
          </View>

          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 9}}>
              Password
            </Text>
            <TextInput
                style={styles.textInput}
                selectionColor={"#000000"}
                underlineColorAndroid={
                  (this.state.isFocused) ? "#1ABC9C" : "#000000"
                }
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
          </View>

          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 9}}>
              Tanggal Lahir
            </Text>
              <DatePicker
                style={{width: 200}}
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

        </View>
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  textInputNamaDepan:{
    height: 40,
    color:'#000000',
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingLeft: 6,
    marginBottom:10,
    marginTop: 15,
    width:180
  },
  textInput:{
    height: 40,
    color:'#000000',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:10,
    marginTop: 8,
    width:"100%"
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
});