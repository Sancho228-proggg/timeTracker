import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {TaskService} from "./services/task.service";
import {VerifiableUser} from "./interfaces";

@Injectable()
export class AuthGuard implements CanActivate {
  verifiableUser: VerifiableUser;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  checkAuth(): boolean {
    this.auth.getUserInfo().subscribe(
      (val) => {
        this.verifiableUser = val;
      }
    )
    const localId = localStorage.getItem('local-id');
    if (this.verifiableUser) {
      if (localId === this.verifiableUser.localId) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }


  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAuth() && this.checkAuth()) {
      return true;
    } else {
      this.auth.logout()
      this.router.navigate(['/', 'login'], {
        queryParams: {
          loginAgain: true
        }
      })
      return false;
    }
  }
}
