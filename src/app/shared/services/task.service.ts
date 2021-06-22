import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from 'moment';

import {FbCreateResponse,Task} from "../interfaces";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";


@Injectable({providedIn:'root'})
export class TaskService{
  constructor(
    private http:HttpClient,
    private auth:AuthService
    ) {
  }
  isWindow:boolean=false;
  showWindow():void{
    this.isWindow=!this.isWindow;
  }
  create(task:Task):Observable<Task>{
    const id=this.auth.getLoaclaId;
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/tasks/${id}/${task.date}.json`,task)
      .pipe(
        map(res=>{
          return {...task,id:res.name}
        })
      )
  }
  getTasks(date:moment.Moment):Observable<Task[]>{
    const id=this.auth.getLoaclaId;
    return this.http.get<Task[]>(`${environment.fbDbUrl}/tasks/${id}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks)=>{
          if(!tasks){
            return [];
          }else{
            // @ts-ignore
            return Object.keys(tasks).map((key)=>({...tasks[key],id:key}));
          }
        })
      )
  }
  remove(date:string,tasksId:string):Observable<void>{
    const id=this.auth.getLoaclaId;
    return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}/${date}/${tasksId}.json`);
  }
  check(taskTimes:string []):number{
    return taskTimes.map(el=>Number(el)).reduce((predval,val,array)=>predval+val,0);
  }
}
