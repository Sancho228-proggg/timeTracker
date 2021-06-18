import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class TaskService{

  isWindow:boolean=false;
  showWindow(){
    this.isWindow=!this.isWindow;
  }
}
