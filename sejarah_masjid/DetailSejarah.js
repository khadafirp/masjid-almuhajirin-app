import React from 'react';
import { SafeAreaView, View, AsyncStorage, Text, Image, FlatList, ScrollView, TouchableOpacity, Share} from 'react-native';

export default class DetailSejarah extends React.Component {

    state = {
        titleValue: "Sejarah Nama",
        titleDetail: "",
        textDetail: ""
    }

    fetchFilterSejarah = async () => {
        var value = await AsyncStorage.getItem("titleSejarah")
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

    componentDidMount(){
        setTimeout(() => {
            this.fetchFilterSejarah()
        }, 500)
    }

    render(){
        return(
            <SafeAreaView>
                <Text>
                    {
                        this.state.titleDetail
                    }
                </Text>

                <Text>
                    {
                        this.state.textDetail
                    }
                </Text>
            </SafeAreaView>
        )
    }
}