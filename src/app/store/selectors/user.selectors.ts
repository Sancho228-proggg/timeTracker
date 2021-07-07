import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {UserState} from "../states/user.state";


const selectUserState=(state:AppState)=>state.user;

export const selectUser=createSelector(
  selectUserState,
  (state:UserState)=>state.user
);
