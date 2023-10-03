import { GET_ALL_TASK_TYPE_REDUCER } from "../constants/CyberBug/TaskTypeConst"

const stateDefault={
    arrTaskType:[]
}


export const TaskTypeReducer=(state=stateDefault, action)=>{
    switch(action.type){
        case GET_ALL_TASK_TYPE_REDUCER:{
            return {...state, arrTaskType: action.arrTaskType}
        }
        default : return {...state}
    }
}
