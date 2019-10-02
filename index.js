/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {RootNavigator} from './routes';
class App extends Component{
  render()
  {
    const Nav=RootNavigator();
    return(
      <View style={styles.container}>
        <Nav/>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5FCFF',
    
  }
});
export default App;