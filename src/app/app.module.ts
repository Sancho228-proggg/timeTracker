import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OrganiserComponent } from './components/organiser/organiser.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import {AuthGuard} from "./shared/auth.guard";
import { AlertComponent } from './shared/components/alert/alert.component';
import {MomentPipe} from "./shared/moment.pipe";
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {appReducers} from "./store/reducers/app.reducers";
import {UserEffects} from "./store/effects/user.effects";
import {TaskEffects} from "./store/effects/task.effects";





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainLayoutComponent,
    OrganiserComponent,
    CalendarComponent,
    SelectorComponent,
    ContentPageComponent,
    MomentPipe,
    ModalWindowComponent,
    AlertComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects,TaskEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
