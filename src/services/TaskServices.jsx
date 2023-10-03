import {baseServices} from './baseServices' 

class TaskServices extends baseServices {
    constructor(){
        super();
    }

    createTask=(taskObject)=>{
        return this.post('Project/createTask',taskObject);
    }

    getTaskDetail=(taskId)=>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateTask=(taskUpdate)=>{
        return this.post('Project/updateTask',taskUpdate)
    }

}


export const taskServices=new TaskServices();