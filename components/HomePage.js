import React, { Component } from 'react';
import {View ,ScrollView,Text,Button} from 'react-native';
import CameraComponent from './CameraComponent';
import getFeedback from './getFeedback';
import UserDetails from './UserDetails';
export default class extends Component{

static navigationOptions = {
    title: 'Welcome',
  };
state = {
  data: 'test',
  test:'good'
};
state={
  visible:false
}
  render() {
      const { navigate } = this.props.navigation;
    return (
    <ScrollView>
      <CameraComponent onUpdate={this.onUpdate.bind(this)}></CameraComponent>
      <UserDetails dataupdate={this.state.data} ></UserDetails>


<Button onPress={() => navigate('GetUsers')}
          title="Users Qtpi"
        ></Button>

<Button onPress={() => navigate('GetFeedback')}
          title="Feedbacks"
        ></Button>
    </ScrollView>
    )
  }



startloadin(visible){
  this.setState({visible:visible});
}

  onUpdate(data) {

  this.setState({data:data});

    };

}