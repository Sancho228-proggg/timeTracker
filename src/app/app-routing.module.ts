import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {LoginPageComponent} from "./components/login-page/login-page.component";
import {ContentPageComponent} from "./components/content-page/content-page.component";
import {AuthGuard} from "./shared/auth.guard";
import {LoginGuard} from "./shared/login.guard";



const routes = [
  {path: "authorization/:stay", component: LoginPageComponent,canActivate:[LoginGuard]},
  {path:"contentPage",component:ContentPageComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'contentPage',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
