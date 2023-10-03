import { baseServices } from "./baseServices";

class TaskTypeServices extends baseServices {
    constructor(){
        super();
    }

    getAllTaskType=()=>{
        return this.get('TaskType/getAll');
    }
}

export const taskTypeServices= new TaskTypeServices();