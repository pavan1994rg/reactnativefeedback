import React,{Component} from 'react';
import {Text,View,Scrollview} from 'react-native';
import { Button, Card, CardSection, Input  } from './common';
import RNFetchBlob from 'react-native-fetch-blob';
export default class getUsers extends Component{
   
state={
	users:[]
}

   componentWillMount() {
  RNFetchBlob.fetch('GET','https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/qtpi/persons?top=1000',{
      'Accept': 'application/json',
      'Ocp-Apim-Subscription-Key': '145e8da74d1c410d9d85d79750aee04d'
    }, ).then((resp)=>{
  
  
    })
.catch((err)=>{
this.setState({users:JSON.stringify(err)});
    });
  }


  renderUsers(){
  	
  this.state.users.map(user=><Text>{user.name}</Text>);

  }
render(){

   return(
  
     <CardSection>
    
       <Card>
       <Text>{this.state.users}</Text>
      </Card>
      
    </CardSection>


 

   	);



}


}