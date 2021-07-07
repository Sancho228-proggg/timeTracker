import {Task} from "../../shared/interfaces";
import {TaskService} from "../../shared/services/task.service";



export interface TaskState{
  selectedTask:Task,
  tasks:string []
}

export const initialTaskState:TaskState={
  selectedTask:null,
  tasks:null
}
