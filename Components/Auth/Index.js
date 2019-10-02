/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import AuthLogo from './AuthLogo';
import AuthForm from './AuthForm';
import React, {Fragment,Component} from 'react';
import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/user_action';
import {bindActionCreators} from 'redux';
import {
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  ImageBackground
  } from 'react-native';
import {getTokens,setTokens} from '../../utils/misc';
class AuthComponent extends Component{
  state={
    loading:true//for checking tokens
  }    
  goNext=()=>{
    this.props.navigation.navigate('App')
  }
  componentDidMount(){
    getTokens((response)=>{
        if(response[0][1]===null){//for clearing AsyncStorage :$reactNative.AsyncStorage.clear() in Debugger Console.
          this.setState({loading:false})//Return back to the login Screen 
        }else{
           this.props.autoSignIn(response[1][1]).then(()=>{
             if(!this.props.User.auth.token){//If the User doesnt have the tokens in their device 
                this.setState({loading:false})//Return to the login Screen
             }else{
               setTokens(this.props.User.auth,()=>{//Since we will be getting updated token reference from the server.
                 this.goNext();
               })

             }
           })
        }
    })
  }
  render()
  {
    if(this.state.loading)
    {
      return(
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#C3A48C"/>
              </View>
            );
    }
    else{
     return(
            <ScrollView style={styles.container}>
              <View>
                  <AuthLogo/>
                  <Text style={styles.welcomestyle}>Welcome</Text>
                  <AuthForm goNext={this.goNext} /> 
              </View>
            </ScrollView>
          );
     }
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#2B550E',
    padding:70,     
  },
  welcomestyle:{
    fontSize:24,
    fontFamily:'notoserif',
    color:'#ffffff',
    textAlign:'center',
    paddingTop:4
  },
  loading:{
    flex:1,
    backgroundColor:'#547F50',
    alignItems:'center',
    justifyContent:'center',
      
  }
});
function mapStatetoProps(state){
  return{
      User:state.User
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch)
}

export default connect(mapStatetoProps,mapDispatchToProps)(AuthComponent);