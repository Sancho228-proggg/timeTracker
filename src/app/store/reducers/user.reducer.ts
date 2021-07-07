import {initialUserState, UserState} from "../states/user.state";
import * as UserActions from "../actions/user.actions";
import {createReducer, on} from "@ngrx/store";


export const UserReducer=createReducer(
  initialUserState,
  on(UserActions.SignInUserSuccess,(state,action)=>{
      return {
        ...state,
        user: action.user
      };
  }),
  on(UserActions.SignUpUserSuccess,(state,action)=>{
      return{
        ...state,
        user:action.user
      };
  }),
  on(UserActions.LogoutUserSuccess,(state,action)=>{
      return{
        ...state,
        user:action.stay
      }
  })
);

