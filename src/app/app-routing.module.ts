import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {LoginPageComponent} from "./Components/login-page/login-page.component";
import {ContentPageComponent} from "./Components/content-page/content-page.component";
import {AuthGuard} from "./Shared/auth.guard";
import {SignUpComponent} from "./Components/sign-up/sign-up.component";


const routes = [
  {path: "login", component: LoginPageComponent},
  {path:"signup",component:SignUpComponent},
  {path:"contentPage",component:ContentPageComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'contentPage',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
