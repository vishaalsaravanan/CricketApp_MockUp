import React, {Fragment,Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Picker
} from 'react-native';

const input=(props)=>{
    let template=null;
    switch(props.type){
        case "textinput":
                        template=
                        <TextInput
                            {...props}
                            style={[styles.input,props.overrideStyle]}//
                        />
        break;
        default:
            return template
    }
    return template;
}
const styles=StyleSheet.create({
    input:{
        width:'100%',
        borderBottomWidth:1.5,
        borderBottomColor:'#eaeaea',
        fontSize:16,
        fontFamily:'notoserif',
        padding:5,
        marginTop:10

    } 
}) 
export default input;