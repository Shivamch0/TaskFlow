import { Task } from "../model/task.model.js";
import { Project } from "../model/project.model.js"

//! Helper Imports
import { validateProject } from "../helpers/project.helper.js";
import { validateTask } from "../helpers/task.helper.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createTask = asyncHandler(async (req , res) => {
    const { title } = req.body;
    if(!title){
        throw new ApiError(400 , "Task cannot be empty...")
    }

    const { project } = await validateProject(req.params.projectId , req.user._id);

    const task = await Task.create({
        title,
        project
    })

    return res.status(200).json(new ApiResponse(200 , {task} , "Task Created Successfully..."))

});

const getTasks = asyncHandler(async (req , res) => {
    const { project } = await validateProject(req.params.projectId , req.user._id);

    const fetchTasks = await Task.find({project : project._id}).sort({createdAt : -1});
    return res.status(200).json(new ApiResponse(200 , {fetchTasks} , "Tasks Fetched Successfully..."))
});

const getTaskById = asyncHandler(async (req , res) => {
    const taskId = req.params.id;
    if(!taskId){
        throw new ApiError(404 , "Task Id not found...")
    }

    await validateProject(req.params.projectId , req.user._id);

    const fetchTaskById = await Task.findById(taskId);

    return res.status(200).json(new ApiResponse(200 , {fetchTaskById} , "Task fetched by id successfully..."))

});

const updateTask = asyncHandler(async (req , res) => {

    const taskId = req.params.id;
    if(!taskId){
        throw new ApiError(404 , "Task Id not found...")
    }

    await validateProject(req.params.projectId , req.user._id);

    const updatedTask = await Task.findByIdAndUpdate(taskId , 
        {
            $set : {
                title
            }
        },
        { new : true}
    )

    return res.status(200).json(new ApiResponse(200 , {updatedTask} , "Task Updated Successfully..."));

});

const deleteTask = asyncHandler(async (req , res) => {
    const taskId = req.params.id;
    if(!taskId){
        throw new ApiError(404 , "Task Id not found...")
    }

    await validateProject(req.params.projectId , req.user._id);

    await Task.findByIdAndDelete(taskId);

     return res.status(200).json(new ApiResponse(200 , {} , "Task deleted  successfully..."))

});

const toggleTaskStatus = asyncHandler(async (req , res) => {
   const taskId = req.params.id;
    if(!taskId){
        throw new ApiError(404 , "Task Id not found...")
    }

    const task = await Task.findById(taskId)
    if(!task){
        throw new ApiError(404 , "Task does not exists...")
    }

    await validateProject(req.params.projectId , req.user._id);

    task.completed = !task.completed
    await task.save()

     return res.status(200).json(
        new ApiResponse(
            200,
            task,
            `Task marked as ${task.completed ? "completed" : "pending"}`
        )
    );

});

export { createTask , getTasks , getTaskById , updateTask , deleteTask , toggleTaskStatus }