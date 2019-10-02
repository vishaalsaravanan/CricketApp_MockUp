const validation=(value,rules,forms)=>{
    let valid=true;
    for(let rule in rules){
        switch(rule){
            case "isRequired":
               valid=valid && validateRequired(value)
               //console.log("Is Character Is Present : "+valid)
               break;
            case "isEmail":
                valid=valid && validateEmail(value)   
                //console.log("Is A Valid Email : "+valid)
                break;
            case "minLength":
                valid=valid && validateMinLength(value,rules[rule])   
                //console.log("Has Minimum Length : "+valid)
                break;
            case "maxLength":
                valid=valid && validateMaxLength(value,rules[rule])   
                //console.log("Has Maximum Length : "+valid)
                break;
            case "confirmPass":
                valid=valid && validateConfirmPass(value,forms[rules.confirmPass].value)   
                //console.log("Has Maximum Length : "+valid)
                break;
               
              
            default:
                valid=true;    
        }
    }
    return valid;
}
const validateRequired=value=>{
    if(value!==''){//value is different than empty
        return true;
    }  
    else{
        return false;
    }  
}
const validateEmail=email=>{
    const expression=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLocaleLowerCase());
}
const validateMinLength=(value,ruleval)=>{
    if(value.length>=ruleval){
        return true 
    }
    else{
        return false
    }
}
const validateMaxLength=(value,ruleval)=>{
    if(value.length<=ruleval){
        return true 
    }
    else{
        return false
    }
}
const validateConfirmPass=(confirmPass,pass)=>{
    if(confirmPass===pass){
        return true;
    }
    else{
        return false;
    }
}
export default validation;