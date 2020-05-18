import React from 'react';
import { SafeAreaView, RefreshControl, View, AsyncStorage, Text, Image, FlatList, ScrollView, TouchableOpacity, Share} from 'react-native';
import { SliderBox } from "react-native-image-slider-box"
import DetailSejarah from '../sejarah_masjid/DetailSejarah'

var SharedPreferences = require('react-native-shared-preferences')

export default class SejarahMasjid extends React.Component {

    state = {
        data: "",
        titleValue: "Nama",
        titleDetail: "",
        textDetail: "",
        refreshing: false
    }

    fetchDataSejarah = () => {
        fetch('http://localhost:3306/api/dataSejarah', {
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

                fetch('http://localhost:3306/api/filterSejarah', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: "Masjid"
                }, 
                console.log(this.state.body))
                })
                .then((response) => response.json())
                .then((responseJson) => 
                //   console.log(responseJson.body)
                this.setState({
                    titleDetail: responseJson.body.title,
                    textDetail: responseJson.body.title_detail
                })
                )
                .catch((error) => 
                console.error(error)
                )
                .finally(() => this.setState({isLoading: false}));
            }else{
                fetch('http://localhost:3306/api/filterSejarah', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: value
                }, 
                console.log(this.state.body))
                })
                .then((response) => response.json())
                .then((responseJson) => 
                //   console.log(responseJson.body)
                this.setState({
                    titleDetail: responseJson.body.title,
                    textDetail: responseJson.body.title_detail
                })
                )
                .catch((error) => 
                console.error(error)
                )
                .finally(() => this.setState({isLoading: false}));
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
          this.fetchFilterSejarah()
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
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                
                    <TouchableOpacity onPress={() => this._storeData(item.title)}>
                        <View style={{height: 40, width: 90, marginTop: 10, marginStart: 10, shadowOpacity: 0.1, borderRadius: 6, borderColor: 'black', borderWidth: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                            {/* <Image
                                style={{height: 60, width: "40%"}} 
                                source={require('../images/kegiatan.png')}/> */}
                            {/* <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center", marginTop: 4}}/> */}
                            <Text style={{fontSize: 11, marginTop: 3, justifyContent: "center", alignItems: "center"}}>
                                {
                                    item.title
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                      }
                />
                </ScrollView>

                <View style={{width: "100%", height: 0.5, backgroundColor: "#919191", justifyContent: "center", alignItems: "center"}}/>

                <SafeAreaView>
                    <ScrollView 
                        style={{width: "100%", height: 400}}
                        // refreshControl={
                        //     <RefreshControl
                        //       refreshing={this.state.refreshing}
                        //       onRefresh={this.onRefresh}
                        //     />
                        //   }
                    >
                    <View style={{margin: 10}}>
                        <Text>
                        {
                            this.state.titleDetail
                        }
                        </Text>

                        <View style={{marginTop: 30}}>
                            <Text>
                                {
                                    this.state.textDetail
                                }
                            </Text>
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
                </View>
              
          {/* <ScrollView style={styles.header}>

          <View style={{height: 200}}>
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={400}
                    autoplay
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    dotColor="#91bd0e"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                />
              </View>
                
                <View style={{width: '100%', backgroundColor: '#f0f0f0'}}>
                        <Text>
                            Hallo
                        </Text>

                        <Text>
                            stylesd {"\n"}
                            defaulta{"\n"}
                            absolutea{"\n"}
                            absolute{"\n"}
                            {"\n"}
                            absoluteaa{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            absolutecd{"\n"}
                            {"\n"}
                            {"\n"}
                            cardDakwah{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            d{"\n"}
                            {"\n"}
                            {"\n"}
                            a{"\n"}
                            n{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            g{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            a{"\n"}
                            j{"\n"}
                            n{"\n"}
                            m{"\n"}


                            
                        </Text>
                </View>
            </ScrollView> */}

            {/* <ScrollView style={styles.header}>
                <View style={{height: 200, width: '100%',}}/>
                
                <View style={{width: '100%', backgroundColor: '#f0f0f0'}}>
                        <Text>
                            Hallo
                        </Text>

                        <Text>
                            stylesd {"\n"}
                            defaulta{"\n"}
                            absolutea{"\n"}
                            absolute{"\n"}
                            {"\n"}
                            absoluteaa{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            absolutecd{"\n"}
                            {"\n"}
                            {"\n"}
                            cardDakwah{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            cdcd{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            d{"\n"}
                            {"\n"}
                            {"\n"}
                            a{"\n"}
                            n{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            g{"\n"}
                            {"\n"}
                            {"\n"}
                            {"\n"}
                            a{"\n"}
                            j{"\n"}
                            n{"\n"}
                            m{"\n"}


                            
                        </Text>
                </View>
            </ScrollView> */}
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