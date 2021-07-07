import {AppState} from "../states/app.state";
import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {UserReducer} from "./user.reducer";
import {TaskReducer} from "./task.reducer";

export const appReducers:ActionReducerMap<AppState,any>={
  router:routerReducer,
  user:UserReducer,
  tasks:TaskReducer
}
