import {Observable, zip} from 'rxjs';
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  checkAuth():Observable<boolean>{
   return this.auth.getAuthInfo()
  }


  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   return this.checkAuth().pipe(
     tap(val => {
       if (!val) {
         this.auth.logout()
         this.router.navigate(['authorization', 'signin'], {
           queryParams: {
             loginAgain: true
           }
         })
       }
     })
   )
  }
}
