/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Video from 'react-native-video';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import Icon from 'react-native-vector-icons/AntDesign'
import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/user_action';
import {getTokens,setTokens} from '../../utils/misc';

class GameArticleComponent extends Component{ 
 state={
    loading:true,
    isAuth:true,
 }
 manageState(loading,isAuth){
  this.setState({
    loading,
    isAuth
  })
}
 componentDidMount(){
  const  User=this.props.User;
  getTokens((response)=>{
    if(response[0][1]===null){//for clearing AsyncStorage :$reactNative.AsyncStorage.clear() in Debugger Console.
      this.manageState(false,false)//Return back to the login Screen 
    }else{
      this.props.dispatch(autoSignIn(response[1][1])).then(()=>{
        !User.auth.token ?
          this.manageState(false,false)
        :
        setTokens(User.auth,()=>{
          this.manageState(false,true)
        })
      })
    }
  })
}    
  render()
  {
     const params =this.props.navigation.state.params;
     if(this.state.loading){
        return(
            <View style={styles.loading}>
              <ActivityIndicator/>
            </View>
          ) 
    }else{
          return(
            <ScrollView style={{backgroundColor:'#F0F0F0'}}>
                {
                  this.state.isAuth?
                  YouTubeStandaloneAndroid.playVideo({
                    apiKey: 'AIzaSyC_koKSnDOxyzobLjLCb22kdgWuau5wtrY', // Your YouTube Developer API Key
                    videoId: 'OlGfSKcWhdA', // YouTube video ID
                    autoplay: true, // Autoplay the video
                    startTime: 0, // Starting point of video (in seconds)
                  })
                    .then(() => console.log('Standalone Player Exited'))
                    .catch(errorMessage => console.error(errorMessage))
                  
                  :
                  <View style={styles.notAuth}>
                    <Icon name="frowno" size={80} color="#d5d5d5"/>
                    <Text style={styles.notAuthText}>Sorry ! In order to view this content you need to be Registered/Logged in </Text>
                    <Button
                    title="Login/Register  "
                    onPress={()=>this.props.navigation.navigate('Auth') }
                    >

                    </Button>
                  </View>
                }
            </ScrollView>
          )
    }
  }
}
const styles=StyleSheet.create({
  loading:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  notAuthText:{
    fontFamily:'Roboto-Bold',
    fontSize:22,
  },
  notAuth:{
    flex:1,
    margin:50,
    alignItems:'center',
    justifyContent:'center'
  }
});
function mapStatetoProps(state){
  return{
      User:state.User
  }
}

export default connect(mapStatetoProps)(GameArticleComponent);