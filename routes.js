import React from 'react';
import {Platform} from 'react-native';

import{
    createSwitchNavigator,
    createAppContainer,
}from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Dimensions } from 'react-native';
//Adding Screens 
import SignIn from './Components/Auth/Index';
import News from './Components/News/Index';
import Games from './Components/Games/Index'; 
import Article from './Components/News/article';
import GamesArticle from './Components/Games/article';
import Logo from './utils/logo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
const headerConf={
    headerLayoutPreset:'center',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#547F50' 
        },
        headerTintColor:'black',
        headerTitle:Logo,
        //headerTitleStyle : {width : Dimensions.get('window').width}
    }
}
const NewsStack=createStackNavigator({
    News:News,
    Article:Article
},headerConf);
const GameStack=createStackNavigator({
    Games:Games,
    Article:GamesArticle
},headerConf);

const AppStack=createBottomTabNavigator({
    News:NewsStack,
    Games:GameStack
},{
    tabBarOptions:{
        activeTintColor:'#fff',
        showLabel:false,
        activeBackgroundColor:'#224D1E',
        inactiveBackgroundColor:'#547F50',
        style:{
            backgroundColor:'#547F50'
        }
    },
    initialRouteName:'News',
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:({focused,horizontal,tintColor})=>{
            const {routeName}=navigation.state
            let iconName;
            if(routeName==='News')
            {
                iconName=`cricket`;
            }else{
                iconName=`newspaper`;
            }

            return <MaterialCommunityIcons name={iconName} size={25} color='#fff'/>

        }
    })
}
);

const AuthStack=createStackNavigator({
    SignIn:SignIn
},{
    headerMode:'none'
});

export const RootNavigator=()=>{
    return createAppContainer(createSwitchNavigator(
    {
      App:AppStack ,
      Auth:AuthStack
    },
    {
        initialRouteName:'Auth'//INITIAL ROUTING 
    }
    ))
}