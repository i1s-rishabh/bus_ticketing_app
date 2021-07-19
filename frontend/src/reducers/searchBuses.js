import {
    BUS_FOUND,
    BUS_NOTFOUND,
} from '../actions/types';


const initialState = {
    buses: [],
    loading: true,
    error: {},
  };


const searchBuses = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case BUS_FOUND:
        return {
          ...state,
          buses: payload,
          loading: false,
        };
        case BUS_NOTFOUND:
          return {
            ...state,
            buses:[],
            loading:false
          }
      default:
        return state;
        break;
    }
  }
  
  export default searchBuses;