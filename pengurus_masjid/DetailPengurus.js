import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage, Text, View, TextInput, CheckBox, Image, SafeAreaView, FlatList, ScrollView, Button, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DetailPengurus extends React.Component {
    render(){
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    Detail Pengurus Screen
                </Text>
            </SafeAreaView>
        )
    }
}