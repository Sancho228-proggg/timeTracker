import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";



import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  isSumbitted:boolean=false;
  message:string='';
  constructor(
    public authService:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private alert:AlertService

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

    this.authService.signUp(user).subscribe(()=>{
      this.form.reset();
      this.alert.success('Вы успешно зарегистрировались');
      this.router.navigate(['/contentPage']);
      this.isSumbitted=false;
    },()=>{this.isSumbitted=false;})

  }

}
