import { baseServices } from "./baseServices";


class UserServices extends baseServices{
    getUser=(keyWord)=>{
        return this.get(`Users/getUser?keyword=${keyWord}`);
    }
    assignUser=(userProject)=>{
       return  this.post('Project/assignUserProject', userProject)
    }
    removeFormUser=(userProject)=>{
        return this.post('Project/removeUserFromProject', userProject)
    }

    getUserByProjectId=(idProject)=>{
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
    }

    registerUser=(userRegister)=>{
        return this.post('Users/signup', userRegister);
    }

    deleteUserManagement=(userId)=>{
        return this.delete (`Users/deleteUser?id=${userId}`);
    }

    updateUserManagement=(userUpdate)=>{
        return this.put('Users/editUser', userUpdate);
    }
}


export const userServices=new UserServices();