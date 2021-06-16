import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { MainLayoutComponent } from './Shared/main-layout/main-layout.component';
import { OrganaiserComponent } from './Components/organaiser/organaiser.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainLayoutComponent,
    OrganaiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
