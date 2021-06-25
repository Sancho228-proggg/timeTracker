import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {

  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.route.navigate(['authorization', 'signin']);
  }
}
