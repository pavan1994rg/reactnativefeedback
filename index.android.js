import {AppRegistry} from 'react-native';
import React,{Component} from 'react';
import getUsers from './components/getUsers';
import HomePage from './components/HomePage';

import { StackNavigator } from 'react-navigation';

const feedbackapp = StackNavigator({
  Home: { screen: HomePage },
  GetUsers :{screen:getUsers},
 
  });
AppRegistry.registerComponent('feedbackapp', () => feedbackapp);
