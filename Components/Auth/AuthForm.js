import React, {Fragment,Component} from 'react';
import Input from '../../utils/forms/input'
import ValidationRules from '../../utils/forms/ValidationRules'
import {connect} from 'react-redux';
import {signUp,signIn} from '../../store/actions/user_action';
import {bindActionCreators} from 'redux';
import {setTokens} from '../../utils/misc';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
class AuthForm extends Component{
   state={
    type:'Login',
    action:'Login',
    actionMode:'I want to register',
    hasErrors:false,
    form:{
        email:{
            value:"",
            valid:false,
            type:"textinput",
            rules:{
                isRequired:true,
                isEmail:true,
            }
        },
        password:{
            value:"",
            valid:false,
            type:"textinput",
            rules:{
                isRequired:true,
                minLength:8,
                     
            }    
        },
        confirmPassword:{
            value:"",
            valid:false,
            type:"textinput",
            rules:{
                confirmPass:'password',
            }
        }
   
    }//end of form 
}//end of state 
manageAccess =() =>{
    if(!this.props.User.auth.uid){
        this.setState({hasErrors:true})
    }else{
        setTokens(this.props.User.auth,()=>
        {//for storing tokens on the phone.
         //console.log("Set Tokens is Called !.")
            this.setState({hasErrors:false});
            this.props.goNext();//1
        })
    }
}
submitUser=()=>{
    let isformValid=true;
    let formToSubmit={};//To get the final value for the mail ,password and confirmpass
    const formCopy=this.state.form;
    for(let key in formCopy){
        if(this.state.type==='Login'){
            //For logging in user
            if(key!=='confirmPassword'){
             isformValid=isformValid && formCopy[key].valid;
             formToSubmit[key]=formCopy[key].value        
            }  
        }else{
            //For registering new user
            isformValid=isformValid && formCopy[key].valid;
            formToSubmit[key]=formCopy[key].value        
            }
    }
    if(isformValid){
        if(this.state.type==='Login' ){
            this.props.signIn(formToSubmit).then(()=>{
                this.manageAccess()//2
            })
        }
        else{
            this.props.signUp(formToSubmit).then(()=>{
                this.manageAccess()//3
            } )
           // console.log("Passing Values "+isformValid);
        }
    }
    else{
        this.setState({hasErrors:true})
    }
}
formHasErrors=()=>(
    this.state.hasErrors?
    <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops!.Check Your Info</Text>
    </View> 
    :null
)
confirmPassword=()=>(
    this.state.type !='Login'?
                <Input
                    placeholder="Confirm Password"
                    placeholderTextColor="#cecece"
                    type={this.state.form.confirmPassword.type}
                    value={this.state.form.confirmPassword.value}
                    onChangeText={value=>this.UpdateInput("confirmPassword",value)}
                    secureTextEntry
                />
                :null
                
)
changeFormType=()=>{
    const type=this.state.type;
    this.setState({
        type:type==='Login'? 'Register':'Login',
        action:type==='Login'? 'Register':'Login',
        actionMode:type=='Login'?'I want to Login':'I want to Register'
    })
}
UpdateInput=(name,value)=>{
    this.setState({
        hasErrors:false
    });
    let formCopy=this.state.form;
    formCopy[name].value=value;
    let rules =formCopy[name].rules;
    let valid=ValidationRules(value,rules,formCopy);
   // console.log("Valid Input : "+valid)
    formCopy[name].valid=valid;
    this.setState({
        form:formCopy
    })
}
    render()
    {
        return(
            <View>
                <Input
                    placeholder="Enter Email"
                    placeholderTextColor="#cecece"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}//specific keyboard layout for making it ready for typing the email
                    onChangeText={value=>this.UpdateInput("email",value)}
                />
                <Input
                    placeholder="Enter Password                   (Minimum 8 Characters)"
                    placeholderTextColor="#cecece"
                    type={this.state.form.password.type}
                    value={this.state.form.password .value}
                    onChangeText={value=>this.UpdateInput("password",value)}
                    secureTextEntry
                />
                {this.confirmPassword()}
                {this.formHasErrors()}
                <View style={{marginTop:20}}>
                    <View style={styles.button}>
                        <Button
                            title={this.state.action}
                            onPress={this.submitUser}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title={this.state.actionMode}
                            onPress={this.changeFormType}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Skip For Now"
                            onPress={this.props.goNext}//
                        />
                    </View>
                </View>
            </View>
        );    
    }
} 
const styles=StyleSheet.create({
    errorContainer:{
        marginBottom:10,
        marginTop:30,
        padding:10,
        backgroundColor:'#f44336'
    },
    errorLabel:{
        color:'#fff',
        textAlignVertical:'center',
        textAlign:'center'
    },
    button:{
        ...Platform.select({
            ios:{
                marginBottom:0
            },
            android:{
                marginTop:8,
                marginBottom:8
            }
        })
    }
})
function mapStatetoProps(state){
    console.log(state)
    return{
        User:state.User
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({signIn,signUp},dispatch)
}

export default connect(mapStatetoProps,mapDispatchToProps)(AuthForm);