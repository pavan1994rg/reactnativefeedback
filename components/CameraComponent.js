'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,Image,
  AsyncStorage
} from 'react-native';
import Camera, { front } from 'react-native-camera';
import { Button, Card, CardSection, Input  } from './common';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import { NativeModules } from 'react-native';
export default class CameraComponent extends Component{
  componentWillMount() {
  RNFetchBlob.fetch('POST','https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/qtpi/train',{
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '145e8da74d1c410d9d85d79750aee04d'
    }, ).then((resp)=>{
    });
  }
state={
  visible:''
}
  state = {
      myText: 'My Original Text'
   }
  imagedata;
  options = {
    title: 'Select Avatar',
    customButtons: [
      { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

 render(props) {
    return (

<View style={styles.container}>
      <Camera
               ref={(cam) => {
                 this.camera = cam;
               }}
               style={styles.preview}
               aspect={Camera.constants.Aspect.fit}
                type={Camera.constants.Type.front}>
               <Text style={styles.capture} onPress={this.takePicture.bind(this)}>capture</Text>
       </Camera>
</View>

    );
  }
  takePicture() {
   const options = {  };
   //options.location = ...
   this.camera.capture({data: options})
     .then((data) => {
          let base64Img = data.path;
          RNFS.readFile( base64Img, 'base64' )
            .then( res => AsyncStorage.setItem('imagedata',res));
        RNFS.readFile( base64Img, 'base64' )
            .then( res => this.fetchFaceId (res))

        }) .catch(err => console.error(err));
 }

renderCamera() {
  ImagePicker.showImagePicker((response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    const source = { uri: response.path };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source
    });
           this.fetchFaceId(response);
}
});
}
 fetchFaceId(res){
   this.startLoading(res);
   RNFetchBlob.fetch('POST', 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false', {
     'Accept': 'application/json',
     'Content-Type': 'application/octet-stream',
     'Ocp-Apim-Subscription-Key': '145e8da74d1c410d9d85d79750aee04d'
 }, res)
 .then((resp) => {
     return resp.json();
 })
 .then((json) => {
   this.setState({
     myText:JSON.stringify(json)
   })
     if(json.length){
        this.fetchPersonId(json);
         const element = (
           React.createElement(Text,
                        "Wazoo")
 );
     }else{
          this.startLoading(false);
      Toast.show('Sorry I cant any faces in there');
     }
     return json;
 })
 .catch (function (error) {
     console.log(error);
       this.startLoading(false);
     Toast.show('Sorry Request failed');
 });

}
 fetchPersonId(jsondata){
   this.state = {
   entryDate: [],
}
      this.setState({ entryDate: jsondata });
      this.state.entryDate.map(d => this.setState({ entryDate : d.faceId }));
     const send={
       "personGroupId": "qtpi",
    "faceIds": [this.state.entryDate]

  };
     this.setState({myText:JSON.stringify(send)});
      RNFetchBlob.fetch('POST', 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify', {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': ' 145e8da74d1c410d9d85d79750aee04d'
    }, JSON.stringify(send))
    .then((resp) => {
        return resp.json();
    })
    .then((json) => {
      this.setState({ entryDate: json });
      this.state.entryDate.map(d =>this.setState({entryDate:d.candidates}));
      if (this.state.entryDate === []) {
        this.startLoading(false);
      Toast.show('You Have not registered , Please Register');

      }
      this.state.entryDate.map(p=>this.setState({entryDate:p.personId}));
this.getPerson(this.state.entryDate);
if(json.length) {
    const element = (
      React.createElement(Text,
                   "Wazoo")
);
}else{
}
      }).catch (function (error) {
          console.log(error);
            this.startLoading(false);
          Toast.show('Something went wrong , please try again');
      });
}

getPerson(person){
  RNFetchBlob.fetch('GET', 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/qtpi/persons/'+person, {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': ' 145e8da74d1c410d9d85d79750aee04d'
},)
.then((resp) => {
    return resp.json();
})
.then((json) => {
  this.setState({myText:JSON.stringify(json)});
this.update(json);
if(json.length) {
  alert(json);

const element = (
  React.createElement(Text,
               "Wazoo")
);
}else{
}
  }).catch (function (error) {
      console.log(error);
  });
}
update(per) {
      this.props.onUpdate(per);
    }
    startLoading(lod){
this.setState({visible:lod})
    }
 }

const styles = StyleSheet.create({
 container: {

  height: 300,
   flexDirection: 'row',
 },
 preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center'
 },
 capture: {
   flex: 0,
   backgroundColor: '#fff',
   borderRadius: 5,
   color: '#000',
   padding: 10,
   margin: 40
 }
});
