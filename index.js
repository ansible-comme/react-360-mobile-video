import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Environment
} from 'react-360';
const {VideoModule} = NativeModules;

export default class interview360 extends React.Component {

componentDidMount() {
  Environment.setBackgroundVideo('myplayer');
  VideoModule.resume('myplayer');
}

  render() {
    return (
      <View>

      </View>
    );
  }
};

AppRegistry.registerComponent('interview360', () => interview360);
