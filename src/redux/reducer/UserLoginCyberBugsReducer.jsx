import { USER_LOGIN } from "../../util/constants/settingSystem";
import { EDIT_USER_MANAGEMENT_REDUCER, GET_USER_REDUCER, LOGIN } from "../constants/CyberBug/CyberBugConst";



let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault={
    userLogin:usLogin,
    listUser:[],
    userEdit:{}
}


export const UserLoginCyberBugsReducer=(state=stateDefault,action)=>{
    switch(action.type){
        case LOGIN:{
            state.userLogin=action.userLogin
            return {...state}
        }
        case GET_USER_REDUCER:{
            return {...state, listUser:action.listUser}
        }
        case EDIT_USER_MANAGEMENT_REDUCER:{
            console.log(action.userEdit)
            return {...state,userEdit:action.userEdit}
        }

        default: return {...state}
    }
}