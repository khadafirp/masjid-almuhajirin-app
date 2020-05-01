import React from 'react';
import { SafeAreaView, View, Text, Image, FlatList } from 'react-native';
import { SliderBox } from "react-native-image-slider-box"

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
                "title": "Transfer"
            },
            {
                "image": require("../../images/showpassword.png"),
                "title": "Bayar"
            },
            {
                "image": require("../../images/showpassword.png"),
                "title": "Beli"
            },
        ]
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
                        Khadafi Rohman Prihanda
                    </Text>

                    <Text
                        style={{color: "white", fontSize: 13, marginTop: 8}}
                    >
                        081281555816
                    </Text>
                </View>
            </View>
        </View>
        </View>

        <View style={{marginStart: 15, marginTop: 20}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>
                Layanan
            </Text>
        </View>

        <View style={{marginTop: 20, justifyContent: "center", alignItems: "center"}}>
            <FlatList
                data={this.state.data}
                scrollEnabled= {false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={{width: 90, alignItems: 'center'}}>
                  <View style= {styles.containerFiturCard}>
                    <Image 
                        style= {styles.imageFitur}  
                        source={item.image}/>
                  </View>
                  <View style= {{ alignItems: 'center', width: 80, position: 'relative'}}>
                    <Text style={styles.titleFitur}>
                        {item.title}
                    </Text>
                  </View>
                </View>
                }
                keyExtractor={item => item.image}
              />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#000000',
    marginTop: 6,
    marginBottom: 10,
  },
}