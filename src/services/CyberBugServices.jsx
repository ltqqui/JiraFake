import Axios from "axios"
import { DOMAIN, TOKEN } from "../util/constants/settingSystem"

export const cyberBugServices={
    signinCyberBugs:(userLogin)=>{
        return Axios({
            url:`${DOMAIN}/Users/signin`,
            method:"POST",
            data:userLogin
        })
    },
    getAllProjectCategory:()=>{
        return Axios({
            url:`${DOMAIN}/ProjectCategory`,
            method:'GET'
        })
         
    },
    createProject:(newProject)=>{
        return Axios({
            url:`${DOMAIN}/Project/createProject`,
            method:'POST',
            data:newProject
        })
    },
    createProjectAuthorization:(newProject)=>{
        return Axios({
            url:`${DOMAIN}/Project/createProjectAuthorize`,
            method:'POST',
            data:newProject,
            headers:{'Authorization':' Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getAllProject:()=>{
        return Axios({
            url:`${DOMAIN}/Project/getAllProject`,
            method:'GET',
            headers:{'Authorization': 'Bearer '+ localStorage.getItem(TOKEN)}
        })
    },
    updateProject:(projectUpdate)=>{
        return Axios({
            url:`${DOMAIN}/Project//updateProject?projectId=${projectUpdate.id}`,
            method:'PUT',
            data:projectUpdate,
            headers:{'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}