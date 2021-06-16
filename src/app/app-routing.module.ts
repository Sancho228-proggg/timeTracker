import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./Components/login-page/login-page.component";
import {OrganaiserComponent} from "./Components/organaiser/organaiser.component";


const routes = [
  {path: "login", component: LoginPageComponent},
  {path:"organaiser",component:OrganaiserComponent},
  {path:'',redirectTo:'organaiser',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
