import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type AlertType='success'|'danger';

export interface Alert{
  type:AlertType,
  text:string
}

@Injectable({providedIn:'root'})
export class AlertService{
  public alert$=new Subject<Alert>()

  success(text:string){
    this.alert$.next({type:'success',text})
  }

   danger(text:string){
    this.alert$.next({type:'danger',text})
  }
}
