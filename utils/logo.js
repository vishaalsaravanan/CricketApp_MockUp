/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import LogoImg from '../assets/images/Ar.png'
import React, {Fragment,Component} from 'react';
import {
  View,
  Text,
  Image,   
} from 'react-native';
const LogoTitle=()=>(
  <Image 
  source={LogoImg} 
  style={{width:150,height:50}}
  resizeMode="contain" 
  />
)
export default LogoTitle;