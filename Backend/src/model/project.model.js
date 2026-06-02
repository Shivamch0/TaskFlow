import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    progress : {
        type : Number,
        default : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
} , {timestamps : true});

export const Project = mongoose.model("Project" , projectSchema);