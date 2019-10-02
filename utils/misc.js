
import {
    AsyncStorage
}from 'react-native';

//URls
export const FIREBASEURL=`https://reactbuzz.firebaseio.com`;
export const APIKEY=`AIzaSyAoWth1qX-Knc3gu3EyL996az1bYl89KHg`;
export const SIGNUP=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH=`https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;
export const getTokens=(cb)=>
{
    AsyncStorage.multiGet([//[For Accesing Async Storage]
        '@firebasepract@token',
        '@firebasepract@refreshToken',
        '@firebasepract@expireToken',//We cant store Numbers
        '@firebasepract@uid',
    ]).then(response=>{
            cb(response);
        })

}
export const setTokens=(values,cb)=>{
    const dateNow=new Date()
    const expiration=dateNow.getTime()+(3600*1000)//default token validation for 1 token is that 1 hr (Times are factors of milliseconds)

    AsyncStorage.multiSet([//[For Accesing Async Storage]//Take in Array of Arrays
        ['@firebasepract@token',values.token],
        ['@firebasepract@refreshToken',values.refToken],
        ['@firebasepract@expireToken',expiration.toString()],//We cant store Numbers
        ['@firebasepract@uid',values.uid],
    ]).then(response=>{
        //console.log("ResponseResolved with Token: "+values.token+" RefreshToken: "+values.refToken
        //        +" ExpirationToken : "+expiration.toString()+" User id : "+values.uid)
        cb();//
    })
}

export const convertFireBase =(data)=>{
    const newData=[];
        for(let key in data){
            newData.push({
                ...data[key],
                id:key
            })
        }
        return newData;

}
export const findTeamData=(itemId,teams)=>{
    const value=teams.find((team)=>{
        return team.id===itemId
    })
    return  value;
}