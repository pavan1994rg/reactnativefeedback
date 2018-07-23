import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import pick from '../api/picker.js';
import uploadFile from '../api/upload.js';

export default class AddEmployee extends Component {
  state = {
      avatarSource: null,
      data: null,
      log: 'Upload image to see log.',
      name: ''
  }

  backToMenu() {
        const { navigator } = this.props;
        navigator.pop();
  }

  show() {
    pick((source, data) => this.setState({ avatarSource: source, data }));
  }

  upload() {
    const url = 'https://groupkhoapham.herokuapp.com/createEmployee';
    const data = [
        { name: 'avatar', filename: 'avatar.png', data: this.state.data },
        { name: 'name', data: this.state.name }
    ];
    uploadFile(url, data)
    .then(res => res.text())
    .then(logInfo => this.setState({ ...this.state, log: logInfo }))
    .catch(err => console.log(`${err} `));
  }

  render() {
    const { avatarSource, log } = this.state;
    const img = avatarSource == null ? null : (
      <Image
          source={avatarSource}
          style={{ height: 200, width: 200 }}
      />
    );
    
    return (
      <View style={style}>
        <Button 
            title="Show image picker"
            onPress={this.show.bind(this)}
        />
        <TextInput 
            style={styleInput}
            text={this.state.text}
            onChangeText={text => this.setState({ ...this.state, name: text })}
        />
        {img}
        <Button 
            title="Create new Employee"
            onPress={this.upload.bind(this)}
        />
        <Text>{log}</Text>
        <Button 
            title="Back to Menu"
            onPress={this.backToMenu.bind(this)}
        />
      </View>
    );
  }
}

const style = {
    backgroundColor: '#E7E7E7',
    flex: 1
};

const styleInput = {
    height: 50
};
