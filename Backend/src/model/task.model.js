import { Schema , model } from 'mongoose';

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        default : ''
    },
    priority : {
        type : String,
        enum : ['Low', 'Medium', 'High'],
        default : 'Medium'
    },
    dueDate : {
        type : String,
        default : ''
    },
    completed : {
        type : Boolean,
        default : false
    },
    project :{
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    }
} , { timestamps : true});

export const Task = model("Task" , taskSchema)