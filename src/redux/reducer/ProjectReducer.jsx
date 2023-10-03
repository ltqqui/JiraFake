import { EDIT_PROJECT, PUT_PROJECT_DETAIL_REDUCER } from "../constants/CyberBug/ProjectConst"

const stateDefault = {
    projectEdit: {
        "id": 2,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "3"
    },
    projectDetail:{},
    
}


export const ProjectReducer =(state=stateDefault,action)=>{
    switch(action.type){


        case EDIT_PROJECT:{
            return {...state, projectEdit:action.projectEditModel}
        }

        case PUT_PROJECT_DETAIL_REDUCER:{
            return {...state,projectDetail:action.projectDetail}
        }

        default : return {...state}
    }
}