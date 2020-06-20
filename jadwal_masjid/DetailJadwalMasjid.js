import React from 'react';
import { SafeAreaView, RefreshControl, View, AsyncStorage, Text, Image, FlatList, ScrollView, TouchableOpacity, Share, Alert} from 'react-native';

export default class DetailJadwalMasjid extends React.Component{

    state = {
        refreshing: false,
        tanggalJadwal: "",
        titleJadwal: "",
        isiDetailJadwal: "",
        lokasi: "",
        waktu: ""
    }

    fetchDataJadwal = async () => {
        const value = await AsyncStorage.getItem('titleJadwal')
        fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/filterDetailJadwal', {
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
                    tanggalJadwal: responseJson.body.tanggal.substr(0, 10),
                    titleJadwal: responseJson.body.title,
                    isiDetailJadwal: responseJson.body.detail_jadwal,
                    lokasi: responseJson.body.lokasi,
                    waktu: responseJson.body.waktu
                })
            )
            .catch((error) => 
                console.error(error)
            )
            .finally(() => console.log(this.state.refreshing));
    }

    onRefresh = () => {
        this.setState({refreshing: true})

        setTimeout(() => {
            this.fetchDataJadwal()
            this.setState({refreshing: false})
        }, 500)
    }

    componentDidMount(){
        setTimeout(() => {
            this.fetchDataJadwal()
        }, 500)
    }

    render(){
        return(
            <SafeAreaView style={{height: "100%", width: '100%', backgroundColor: 'white'}}>
                <ScrollView 
                    style={{width: "100%", height: 400}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                
                <View>
                    <View style={{width: "100%", alignItems: 'flex-end', marginTop: 20}}>
                        <Text style={{fontSize: 11, marginEnd: 20}}>
                            {
                                this.state.tanggalJadwal
                            }
                        </Text>
                    </View>

                    <View style={{width: "100%", alignItems: 'center', marginTop: 20}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            {
                                this.state.titleJadwal
                            }
                        </Text>
                    </View>

                    <View style={{width: '100%', marginStart: 20, marginEnd: 20, marginTop: 20}}>
                        <Text style={{fontSize: 13}}>
                            Yang Terhormat,{"\n"}
                            Seluruh warga Rafflesia,
                        </Text>
                    </View>

                    <View style={{width: '100%', marginStart: 20, marginEnd: 20, marginTop: 20}}>
                        <Text style={{fontSize: 13}}>
                            {
                                this.state.isiDetailJadwal
                            }
                        </Text>
                    </View>

                    <View style={{width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 60, fontSize: 13}}>
                                    Lokasi
                                </Text>

                                <Text>
                                    :
                                </Text>
                                
                                <Text style={{marginStart: 10, fontSize: 13}}>
                                    {
                                        this.state.lokasi
                                    }
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 60, fontSize: 13}}>
                                    Waktu
                                </Text>

                                <Text>
                                    :
                                </Text>
                                
                                <Text style={{marginStart: 10, fontSize: 13}}>
                                    {
                                        this.state.waktu
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%', marginStart: 20, marginEnd: 20, marginTop: 20}}>
                        <Text style={{fontSize: 13}}>
                            Penutup
                        </Text>
                    </View>
                </View>
              </ScrollView>
            </SafeAreaView>
        )
    }
}