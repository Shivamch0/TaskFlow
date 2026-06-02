import { Schema , model } from 'mongoose';

const taskSchema = new Schema({
    title : {
        type : String,
    },
    completed : {
        type : Boolean,
        default : false
    },
    project :{
        type : Schema.Types.ObjectId,
        ref : "Project"
    }
} , { timestamps : true});

export const Task = model("Task" , taskSchema)