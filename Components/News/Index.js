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
import {getNews} from '../../store/actions/news_action';

class NewsComponent extends Component{
  componentDidMount(){
    this.props.dispatch(getNews())
  }
  renderArticle=(news)=>(//Returning JSX
    news.articles?
      news.articles.map((item,i)=>(
        <TouchableOpacity 
        key={i}
        onPress={()=>this.props.navigation.navigate('Article',{
          ...item
        })}
        
        >
            <View style={styles.cardContainer}>
                <View>
                  <Image 
                    style={{height:175,justifyContent:'space-around'}}
                    source={{uri:`${item.image}`}}
                    resizeMode='cover'
                  />
                </View>
                <View style={styles.contentContainer}>
                      <Text style={styles.titleCard}>
                          {item.title}
                      </Text>
                      <View style={styles.bottomCard}>
                          <Text style={styles.bottomCardTeam}>{item.team}</Text>
                          <Text style={styles.bottomCardDate}> - Posted at {Moment(item.date).format('d MMMM')}</Text>
                      </View>
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
          {this.renderArticle(this.props.News)}
     </ScrollView>
    );
  }
}
const styles=StyleSheet.create({
  cardContainer:{
    backgroundColor:'#C8D4C7',
    margin:10,
    shadowColor:'#C8D4C7',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:1,
    borderRadius:2
  },
  contentContainer:{ 
      borderWidth:1,
      borderColor:'#dddddd' 
  },
  titleCard:
  {
    color:'#323232',
    fontSize:19,
    padding:10,
    fontFamily:'Roboto-Bold',

  },
  bottomCard:{
    flex:1,
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#e6e6e6',
    padding:10 
  },
  bottomCardTeam:{
    fontFamily:'Roboto-Bold',
    color:'#828282',
    fontSize:12
  },
  bottomCardDate:{
    color:'#828282',
    fontFamily:'Roboto-Light',
    fontSize:12
  }

});
function mapStateToProps(state){
  console.log(state)
  return {
    News:state.News
  }

}
export default connect(mapStateToProps)(NewsComponent);