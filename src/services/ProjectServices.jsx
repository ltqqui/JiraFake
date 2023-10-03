import { baseServices } from "./baseServices";


export class ProjectServices extends baseServices{

    constructor(){
        super();
    }

    getAllProjectInCreateTask=()=>{
        return this.get('Project/getAllProject');
    }

    deleteProject=(id)=>{
       return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    getProjectDetail=(projectId)=>{
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
   
}


export const projectServices=new ProjectServices();