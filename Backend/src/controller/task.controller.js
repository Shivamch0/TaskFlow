import { Task } from "../model/task.model.js";
import { Project } from "../model/project.model.js"

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const validateProject = async (req , res) => {
    try {
    const projectId = req.params.id;
    if(!projectId){
        throw new ApiError(404 , "Project Id not found...")
    }
    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }
    const user = req.user._id;
    if(project.user.toString() !== user.id.toString){
        throw new ApiError(403 , "You are not authorized to add task in this project...")
    }

    return { project }
    } catch (error) {
       throw error
    }
}

const createTask = asyncHandler(async (req ) => {
    const { project } = await validateProject();
    const { title } = req.body;
    if(!title){
        throw new ApiError(400 , "Task cannot be empty...")
    }

    const task = await Task.create({
        title,
        project
    })

    return res.status(200).json(new ApiResponse(200 , {task} , "Task Created Successfully..."))

});

const getTasks = asyncHandler(async (req , res) => {
    const { project } = await validateProject();

    const fetchTasks = await Task.find({project : project._id}).sort({createdAt : -1});
    return res.status(200).json(new ApiResponse(200 , {fetchTasks} , "Tasks Fetched Successfully..."))
});

const getTaskById = asyncHandler(async (req , res) => {
    const { project } = await validateProject();
});

const updateTask = asyncHandler(async (req , res) => {});

const deleteTask = asyncHandler(async (req , res) => {});

const toggleTaskStatus = asyncHandler(async (req , res) => {});

export { createTask , getTasks , getTaskById , updateTask , deleteTask , toggleTaskStatus }