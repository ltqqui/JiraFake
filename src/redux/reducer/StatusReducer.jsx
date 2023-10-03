import { GET_ALL_STATUS_REDUCER } from "../constants/CyberBug/StatusConst"

const stateDefault={
    arrStatus:[]
}

export const StatusReducer=(state=stateDefault, action)=>{
    switch(action.type){
        case GET_ALL_STATUS_REDUCER:{
            return {...state, arrStatus:action.arrStatus}
        }
        default : return {...state}
    }
}