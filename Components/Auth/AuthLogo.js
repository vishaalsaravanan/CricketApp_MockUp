import React, {Fragment,Component} from 'react';
import {
    Image,
    View,
    Text
} from 'react-native';
 import LogoImage from '../../assets/images/Ar.png';
 const LogoComponent =()=>(
     <View style={{alignItems:'center'}}>
         <Image
             source={LogoImage}
             resizeMode={'contain'}
             style={{
                 width:300,
                 height:200
             }}
         />

     </View>
 )
 export default LogoComponent; 