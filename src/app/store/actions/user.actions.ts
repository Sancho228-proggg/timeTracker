import {Action, createAction, props} from '@ngrx/store';
import {User} from "../../shared/interfaces";

//
// export class SignInUser implexport enum EUserActions{
// //   SignInUser="[User] SignIn",
// //   SignInUserSuccess="[User] SignInSuccess",
// //   SignUpUser="[User] SignUp",
// //   SignUpUserSuccess="[User] SignUpSuccess",
// //   LogoutUser="[User] LogoutUser",
// //   LogoutUserSuccess="[User] LogoutUserSuccess"
// // }ements Action{
//   public readonly type=EUserActions.SignInUser;
//   constructor(public payload:User) {}
// }
// export class SignInUserSuccess implements Action{
//   public readonly type=EUserActions.SignInUserSuccess;
//   constructor(public payload:User) {
//   }
// }
// export class SignUpUser implements Action{
//   public readonly type=EUserActions.SignUpUser;
//   constructor(public payload:User) {
//   }
// }
// export class SignUpUserSuccess implements Action{
//   public readonly type=EUserActions.SignUpUserSuccess;
//   constructor(public payload:User) {
//   }
// }
// export class LogoutUser implements Action{
//   public readonly type=EUserActions.LogoutUser;
// // }
// export class LogoutUserSuccess implements Action{
//   public readonly type=EUserActions.LogoutUserSuccess;
//   constructor(public payload:null) {
//   }
// } export type UserActions=SignUpUser|SignUpUserSuccess|LogoutUser|LogoutUserSuccess;


export const SignInUser = createAction(
  '[User] SignIn',
  props<{ user: User }>()
);

export const SignInUserSuccess = createAction(
  '[User] SignInSuccess',
  props<{
    user:User
  }>()
);

export const SignUpUser = createAction(
  '[User] SignUp',
  props<{ user: User }>()
);
export const SignUpUserSuccess = createAction(
  '[User] SignUpSuccess',
  props<{
    user: {
      email: string,
      password: string
    }
  }>()
);

export const LogoutUser = createAction(
  '[User] LogoutUser'
);

export const LogoutUserSuccess = createAction(
  '[User] LogoutUserSuccess',
  props<{ stay: null }>()
)


