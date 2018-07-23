import React, { Component } from 'react';
import { Text,AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Button, Card, CardSection, Input } from './common';
import RNFetchBlob from 'react-native-fetch-blob';

class UserDetails extends Component {
  state = { email: '', surname: '', error: '', loading: false, name:'',phonenumber :'',feedback:'' };
  state ={
    text:"awesome",image:"image",result:"image"
  };
  state={
    result:'good'
  }
  state={
    visible:false
  }
 state={
   invalidData:false
 }
componentWillMount(){
  this.state.invalidData=true;
}
  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.name && nextState.surname && nextState.email && nextState.phonenumber && nextState.feedback);
  }
  componentWillReceiveProps(props){
 Toast.show('hi');
this.setState({name:JSON.parse(props.dataupdate.userData).Name});
this.setState({surname:JSON.parse(props.dataupdate.userData).Surname});
this.setState({email:JSON.parse(props.dataupdate.userData).Email});
this.setState({phonenumber:JSON.parse(props.dataupdate.userData).Mobile});
this.setState({feedback:JSON.parse(props.dataupdate.userData).Feedback});

  }
  onButtonPress() {
    try {
   AsyncStorage.setItem('keydata', 'I like to save it.').then((value) => {
           this.setState({ 'keydata': value });
       }).done();
  } catch (error) {
    // Error saving data
  }
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }
  state = {value:"myvalue"};
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }


  saveData(){
    const userdata={

    "name": 'personname',
    "userdata":JSON.stringify({
      "Name":this.state.name,
      "Surname": this.state.surname,
      "Email": this.state.email,
      "Mobile": this.state.phonenumber,
    "Feedback":this.state.feedback })

  };
const data= AsyncStorage.getItem('userdata');
if(data){
var countries = AsyncStorage.getItem('userdata');
AsyncStorage.setItem('userdata', countries += JSON.stringify(userdata));
}
else{
  AsyncStorage.setItem('userdata',JSON.stringify(userdata));
}
  this.setState({name:''});
  this.setState({surname:''});
  this.setState({email:''});
this.setState({phonenumber:''});
this.setState({feedback:''});
    AsyncStorage.setItem('userdata',JSON.stringify(userdata));

  Toast.show('Saved successfull');


  }

  render(props) {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="enter the name"
            label="Name"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="enter a surname"
            label="surname"
            value={this.state.surname}
            onChangeText={surname => this.setState({ surname })}
          />
        </CardSection>
        <CardSection>
        <Input
          placeholder="Phone Number"
          label="phonenumber"
          value={this.state.phonenumber}
           keyboardType = "numeric"
          onChangeText={phonenumber => this.setState({phonenumber })}
        />
        </CardSection>
        <CardSection>
        <Input
          placeholder="user@example.com"
          label="email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        </CardSection>
      <CardSection>
        <Input
            placeholder="feedback"
            label="feedback"
            value={this.state.feedback}
            onChangeText={feedback => this.setState({ feedback })}  />
      </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          <Button onPress={this.buttonpressed.bind(this)} disabled={this.state.invalidData} >Register</Button>
        </CardSection>
      <CardSection>
      <Button  onPress={this.saveData.bind(this)} disabled={this.state.invalidData}>SAVE</Button>
      </CardSection>
      <CardSection>
      <Text >Please enter all the Details to register</Text>
      </CardSection>

     
      </Card>
    );
  }
  buttonpressed(){
// form validation for all the fields entered
 alert('hello');
  this.makevisible(true);
  const userdata={

    "name": 'personname',
    "userdata":JSON.stringify({
      "Name":this.state.name,
      "Surname": this.state.surname,
      "Email": this.state.email,
      "Mobile": this.state.phonenumber,
    "Feedback":this.state.feedback })

  };
  AsyncStorage.getItem('imagedata', (err, result) => {
        this.setState({image:result});
        console.log(result);
      });


   RNFetchBlob.fetch('POSt','https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/qtpi/persons', {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Ocp-Apim-Subscription-Key': '145e8da74d1c410d9d85d79750aee04d'
   },JSON.stringify(userdata))
   .then((resp) => {
     const val=JSON.parse(resp.data);
     console.log(val);
     this.setState({text:val.personId});
     console.log(this.state.text);
     const personid=this.state.text;
     this.register(personid);})
   .catch(function (error) {
       console.log(error);
   });
  }
  register(person){
const data = { foo: person };
    RNFetchBlob.fetch('POSt','https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/qtpi/persons/'+person+'/persistedFaces', {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '145e8da74d1c410d9d85d79750aee04d'
    },this.state.image)
    .then((resp) => {
    console.log(resp);
    if(json.length){
      this.makevisible(false);
  Toast.show('registeration successfull');
  }})
    .catch(function (error) {
        console.log(error);
    });
  }
  makevisible(par){
    this.setState({visible:par})
  }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default UserDetails;
