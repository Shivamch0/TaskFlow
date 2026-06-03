import { Project } from "../model/project.model.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req , res) => {
    const {title , description } = req.body;
    const user = req.user._id

    if(!title?.trim()){
        throw new ApiError(400 , "Project title is required...");
    }

    const project = await Project.create({
        title,
        description,
        user
    })
    return res.status(200)
            .json(new ApiResponse(200 , {project} , "Project created successfully..."))
});

const getProjects = asyncHandler(async (req , res) => {
    const user = req.user._id;
    const projects = await Project.find({user}).sort({createdAt : -1});

    return res.status(200)
            .json(new ApiResponse(200 , projects , "Projects fetched successfully..."))
});

const getProjectById = asyncHandler(async (req , res) => {
    const projectId = req.params.id;
    if(!projectId){
        throw new ApiError(404 , "Project Id not found...")
    }
    const user = req.user._id;
    
    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }

    if(project.user.toString() !== user.toString()){
        throw new ApiError(403 , "You are not authorized to access this project...")
    }

    return res.status(200)
            .json(new ApiResponse(200 , project , "Fetched Project By Id Successfully..."))
});

const updateProject = asyncHandler(async (req , res) => {
    const projectId = req.params.id;
     if(!projectId){
        throw new ApiError(404 , "Project Id not found...")
    }
    const user = req.user._id;
    const { title , description} = req.body;

    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }
    if(project.user.toString() !== user.toString()){
        throw new ApiError(403 , "You are not authorized to update this project...")
    }

    const updatedProject = await Project.findByIdAndUpdate(  projectId , 
        {
            $set : {
                ...(title && {title}),
                ...(description && {description}),
            }
        },
        {new : true}
    )

    return res.status(200).json(new ApiResponse(200 , updatedProject , "Project details update successfully..."))
});

const deleteProject = asyncHandler(async (req , res) => {
    const projectId = req.params.id;
     if(!projectId){
        throw new ApiError(404 , "Project Id not found...")
    }
    const user = req.user._id;

    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }
    if(project.user.toString() !== user.toString()){
        throw new ApiError(403 , "You are not authorized to delete this project...")
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json(new ApiResponse(200 , {} , "Deleted Project successfully..."))
});


export { createProject , getProjects , getProjectById , updateProject , deleteProject }