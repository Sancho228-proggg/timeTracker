import {Injectable} from "@angular/core";
import {FbCreateResponse, Task} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {DataService} from "./data.service";
import {map, tap} from "rxjs/operators";
import * as moment from 'moment';

@Injectable({providedIn:'root'})
export class TaskService{
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private dataService:DataService
    ) {
  }
  isWindow:boolean=false;
  showWindow(){
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
  getTasks(date:moment.Moment):any{
    const id=this.auth.getLoaclaId;
    return this.http.get<any>(`${environment.fbDbUrl}/tasks/${id}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks)=>{
          if(!tasks){
            return [];
          }else{
            return Object.keys(tasks).map((key)=>({...tasks[key],id:key}));
          }
        })
      )
  }
}
