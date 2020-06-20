import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DetailPengurus extends React.Component {

    state = {
        isLoading: false,
        namaPengurus: "",
        jabatanPengurus: "",
        alamatPengurus: "",
        noHpPengurus: ""
    }

    fetchEditProfil = async () => {
        const value = await AsyncStorage.getItem('namaPengurus');
        console.log(value);

        fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/filterPengurus', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama_pengurus: value
            }, 
            console.log(this.state.body))
            })
            .then((response) => response.json())
            .then((responseJson) => 
            //   console.log(responseJson)
            this.setState(
                {
                    namaPengurus: responseJson.body.nama_pengurus,
                    jabatanPengurus: responseJson.body.jabatan,
                    alamatPengurus: responseJson.body.alamat_pengurus,
                    noHpPengurus: responseJson.body.no_hp_pengurus
                }
            )
            )
            .catch((error) => 
            console.error(error)
            )
            .finally(() => this.setState({isLoading: false}));
    }

    componentDidMount(){
        setTimeout(() => {
            this.fetchEditProfil()
        }, 1000)
    }

    render(){
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: "#f0f0f0"}}>
                <View style={{width: "100%", height: "70%", backgroundColor: "white", borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                        <View style={{width: 100, height: 100, backgroundColor: "#f0f0f0", borderRadius: 70}}></View>
                    </View>

                    <View style={{ marginTop: 30}}>
                        <Text style={{fontSize: 10, marginStart: 20}}>
                            Nama
                        </Text>
                        
                        <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
                            <Text>
                                {
                                    this.state.namaPengurus
                                }
                            </Text>
                        </View>

                        <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
                            Jabatan
                        </Text>
                        
                        <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
                            <Text>
                                {
                                    this.state.jabatanPengurus
                                }
                            </Text>
                        </View>

                        <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
                            Alamat
                        </Text>
                        
                        <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
                            <Text>
                                {
                                    this.state.alamatPengurus
                                }
                            </Text>
                        </View>

                        <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
                            No Handphone
                        </Text>
                        
                        <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
                            <Text>
                                {
                                    this.state.noHpPengurus
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}






//=============================================
//================ Using MYSQL ================
//=============================================

// import React from 'react';
// import { StyleSheet, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button, Alert} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// export default class DetailPengurus extends React.Component {

//     state = {
//         isLoading: false,
//         namaPengurus: "",
//         jabatanPengurus: "",
//         alamatPengurus: "",
//         noHpPengurus: ""
//     }

//     fetchEditProfil = async () => {
//         const value = await AsyncStorage.getItem('namaPengurus');
//         console.log(value);

//         fetch('http://localhost:3306/api/filterPengurus', {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 nama_pengurus: value
//             }, 
//             console.log(this.state.body))
//             })
//             .then((response) => response.json())
//             .then((responseJson) => 
//             //   console.log(responseJson.body)
//             this.setState(
//                 {
//                     namaPengurus: responseJson.body.nama_pengurus,
//                     jabatanPengurus: responseJson.body.jabatan,
//                     alamatPengurus: responseJson.body.alamat_pengurus,
//                     noHpPengurus: responseJson.body.no_hp_pengurus
//                 }
//             )
//             )
//             .catch((error) => 
//             console.error(error)
//             )
//             .finally(() => this.setState({isLoading: false}));
//     }

//     componentDidMount(){
//         setTimeout(() => {
//             this.fetchEditProfil()
//         }, 1000)
//     }

//     render(){
//         return (
//             <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: "#f0f0f0"}}>
//                 <View style={{width: "100%", height: "70%", backgroundColor: "white", borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}>
//                     <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
//                         <View style={{width: 100, height: 100, backgroundColor: "#f0f0f0", borderRadius: 70}}></View>
//                     </View>

//                     <View style={{ marginTop: 30}}>
//                         <Text style={{fontSize: 10, marginStart: 20}}>
//                             Nama
//                         </Text>
                        
//                         <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
//                             <Text>
//                                 {
//                                     this.state.namaPengurus
//                                 }
//                             </Text>
//                         </View>

//                         <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
//                             Jabatan
//                         </Text>
                        
//                         <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
//                             <Text>
//                                 {
//                                     this.state.jabatanPengurus
//                                 }
//                             </Text>
//                         </View>

//                         <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
//                             Alamat
//                         </Text>
                        
//                         <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
//                             <Text>
//                                 {
//                                     this.state.alamatPengurus
//                                 }
//                             </Text>
//                         </View>

//                         <Text style={{fontSize: 10, marginStart: 20, marginTop: 20}}>
//                             No Handphone
//                         </Text>
                        
//                         <View style={{marginTop: 8, backgroundColor: "#f0f0f0", height: 40, justifyContent: 'center', paddingLeft: 20}}>
//                             <Text>
//                                 {
//                                     this.state.noHpPengurus
//                                 }
//                             </Text>
//                         </View>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }