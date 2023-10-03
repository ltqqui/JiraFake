import { baseServices } from "./baseServices";

class PriorityServices extends baseServices {
    constructor(){
        super();    
    }

    // eslint-disable-next-line no-unreachable
    getAllPriority=()=>{
        return this.get('Priority/getAll')
    }

}

export const priorityServices=new PriorityServices();