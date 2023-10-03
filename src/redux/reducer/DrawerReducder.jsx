import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_DRAWER_CREATE_TASK, OPEN_DRAWER_EDIT, SET_SUBMIT_CREATE_TASK, SET_SUBMIT_FORM } from "../constants/CyberBug/DrawerConst"
import React from "react"
const stateDefault={
    visible:false,
    ComponentContentDrawer:<p>content component</p>,
    title:'',
    callBackSubmit:()=>{
        alert(123);
    }
}


export const DrawerReducer=(state=stateDefault,action)=>{
    switch(action.type){

        case OPEN_DRAWER:{
            return {...state, visible:true }
        }
        case CLOSE_DRAWER:{
            return {...state, visible:false}
        }
        case OPEN_DRAWER_EDIT:{
            return {...state,visible:true,ComponentContentDrawer:action.ComponentContentDrawer,title:action.title}
        }
        case SET_SUBMIT_FORM:{
            return {...state,callBackSubmit:action.submitFunction}
        }
        case SET_SUBMIT_CREATE_TASK:{
            return {...state, callBackSubmit:action.submitFunction}
        }

        case OPEN_DRAWER_CREATE_TASK:{
            console.log(action)
            return {...state,visible:true, title:action.title, ComponentContentDrawer:action.component}
        }

        default : return {...state}
    }
}