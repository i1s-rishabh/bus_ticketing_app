import axios from 'axios';
import { setAlert } from './alerts'
import {
    BOOKING_FAIL,
    BOOKING_SUCCESS
 } from './types';


 export const bookSeats = id => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({name,email,password,isAdmin})

        const res = await axios.put(`/api/buses/60e29f684372bf3e1f81d199/tickets`)
        
        dispatch({
            type: BOOKING_SUCCESS,
            payload:res.data
        })
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch({
            type:BOOKING_FAIL,
        })
    }
}


