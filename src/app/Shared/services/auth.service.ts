import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn:'root'})

export class AuthService {
  activeUser:string='';
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
  login(user:User):Observable<any>{
    user.returnSecureToken=true;
    this.activeUser=user.email;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,user)
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
      localStorage.setItem('fb-token-exp',exprDate.toString())
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
