import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {FbAuthResponse, User} from "../interfaces";
import {environment} from "../../../environments/environment";


@Injectable({providedIn:'root'})

export class AuthService {
  get token(){
    const exprDate=localStorage.getItem('fb-token-exp')
    if(+(new Date())>Number(exprDate)){
      this.logout()
      return null;
    }
    return localStorage.getItem('fb-token')
  }
  public error$:Subject<string>=new Subject<string>();
  constructor(private http:HttpClient) {

  }


  get getActiveUser():string|null{
    const activeUser=localStorage.getItem('active-user');
    return activeUser;
  }
  get getLoaclaId():string|null{
    const localId=localStorage.getItem('local-id');
    console.log(localId);
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


      console.log(response);
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

    }
    return throwError(error)

  }
}
