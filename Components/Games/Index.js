/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Moment from 'moment';
import React, {Fragment,Component} from 'react';
import {
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {getGames} from '../../store/actions/games_action';

class GamesComponent extends Component{
  componentDidMount(){
    this.props.dispatch(getGames())
  }
  showGames=(list)=>(
    list.games?
      list.games.map((item,i)=>(
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Article',{
              ...item
            })}
            key={i}
          >
          <View style={styles.gameContainer}>
              <View style={styles.gamebox}>   
                  <Image source={{uri:`${item.awayData.logo}`}}   
                          style={{height:80,width:80}}
                          resizeMode="contain"
                  /> 
                  <Text style={styles.pointstext}>
                      {item.awayData.wins} -{item.awayData.loss} 
                  </Text>    
                          
              </View>
             
              <View style={styles.gamebox}>
                  <Text style={styles.gameTime}>{item.time}</Text>
                  <Text style={styles.gameDay}>{Moment(item.date).format('d MMMM')}</Text>
              </View>
             
              <View style={styles.gamebox}>
                  <Image source={{uri:`${item.localData.logo}`}}   
                          style={{height:80,width:80}}
                          resizeMode="contain"
                  /> 
                  <Text style={styles.pointstext}>
                      {item.localData.wins} -{item.localData.loss} 
                  </Text>    
                  
              </View>
          </View>
          </TouchableOpacity>
      ))
    
    :null
  )
  render()
  {
     return(
      <ScrollView style={{backgroundColor:'#F0F0F0'}}>
          <View style={{
            flex:1,
            flexDirection:'column',
            flexWrap:'nowrap'
          }}>
            {this.showGames(this.props.Games)}
          </View>
      </ScrollView>
    );
  }
}
const styles=StyleSheet.create({
  gameContainer:{
    flexDirection:'row',
    backgroundColor:'#fff',
    marginBottom:10,
    shadowColor:'#C8D4C7',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:1,
    borderRadius:2
  },
  pointstext:{
    fontFamily:'Roboto-Light',
    fontSize:12
  },
  gameTime:{
    fontFamily:'Roboto-Bold',
    fontSize:18
  },
  gameDay:{
    fontFamily:'Roboto-Medium',
    fontSize:14   
  },
  gamebox:{
    width:'33.3%',
    height:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  }
});
function mapStateToProps(state){
  console.log(state)
  return {
    Games:state.Games
  }

}

export default connect(mapStateToProps)(GamesComponent);