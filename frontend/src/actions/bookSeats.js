import axios from 'axios';
import { setAlert } from './alerts'
import {
    BOOKING_FAIL,
    BOOKING_SUCCESS
 } from './types';


 export const bookSeats = (busId,userData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(userData)
        const res = await axios.post(`/api/buses/${busId}/tickets`,body,config)
        console.log("response",res)
        dispatch({
            type: BOOKING_SUCCESS,
            payload:res.data
        })
        dispatch(setAlert("Tickets booked succesfully","success"))
    }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch(setAlert(err.response.data.msg,"danger"))

        dispatch({
            type:BOOKING_FAIL,
        })
    }
}


