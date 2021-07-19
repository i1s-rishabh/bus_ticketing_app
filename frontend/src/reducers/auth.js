import {REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from "../actions/types";


const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    loading: true,
    user : null,
};

const auth=(state = initialState, action)=>{
    const {type, payload} = action;
    console.log(type)
    console.log(payload)
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false, 
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(payload)
            localStorage.setItem('token',payload.token);
            return{ 
                ...state,
                token:payload.token,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state;
    }
}
export default auth;
