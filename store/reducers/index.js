import {combineReducers} from 'redux';
import User from './userreducers';
import News from './newsreducer';
import Games from './gamereducer';
const rootReducer=combineReducers({
    User,
    News,
    Games
})
export default rootReducer;