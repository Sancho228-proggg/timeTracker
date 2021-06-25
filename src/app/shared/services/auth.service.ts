import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, Subject, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import {FbAuthResponse, FbUserResponce, User} from "../interfaces";
import {environment} from "../../../environments/environment";



@Injectable({providedIn:'root'})

export class AuthService {
  get token(){
    const exprDate=localStorage.getItem('fb-token-exp')
    if(+(new Date())>Number(exprDate)){
      this.logout();

      return null;
    }
    return localStorage.getItem('fb-token')
  }
  public error$:Subject<string>=new Subject<string>();
  constructor(private http:HttpClient) {}


  get getActiveUser():string|null{
    const activeUser=localStorage.getItem('active-user');
    return activeUser;
  }
  get getLocalId():string|null{
    const localId=localStorage.getItem('local-id');
    return localId;
  }
  login(user:User):Observable<User>{
    user.returnSecureToken=true;
    return this.http.post<User>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
      .pipe(
        tap(this.setToken?this.setToken:console.error),
        catchError(this.handleError.bind(this))
      )
  }
  signUp(user:User):Observable<User>{
    user.returnSecureToken=true;
    return this.http.post<User>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,user)
      .pipe(
        tap(this.setToken?this.setToken:console.error),
        catchError(this.handleError.bind(this))
      )
  }
  logout(){
    this.setToken(null);
  }

  isAuth():boolean{
    return !!this.token;
  }

  private setToken(response:FbAuthResponse|null){
    if(response){
      const exprDate=new Date(( Date.now()+ +response.expiresIn*1000));
      localStorage.setItem('fb-token',response.idToken);
      localStorage.setItem('fb-token-exp',exprDate.toString());
      localStorage.setItem('active-user',response.email||'');
      localStorage.setItem('local-id',response.localId||'');
    }else{
      localStorage.clear();
    }
  }
  private handleError(error:HttpErrorResponse){
    const {message}=error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email не существует')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('Email занят')
        break;
      case 'USER_NOT_FOUND':
        this.error$.next('Введите данные')
        break;
      case 'INVALID_ID_TOKEN':
        this.error$.next('Введите данные')
        break;

    }
    return throwError(error)

  }
  private handleErrorAuth(error:HttpErrorResponse){
    const {message}=error.error.error;
    switch (message) {
      case 'INVALID_ID_TOKEN':
        this.error$.next('Введите данные')
        break;

    }
    localStorage.clear();
    return of(false);

  }
  getAuthInfo(){
    return this.http.post<FbUserResponce>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`,{idToken:this.token})
      .pipe(
        map((val)=>{
          const user=val.users[0];
          const localId = localStorage.getItem('local-id');
          if (user) {
            if (localId === user.localId) {
              return true;
            } else {
              localStorage.clear()
              return false;
            }
          } else {
            return false;
          }
        }),
        catchError(this.handleErrorAuth.bind(this))
      )
  }
}
