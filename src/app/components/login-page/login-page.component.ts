import { Component,OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {User} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {AppState} from "../../store/states/app.state";
import {Store} from "@ngrx/store";
import {SignInUser, SignUpUser} from "../../store/actions/user.actions";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  check: boolean = true;
  message: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {


  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['stay'] == 'signin') {
        this.check = true;
      } else {
        this.check = false;
      }
    })


    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, введите данные'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    if (this.check) {
      this.store.dispatch(SignInUser({user}));
      this.form.reset();
      this.isSubmitted = false;
    } else {
      this.store.dispatch(SignUpUser({user}));
      this.form.reset();
      this.isSubmitted = false;
    }

  }

}
