import { USER_SIGNIN_API } from "../constants/CyberBug/CyberBugConst";
import { SET_PROJECT_REDUCER } from "../constants/CyberBug/ProjectConst";



export const signiAction = (email, password) => ({
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
})


export const getAllProjectAction=(allProject)=>({
    type:SET_PROJECT_REDUCER,
    allProject
})