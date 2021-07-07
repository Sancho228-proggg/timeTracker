import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {AppState} from "../../../store/states/app.state";
import {select, Store} from "@ngrx/store";
import {LogoutUser} from "../../../store/actions/user.actions";
import {selectUser} from "../../../store/selectors/user.selectors";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(
    public auth: AuthService,
    private route: Router,
    private store:Store<AppState>
  ) {
  }



  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(LogoutUser());
  }
}
