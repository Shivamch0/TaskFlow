import { SubTask } from "../model/subtask.model.js";

import { validateTask } from '../helpers/task.helper.js';
import { validateSubTask } from '../helpers/subTask.helper.js'

// ? Utils Import
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSubTask = asyncHandler(async (req , res) => {
    const { title } = req.body;
    if(!title){
        throw new ApiError(400 , "SubTask required...")
    }

    const taskId = req.params.id;

    const task = await validateTask(taskId)

    const subTask = await SubTask.create({
        title,
        task : task.id
    })

    return res.status(200).json(new ApiResponse(200 , {subTask} , "SubTask created successfully..."))

})

const getSubTasksByTask = asyncHandler(async (req , res) => {})

const getSubTaskById = asyncHandler(async (req , res) => {})

const updateSubTask = asyncHandler(async (req , res) => {})

const deleteSubTask = asyncHandler(async (req , res) => {})

const toggleSubTaskStatus = asyncHandler(async (req , res) => {})

export { createSubTask , getSubTasksByTask , getSubTaskById , updateSubTask , deleteSubTask , toggleSubTaskStatus}