import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { MainLayoutComponent } from './Shared/main-layout/main-layout.component';
import { OrganaiserComponent } from './Components/organaiser/organaiser.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { SelectorComponent } from './Components/selector/selector.component';
import { ContentPageComponent } from './Components/content-page/content-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MomentPipe} from "./Shared/moment.pipe";
import { ModalWindowComponent } from './Components/modal-window/modal-window.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./Shared/auth.guard";



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainLayoutComponent,
    OrganaiserComponent,
    CalendarComponent,
    SelectorComponent,
    ContentPageComponent,
    MomentPipe,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
