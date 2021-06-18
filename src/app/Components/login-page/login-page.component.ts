import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Shared/interfaces";
import {AuthService} from "../../Shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form:FormGroup;
  isSumbitted:boolean=false;
  message:string='';
  constructor(
    public authService:AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message='Пожалуйста, введите данные'
      }
      else if(params['authFailed']){
        this.message="Сессия истекла, введите данные"
      }
    })

    this.form=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }
  submit(){
    if(this.form.invalid){
      return;
    }
    this.isSumbitted=true;
    const user:User={
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.authService.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/contentPage']);
      this.isSumbitted=false;
    },()=>{this.isSumbitted=false;})

  }

}
