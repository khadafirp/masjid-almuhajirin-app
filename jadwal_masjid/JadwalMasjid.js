import React from 'react';
import { SafeAreaView, RefreshControl, View, AsyncStorage, Text, Image, FlatList, ScrollView, TouchableOpacity, Share, Alert} from 'react-native';
import { SliderBox } from "react-native-image-slider-box"
import DetailSejarah from '../sejarah_masjid/DetailSejarah'

var SharedPreferences = require('react-native-shared-preferences')

export default class SejarahMasjid extends React.Component {

    state = {
        data: "",
        listDataJadwal: "",
        titleValue: "Masjid",
        titleDetail: "",
        textDetail: "",
        refreshing: false,
    }

    kondisi = (value) => {
      if (value === null) {
        return Alert.alert("Maaf, tidak ada jadwal saat ini")
      }else{
        return value.substr(0, 10)
      }
    }

    fetchDataSejarah = () => {
        fetch('http://localhost:3306/api/dataJadwal', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((responseJson) => 
            //   console.log(responseJson)
            this.setState(
                {
                    data: responseJson
                }
            )
            )
            .catch((error) => 
            console.error(error)
            )
            .finally(() => this.setState({isLoading: false}));

            console.log(this.state.data)
    }

      fetchFilterSejarah = async () => {
        var value = await AsyncStorage.getItem("titleSejarah")
        try{
            if (value === null || value === "") {

                fetch('http://localhost:3306/api/filterJadwal', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kategori: "Masjid"
                }, 
                console.log(this.state.body))
                })
                .then((response) => response.json())
                .then((responseJson) => 
                //   console.log(responseJson)
                this.setState({
                    listDataJadwal: responseJson.body
                })
                )
                .catch((error) => 
                console.error(error)
                )
                .finally(() => console.log(this.state.listDataJadwal));

                // this.cutArray(this.state.listDataJadwal)
                
            }else{
                fetch('http://localhost:3306/api/filterJadwal', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kategori: value
                }, 
                console.log(this.state.body))
                })
                .then((response) => response.json())
                .then((responseJson) => 
                //   console.log(responseJson)
                this.setState({
                    listDataJadwal: responseJson.body
                })
                )
                .catch((error) => 
                console.error(error)
                )
                .finally(() => console.log(this.state.listDataJadwal));

                // this.cutArray(this.state.listDataJadwal)
            }
        }catch(error){
            console.log(error)
        }
    }

    onRefresh = () => {
        let that = this
        this.setState({refreshing: true});

        setTimeout(() => {
            that.setState({refreshing: false});
            that.fetchDataSejarah()
            that.fetchFilterSejarah()
        }, 3000);
      };

    clearAsync = async () => {
        await AsyncStorage.removeItem("titleSejarah")
    }

    _storeData = async (value) => {
        try {
          await AsyncStorage.setItem('titleSejarah', value);
        //   this.clearAsync()

        if(value > 2){
          return enable = false
        }
        setTimeout(() => {
          this.fetchFilterSejarah()
        }, 300)
          // this.fetchFilterSejarah()
        //   this.props.navigation.navigate('DetailSejarah')
        } catch (error) {
          console.log(error)
        }
      };

    componentDidMount(){
        setTimeout(() => {
            this.fetchDataSejarah()
            this.clearAsync()
            this.fetchFilterSejarah()
        }, 500)
    }

    storeKeyTitleJadwal = async (value) => {
      try{
        await AsyncStorage.setItem('titleJadwal', value)
        this.props.navigation.navigate('detailJadwal')
      }catch(error){
        console.log(error)
      }
    }

  render() {
    
    return (
      <SafeAreaView style={styles.viewStyles}>
          <ScrollView 
                style={{width: "100%", height: 400}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
          >
          <View style={{height: "100%"}}>
              <View>
              <ScrollView 
                style={{height: 60, width: "100%"}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
              <FlatList
                    numColumns= {5}
                    data={this.state.data}
                    scrollEnabled= {true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                
                    <TouchableOpacity 
                      onPress={() => this._storeData(item.kategori)}>
                        <View style={{height: 40, width: 90, marginTop: 10, marginStart: 10, shadowOpacity: 0.1, borderRadius: 6, borderColor: 'black', borderWidth: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Image
                                style={{height: 60, width: "40%"}} 
                                source={require('../images/kegiatan.png')}/> */}
                            {/* <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center", marginTop: 4}}/> */}
                            <Text style={{fontSize: 11, marginTop: 3, justifyContent: "center", alignItems: "center", fontWeight: 'bold'}}>
                                {
                                    item.kategori
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                      }
                />
                </ScrollView>

                <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center"}}/>

                <SafeAreaView>
                  <View style={{marginTop: 20, marginEnd: 25}}>
                    <View style={{marginStart: 20}}>
                    <Text style={{color: 'grey', fontSize: 11}}>
                        Agenda
                      </Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-end', position: 'absolute'}}>
                      <Text style={{color: 'grey', fontSize: 11}}>
                        Tanggal
                      </Text>
                    </View>
                  </View>
                <ScrollView 
                  style={{width: "100%"}}
                  showsVerticalScrollIndicator={false}
                  >
                    <View>
                      
                    <FlatList
                        // numColumns= {5}
                        data={this.state.listDataJadwal}
                        scrollEnabled= {true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        
                      <View>
                        <TouchableOpacity
                          onPress={() => this.storeKeyTitleJadwal(item.title)}
                        >
                        <View style={{height: 60, width: "100%", alignItems: "center", backgroundColor: "white", flexDirection: 'row'}}>
                          <View style={{width: "48%"}}>
                            <Text style={{fontSize: 12, paddingStart: 10}}>
                                {
                                    item.title
                                }
                            </Text>
                          </View>

                          <View style={{alignItems: 'flex-end', width: "100%", position: 'absolute'}}>
                            <Text style={{fontSize: 12, paddingEnd: 10}}>
                              {
                                item.tanggal.substr(0, 10)
                              }
                            </Text>
                          </View>
                          </View>
                        <View style={{width: "100%", height: 0.4, backgroundColor: "black"}}/>
                        </TouchableOpacity>
                      </View>
                    }
                    />
                    </View>
                    </ScrollView>
                </SafeAreaView>
                </View>
        </View>        
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    backgroundColor: 'white',
    height: "100%"
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  header: {
    position: "absolute", 
    height: "100%", 
    width: "100%",
    // justifyContent: "center",
    // backgroundColor: 'rgba(52, 52, 52, 0.4)', 
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
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