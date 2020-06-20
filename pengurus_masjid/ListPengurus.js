import React from 'react';
import { StyleSheet, Platform, ActivityIndicator, AsyncStorage, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ListPengurus extends React.Component {

    state = {
        dataListPengurus: "",
        isLoading: false
    }

    fetchDataPengurus = () => {
        fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/listPengurus', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((responseJson) => 
            {
                const string = responseJson;
                const array = [], obj = string;
                for(i in obj){
                    const value = obj[i]
                    array.push(value)
                    // console.log(array.sort())
                }

                function sortByProperty(property){  
                    return function(a,b){  
                       if(a[property] > b[property])  
                          return 1;  
                       else if(a[property] < b[property])  
                          return -1;  
                   
                       return 0;  
                    }  
                 }

                 const value = array.sort(sortByProperty("nama_pengurus"));
                 this.setState(
                     {
                         dataListPengurus: value
                     }
                 )

                console.log(array.sort(sortByProperty("nama_pengurus")));
            }
            //   console.log(responseJson)
            // this.setState(
            //     {
            //         dataListPengurus: responseJson
            //     }
            // )
            )
            .catch((error) => 
            console.error(error)
            )
            .finally(() => this.setState({isLoading: false}));

            console.log(this.state.dataListPengurus)
    }

    _storeData = async (value) => {
        try {
          await AsyncStorage.setItem('namaPengurus', value);
        } catch (error) {
          console.log(error)
        }
      };

    componentDidMount(){
        setTimeout(() => {
            if (Platform.OS === 'ios') {
                this.fetchDataPengurus()                
            }else{
                this.fetchDataPengurus()
            }

        }, 1000)
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1,
                backgroundColor: '#f8f8f8',
                height: "100%",
                width: "100%"
            }}>
                <View>
                    {/* <View style={{width: "100%", height: 50, backgroundColor: "white", shadowOffset:{width: 2,  height: 2}, shadowOpacity: 0.1, flexDirection: 'row'}}>
                        <Image style={{width: 50, height: 50}} source={require("../images/masjidalmuhajirin.png")}/>

                        <View style={{position: 'absolute', height: 50, width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}>
                                Pengurus
                            </Text>
                        </View>
                    </View> */}

                    <View style={{marginTop: 20}}>
                    {this.state.isLoading ? <ActivityIndicator/> : (
                        <FlatList
                        // numColumns= {2}
                        data={this.state.dataListPengurus}
                        scrollEnabled= {false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("DetailPengurus") && this._storeData(item.nama_pengurus)}
                            // onPress={() => this.fetchDataPengurus()}
                        >
                        <View style={{marginStart: 20, marginTop: 10, marginEnd: 20}}>
                            <View style={{width: "100%", height: 50, borderRadius: 8, backgroundColor: "#FFF", shadowOpacity: 0.1, flexDirection: 'row'}}>
                                <View style={{height: 50, width: 50, marginStart: 10, justifyContent: 'center'}}>
                                    <Image style={{height: 40, width: 40, borderRadius: 30, backgroundColor: "#f0f0f0"}}/>
                                </View>

                                <View style={{height: 50, width: 180, marginStart: 10, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 11}}>
                                        {
                                            item.nama_pengurus
                                        }
                                    </Text>
                                </View>

                                <View style={{height: 50, width: 100, marginStart: 10, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 11, width: 100}}>
                                        {
                                            item.jabatan
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                        }
                        keyExtractor={item => item.image}
                        />
                )}
                </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerFiturCard: {
        borderRadius: 4,
        flexDirection: 'row',
        position: 'relative',
        elevation: 5,
        shadowOpacity: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 50,
        height: 50,
      },
      imageFitur: {
        borderRadius: 4,
        width: 50,
        height: 50,
      },
      titleFitur: {
        flex: 1,
        fontSize: 11,
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 10,
      },
})





//=============================================
//============== using MYSQL ==================
//=============================================

// import React from 'react';
// import { StyleSheet, Platform, ActivityIndicator, AsyncStorage, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button, Alert} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// export default class ListPengurus extends React.Component {

//     state = {
//         dataListPengurus: "",
//         isLoading: false
//     }

//     fetchDataPengurus = () => {
//         fetch('http://localhost:3306/api/dataPengurus', {
//             method: "GET",
//             headers: {
//             'Content-Type': 'application/json'
//             }
//             })
//             .then((response) => response.json())
//             .then((responseJson) => 
//             //   console.log(responseJson)
//             this.setState(
//                 {
//                     dataListPengurus: responseJson
//                 }
//             )
//             )
//             .catch((error) => 
//             console.error(error)
//             )
//             .finally(() => this.setState({isLoading: false}));

//             console.log(this.state.dataListPengurus)
//     }

//     _storeData = async (value) => {
//         try {
//           await AsyncStorage.setItem('namaPengurus', value);
//         } catch (error) {
//           console.log(error)
//         }
//       };

//     componentDidMount(){
//         setTimeout(() => {
//             if (Platform.OS === 'ios') {
//                 this.fetchDataPengurus()                
//             }else{
//                 this.fetchDataPengurus()
//             }

//         }, 1000)
//     }

//     render(){
//         return(
//             <SafeAreaView style={{flex: 1,
//                 backgroundColor: '#f8f8f8',
//                 height: "100%",
//                 width: "100%"
//             }}>
//                 <View>
//                     {/* <View style={{width: "100%", height: 50, backgroundColor: "white", shadowOffset:{width: 2,  height: 2}, shadowOpacity: 0.1, flexDirection: 'row'}}>
//                         <Image style={{width: 50, height: 50}} source={require("../images/masjidalmuhajirin.png")}/>

//                         <View style={{position: 'absolute', height: 50, width: "100%", alignItems: 'center', justifyContent: 'center'}}>
//                             <Text style={{fontWeight: 'bold'}}>
//                                 Pengurus
//                             </Text>
//                         </View>
//                     </View> */}

//                     <View style={{marginTop: 20}}>
//                     {this.state.isLoading ? <ActivityIndicator/> : (
//                         <FlatList
//                         // numColumns= {2}
//                         data={this.state.dataListPengurus}
//                         scrollEnabled= {false}
//                         showsVerticalScrollIndicator={false}
//                         renderItem={({item}) =>
//                         <TouchableOpacity
//                             onPress={() => this.props.navigation.navigate("DetailPengurus") && this._storeData(item.nama_pengurus)}
//                             // onPress={() => this.fetchDataPengurus()}
//                         >
//                         <View style={{marginStart: 20, marginTop: 10, marginEnd: 20}}>
//                             <View style={{width: "100%", height: 50, borderRadius: 8, backgroundColor: "#FFF", shadowOpacity: 0.1, flexDirection: 'row'}}>
//                                 <View style={{height: 50, width: 50, marginStart: 10, justifyContent: 'center'}}>
//                                     <Image style={{height: 40, width: 40, borderRadius: 30, backgroundColor: "#f0f0f0"}}/>
//                                 </View>

//                                 <View style={{height: 50, width: 180, marginStart: 10, justifyContent: 'center'}}>
//                                     <Text style={{fontSize: 11}}>
//                                         {
//                                             item.nama_pengurus
//                                         }
//                                     </Text>
//                                 </View>

//                                 <View style={{height: 50, width: 100, marginStart: 10, justifyContent: 'center'}}>
//                                     <Text style={{fontSize: 11, width: 100}}>
//                                         {
//                                             item.jabatan
//                                         }
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                         </TouchableOpacity>
//                         }
//                         keyExtractor={item => item.image}
//                         />
//                 )}
//                 </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     containerFiturCard: {
//         borderRadius: 4,
//         flexDirection: 'row',
//         position: 'relative',
//         elevation: 5,
//         shadowOpacity: 0.1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         width: 50,
//         height: 50,
//       },
//       imageFitur: {
//         borderRadius: 4,
//         width: 50,
//         height: 50,
//       },
//       titleFitur: {
//         flex: 1,
//         fontSize: 11,
//         textAlign: 'center',
//         marginTop: 6,
//         marginBottom: 10,
//       },
// })