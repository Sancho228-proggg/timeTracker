import {initialTaskState, TaskState} from "../states/task.state";
import {createReducer, on} from "@ngrx/store";
import * as TaskActions from '../actions/task.actions';


export const TaskReducer=createReducer(
  initialTaskState,
  on(TaskActions.GetTaskSuccess,(state,action)=>{
      return{
        ...state,
        selectedTask:action.task
      }
  }),
  on(TaskActions.GetAllTasksSuccess,(state,action)=>{
      return{
        ...state,
        tasks:action.tasks,
      }
  }),
  on(TaskActions.CreateTaskSuccess,(state,action)=>{
    let createState={...state}
      let createArr=[...createState.tasks];
      createArr.push(action.task.date);
      createState.tasks=createArr;
      createState.selectedTask=action.task;
      return createState;
  }),
  on(TaskActions.RemoveTaskSuccess,(state,action)=>{
    let removeState={...state}
      let removeArr=[...removeState.tasks];
      removeArr = removeArr.filter(val => val !== action.date);
      removeState.tasks=removeArr;
      removeState.selectedTask=null;
      return removeState;
  })
);
