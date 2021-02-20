import * as React from 'react';
import { View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component {
  render() { 
    return (
      <View>
        <AppContainer/>
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  ScanScreen:ScanScreen
});

const AppContainer = createAppContainer(AppNavigator);