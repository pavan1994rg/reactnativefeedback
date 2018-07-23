mport {AppRegistry} from 'react-native';
import React,{Component} from 'react';

import HomePage from './components/HomePage';
import { StackNavigator } from 'react-navigation';

const feedbackapp = StackNavigator({
  Home: { screen: HomePage }
});
AppRegistry.registerComponent('feedbackapp', () => feedbackapp);
