import { SubTask } from "../model/subtask.model.js";
import { ApiError } from "../utils/ApiError.js";

export const validateSubTask = async (subTaskId , userId) => {
    if(!subTaskId){
        throw new ApiError(404, "SubTask Id not found...");
    }

    const subTask = await SubTask.findById(subTaskId);
    if(!subTask){
        throw new ApiError(404, "SubTask not found...");
    }

    return subTask

}