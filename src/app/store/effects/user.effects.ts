import {Injectable} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";
import {Actions, createEffect,ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import { mergeMap, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";
import {User} from "../../shared/interfaces";


@Injectable() export class UserEffects{

  public signIn$=createEffect(
    ()=>{
      return  this.actions$.pipe(
        ofType(UserActions.SignInUser),
        mergeMap(
          (action)=>{
            return this.authService.login(action.user).pipe(
              switchMap(val=>{
                const user:User={
                  email:val.email,
                  password:val.password
                }
                return of(UserActions.SignInUserSuccess({user}))
              }
              ),
              tap(()=>{
                this.alert.success('Вы успешно вошли');
                this.router.navigate(['/contentPage']);
              })
            )
          }
        )
      )
    }
  )


  public signUp$=createEffect(
    ()=>{
      return  this.actions$.pipe(
        ofType(UserActions.SignUpUser),
        mergeMap(
          (action)=>{
            return this.authService.signUp(action.user).pipe(
              switchMap(val=>{
                const user={
                  email:val.email,
                  password:val.password
                }
                return of(UserActions.SignUpUserSuccess({user})
              )}),
              tap(()=>{
                this.alert.success('Вы успешно зарегистрировались');
                this.router.navigate(['/contentPage']);
              })
            )
          }
        )
      )
    }
  )

  public logout$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(UserActions.LogoutUser),
        tap(()=>{
          this.authService.logout();
          this.router.navigate(['authorization', 'signin']);
        }),
        switchMap(()=>of(UserActions.LogoutUserSuccess(null)))
      )
    }
  )



  constructor(
    private authService:AuthService,
    private actions$:Actions,
    private store:Store<AppState>,
    private router:Router,
    private alert:AlertService
  ) {
  }
}
