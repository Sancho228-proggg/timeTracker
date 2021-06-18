import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {LoginPageComponent} from "./Components/login-page/login-page.component";
import {ContentPageComponent} from "./Components/content-page/content-page.component";
import {AuthGuard} from "./Shared/auth.guard";


const routes = [
  {path: "login", component: LoginPageComponent},
  {path:"contentPage",component:ContentPageComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'contentPage',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
