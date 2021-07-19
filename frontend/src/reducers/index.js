import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import searchBuses from './searchBuses'
export default combineReducers({
    alert,
    auth,
    searchBuses
});
