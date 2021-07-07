import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {TaskState} from "../states/task.state";


const selectTaskState=(state:AppState)=>state.tasks;

export const selectTask=createSelector(
  selectTaskState,
  (state:TaskState)=>state.selectedTask
);
export const selectAllTasks=createSelector(
  selectTaskState,
  (state:TaskState)=>state.tasks
);
