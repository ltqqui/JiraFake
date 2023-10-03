import { GET_USER_BY_PROJECT_ID_REDUCER } from "../constants/CyberBug/CyberBugConst";
import { GET_ALL_PROJECT_IN_CREATE_TASK_REDUCER, SET_PROJECT_REDUCER } from "../constants/CyberBug/ProjectConst"

const stateDefault ={
    projectList:[],
    arrProject:[],
    userProject:[],
}


export const ProjectCyberBugsReducer=(state=stateDefault,action)=>{
    switch(action.type){

        case SET_PROJECT_REDUCER:{
            state.projectList=action.allProject;
            return {...state}
        }

        case GET_ALL_PROJECT_IN_CREATE_TASK_REDUCER:{
            return {...state, arrProject:action.arrProject}
        }

        case GET_USER_BY_PROJECT_ID_REDUCER:{
            return {...state,userProject:action.userProject}
        }
        default: return {...state}
    }
}