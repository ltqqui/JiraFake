import { baseServices } from "./baseServices";

class StatusServices extends baseServices{
    constructor (){
        super();
    }

    getAllStatus=()=>{
        return this.get('Status/getAll')
    }
    updateStatus=(taskUpdate)=>{
        return this.put('Project/updateStatus',taskUpdate)
    }

}

export const statusServices= new StatusServices();