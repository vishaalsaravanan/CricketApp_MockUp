import {
    GET_GAMES
}from '../types'
import axios from 'axios';

import {
    FIREBASEURL,
    convertFireBase,
    findTeamData
}from '../../utils/misc';

export function getGames(){
    const promise =  new Promise((resolve,reject)=>{
        const request=axios({
            method:'GET',
            url:`https://reactbuzz.firebaseio.com/teams.json`
        }).then(response =>{
            const teams=convertFireBase(response.data)
            //console.log(teams)
            axios({
                method:'GET',
                url:`https://reactbuzz.firebaseio.com/games.json`
            }).then(response=>{
                const articles=convertFireBase(response.data)
                //console.log(articles)
                //console.log(teams)
                const responseData=[];
                for(let key in articles){
                responseData.push({
                    ...articles[key],
                awayData:findTeamData(articles[key].away,teams), 
                localData:findTeamData(articles[key].local,teams)  

            })
            }
            resolve(responseData)
            })
        }).catch(e=>{
            reject(false)
        })
    })
    return {
        type:GET_GAMES,
        payload:promise
    }
}

