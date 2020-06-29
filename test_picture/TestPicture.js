import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'

export default class TestPicture extends React.Component {
  state = {
    photo: null,
    sizeArray: [],
    filterFoto: null,
    urlFoto: null
  }

  getListFoto = () => {
    fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/listFoto', {
        method: "GET",
        headers: {
        'Content-Type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            this.setState({
                sizeArray: responseJson
            })
        }
        )
        .catch((error) => 
        console.error(error)
        )
        .finally(() => console.log(this.state.sizeArray.length + 1));
}

  fetchUploadFoto = () => {
    fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/addFoto', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            no_urut: this.state.sizeArray.length + 1,
            foto: this.state.photo.uri
        })
        })
        .then((response) => response.json())
        .then((responseJson) => 
        {
            console.log(responseJson)
        }
        )
        .catch((error) => 
        console.error(error)
        )
        .finally(() => this.setState({photo: null}));

        // console.log(this.state.array)
}

    fetchShowFoto = () => {
        fetch('https://us-central1-fir-firebase-f7194.cloudfunctions.net/user/filterFoto', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                no_urut: 2
            }, 
            console.log(this.state.body))
            })
            .then((response) => response.json())
            .then((responseJson) => 
                this.setState(
                    {
                        urlFoto: responseJson.body.foto
                    }
                )
            //   console.log(responseJson.body.foto)
            )
            .catch((error) => 
            console.error(error)
            )
            .finally(() => console.log("urlFoto = " + this.state.urlFoto));
    }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
        console.log('uri foto = ' + this.state.photo.uri);
        console.log('uri foto = ' + response.uri);
      }
    })
  }

  componentDidMount(){
      setTimeout(() => {
          this.getListFoto()
          this.fetchShowFoto()
      }, 100
    )
  }

  render() {
    const { photo, urlFoto } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {urlFoto && (
          <Image
            source={{ uri: this.state.urlFoto}}
            style={{ width: 200, height: 200, borderRadius: 200 }}
          />
        )}

        {photo && (
          <Image
            source={{ uri: photo.uri}}
            style={{ width: 200, height: 200 }}
          />
        )}
        
        {/* <Image
            source={{ uri: this.state.urlFoto }}
            style={{ width: 300, height: 300 }}
          /> */}
        <Button title="Choose Photo" onPress={() => this.handleChoosePhoto()} />
        <Button title="Upload Photo" onPress={() => this.fetchUploadFoto()} />
      </View>
    )
  }
}