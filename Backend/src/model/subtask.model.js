import { Schema , model } from "mongoose";

const subTaskSchema = new Schema({
    title : {
        type : String
    },
    completed : {
        type : Boolean,
        default : false
    },
    task : {
        type : Schema.Types.ObjectId,
        ref : "Task"
    }
} , {timestamps : true});

export const SubTask = model("SubTask" , subTaskSchema)