
import { baseServices } from "./baseServices";

class CommentServices extends baseServices{
    constructor(){
        super();
    }


    insertComment=(comment)=>{
        return this.post('Comment/insertComment',comment)
    }

    deleteComment=(idComment)=>{
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }

    updateComment=(idComment, contentComment)=>{
        console.log(contentComment)
        return this.put(`Comment/updateComment?id=${idComment}&contentComment=${contentComment}`,'')
    }

}

export const commentServices=new CommentServices ();