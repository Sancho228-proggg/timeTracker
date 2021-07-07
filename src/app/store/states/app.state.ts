import {RouterReducerState} from '@ngrx/router-store';
import {initialUserState, UserState} from "./user.state";
import {initialTaskState, TaskState} from "./task.state";

export interface AppState{
  router?:RouterReducerState;
  user:UserState;
  tasks:TaskState
}

export const initialAppState:AppState={
  user:initialUserState,
  tasks:initialTaskState
}

export function getInitialState():AppState{
  return initialAppState;
}
