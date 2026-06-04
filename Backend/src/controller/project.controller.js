import { Project } from "../model/project.model.js";
import { Task } from "../model/task.model.js";
import { SubTask } from "../model/subtask.model.js";

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateObjectId } from "../utils/validateObjectId.js";

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
    const projects = await Project.find({user}).sort({createdAt : -1}).lean();

    // Dynamically calculate progress for each project based on tasks and subtasks
    for (let project of projects) {
        const tasks = await Task.find({ project: project._id }).lean();
        const taskIds = tasks.map(t => t._id);
        const subtasks = await SubTask.find({ task: { $in: taskIds } }).lean();
        
        let totalSubtasks = subtasks.length;
        let completedSubtasks = subtasks.filter(st => st.completed).length;
        
        let progress = 0;
        if (totalSubtasks > 0) {
            progress = Math.round((completedSubtasks / totalSubtasks) * 100);
        } else {
            let totalTasks = tasks.length;
            if (totalTasks > 0) {
                let completedTasks = tasks.filter(t => t.completed).length;
                progress = Math.round((completedTasks / totalTasks) * 100);
            }
        }
        
        // Save the calculated progress back to MongoDB as well to keep it in sync
        await Project.findByIdAndUpdate(project._id, { $set: { progress } });
        project.progress = progress;
    }

    return res.status(200)
            .json(new ApiResponse(200 , projects , "Projects fetched successfully..."))
});

const getProjectById = asyncHandler(async (req , res) => {
    const projectId = req.params.id;
    validateObjectId(projectId, "Project Id");
    const user = req.user._id;
    
    const project = await Project.findById(projectId).lean();
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }

    if(project.user.toString() !== user.toString()){
        throw new ApiError(403 , "You are not authorized to access this project...")
    }

    // Fetch tasks for this project
    const tasks = await Task.find({ project: projectId }).sort({ createdAt: 1 }).lean();
    
    // Fetch subtasks for all those tasks
    const taskIds = tasks.map(t => t._id);
    const subtasks = await SubTask.find({ task: { $in: taskIds } }).sort({ createdAt: 1 }).lean();

    // Group subtasks by task id
    const subtasksByTask = {};
    subtasks.forEach(st => {
        const tid = st.task.toString();
        if (!subtasksByTask[tid]) {
            subtasksByTask[tid] = [];
        }
        subtasksByTask[tid].push(st);
    });

    // Attach subtasks to tasks
    tasks.forEach(t => {
        t.subtasks = subtasksByTask[t._id.toString()] || [];
    });

    // Calculate dynamic progress
    let totalSubtasks = subtasks.length;
    let completedSubtasks = subtasks.filter(st => st.completed).length;
    
    let progress = 0;
    if (totalSubtasks > 0) {
        progress = Math.round((completedSubtasks / totalSubtasks) * 100);
    } else {
        let totalTasks = tasks.length;
        if (totalTasks > 0) {
            let completedTasks = tasks.filter(t => t.completed).length;
            progress = Math.round((completedTasks / totalTasks) * 100);
        }
    }
    
    project.tasks = tasks;
    project.progress = progress;
    
    // Update progress in the DB
    await Project.findByIdAndUpdate(projectId, { $set: { progress } });

    return res.status(200)
            .json(new ApiResponse(200 , project , "Fetched Project By Id Successfully..."))
});

const updateProject = asyncHandler(async (req , res) => {
    const projectId = req.params.id;
    validateObjectId(projectId, "Project Id");
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
    validateObjectId(projectId, "Project Id");
    const user = req.user._id;

    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404 , "Project not found...")
    }
    if(project.user.toString() !== user.toString()){
        throw new ApiError(403 , "You are not authorized to delete this project...")
    }

    const tasks = await Task.find({ project: projectId }).select("_id");
    const taskIds = tasks.map((task) => task._id);

    await SubTask.deleteMany({ task: { $in: taskIds } });
    await Task.deleteMany({ project: projectId });
    await Project.findByIdAndDelete(projectId);

    return res.status(200).json(new ApiResponse(200 , {} , "Deleted Project successfully..."))
});


export { createProject , getProjects , getProjectById , updateProject , deleteProject }
