import React from 'react';
import { SafeAreaView, View, Text, Image, FlatList, ScrollView, TouchableOpacity, Share} from 'react-native';
import { SliderBox } from "react-native-image-slider-box"

var SharedPreferences = require('react-native-shared-preferences')

export default class HomeScreen extends React.Component {

    state = {
        images: [
            "https://source.unsplash.com/1024x768/?nature",
            "https://source.unsplash.com/1024x768/?water",
            "https://source.unsplash.com/1024x768/?girl",
            "https://source.unsplash.com/1024x768/?tree", // Network image
            // require('./assets/images/girl.jpg'),          // Local image
          ],

          data: [
            {
                "image": require("../../images/showpassword.png"),
                "title": "Jadwal"
            },
            {
                "image": require("../../images/showpassword.png"),
                "title": "Kegiatan"
            },
            {
                "image": require("../../images/showpassword.png"),
                "title": "Dakwah"
            },
        ],
        username: "khadafi",
        password: "123",
        namaUser: "",
        noHpUser: ""
    }

    fetchDataProfil = (username, password) => {
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
        //   console.log(responseJson.body.nama_lengkap)
          this.setState(
            {
              namaUser: responseJson.body.nama_lengkap,
              noHpUser: responseJson.body.no_hp
            }
          )
        )
        .catch((error) => 
          console.error(error)
        )
        .finally(() => this.setState({isLoading: false}));
    }

    componentDidMount(){
        this.fetchDataProfil(
            this.state.username, this.state.password
        )
    }
    

  render() {
    
    return (
      <SafeAreaView style={styles.viewStyles}>
          <View style={{height: 300}}>
            <SliderBox
                images={this.state.images}
                sliderBoxHeight={400}
                dotColor="#91bd0e"
                inactiveDotColor="#90A4AE"
            />

        <View style={styles.header}>
            <View style={{flexDirection: "row"}}>
                <View style={{height: 60, width: 60, borderRadius: 40, marginStart: 15, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center"}}>
                    <Image
                        style={{height: 40, width: 40, tintColor: "#919191"}}
                        source={require("../../images/ic_akun.png")}
                    />
                </View>

                <View style={{justifyContent: "center", marginStart: 15}}>
                    <Text
                        style={{color: "white", fontSize: 12}}
                    >
                        {
                            this.state.namaUser
                        }
                    </Text>

                    <Text
                        style={{color: "white", fontSize: 13, marginTop: 8}}
                    >
                        {
                            this.state.noHpUser
                        }
                    </Text>
                </View>

                <View style={{width: 160, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Image
                        style={{height: 30, width: 30, tintColor: 'white'}}
                        source={
                            require('../../images/menu_dot.png')
                        }
                    />
                </View>
            </View>
        </View>
        </View>

        <View style={{marginStart: 15, marginTop: 20}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>
                Layanan
            </Text>
        </View>

        <View style={{justifyContent: "center"}}>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    // onPress={() => this.fetchDataProfil(this.state.username, this.state.password)}
                >
                    <View style={styles.cardLayanan}>
                        <Image
                            style={{height: 60, width: "80%"}} 
                            source={require('../../images/jadwal.png')}/>
                        <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center", marginTop: 4}}/>
                        <Text style={{fontSize: 13, marginTop: 3, justifyContent: "center", alignItems: "center"}}>
                            Jadwal
                        </Text>
                    </View>
                </TouchableOpacity>

            <View style={styles.cardLayanan}>
                <Image
                    style={{height: 60, width: "80%"}} 
                    source={require('../../images/dakwah.png')}/>
                <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center", marginTop: 4}}/>
                <Text style={{fontSize: 13, marginTop: 3, justifyContent: "center", alignItems: "center"}}>
                    Kegiatan
                </Text>
            </View>
            </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center', margin: 23}}>
        <View style={styles.cardDakwah}>
            <Image
                style={{height: 60, width: "40%"}} 
                source={require('../../images/kegiatan.png')}/>
            <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center", marginTop: 4}}/>
            <Text style={{fontSize: 13, marginTop: 3, justifyContent: "center", alignItems: "center"}}>
                Dakwah
            </Text>
        </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  header: {
    position: "absolute", 
    height: 100, 
    width: "100%",
    justifyContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.4)', 
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardLayanan: {
      width: 170,
      height: 100,
      borderRadius: 8,
      backgroundColor: "white",
      elevation: 6,
      marginTop: 20,
      marginStart: 23,
      justifyContent: "center",
      alignItems: "center"
  },
  cardDakwah: {
    width: "100%",
    height: 100,
    borderRadius: 8,
      backgroundColor: "white",
      elevation: 6,
      justifyContent: "center",
      alignItems: "center"
}
}