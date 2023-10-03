import { GET_ALL_PRIORITY_REDUCER } from "../constants/CyberBug/PriorityConst";

const stateDefault ={
    arrPriority:[]
}

export const PriorityReducer=(state=stateDefault, action )=>{
    switch(action.type){
        case GET_ALL_PRIORITY_REDUCER:{
            return {...state, arrPriority:action.arrPriority}
        }
        default: return {...state};
    }
}