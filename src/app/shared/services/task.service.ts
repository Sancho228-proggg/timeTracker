import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import * as moment from 'moment';

import {FbCreateResponse,Task} from "../interfaces";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {AlertService} from "./alert.service";


@Injectable({providedIn:'root'})
export class TaskService{
  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private alert:AlertService
    ) {
  }

  create(task:Task):Observable<Task>{
    if(+task.time <= 24 && +task.time > 0){
    const id=this.auth.getLocalId;
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/tasks/${id}/${task.date}.json`,task)
      .pipe(
        map(res=>{
          return {...task,id:res.name}
        })
      )
      this.alert.success('Задание было успешно добавлено');
    }
    else{
      this.alert.danger('Указано неверное время');
      return null;
    }
  }
  update(task:Task,taskId:string):Observable<Task>{
    if(+task.time <= 24 && +task.time > 0 ){
    const id=this.auth.getLocalId;
    return this.http.put<FbCreateResponse>(`${environment.fbDbUrl}/tasks/${id}/${task.date}/${taskId}.json`,task)
      .pipe(
        map(res=>{
          return {...task,id:taskId}
        })
      )
      this.alert.success('Задание было успешно обновлено');
    }
    else {
      this.alert.danger('Указано неверное время');
      return null;
    }
  }


  getTask(date:moment.Moment):Observable<Task>{
    const id=this.auth.getLocalId;
    return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((task)=>{
          if(!task){
            const emptyTask:Task={
              time:'',
              text:'',
              date:''
            }
            return emptyTask;
          }else{

            const tasks:Task[]=Object.keys(task).map((key)=>({...task[key],id:key}));
            return tasks[0];
          }
        })
      )
  }

  getTasks():Observable<string []>{
    const id=this.auth.getLocalId;
    return this.http.get<string>(`${environment.fbDbUrl}/tasks/${id}.json`)
      .pipe(
        map(tasks=>{
          if(!tasks){
            return [];
          }
          else{
            let arr=Object.keys(tasks);;
            return arr;
          }
        })
      )

  }

  remove(date:string):Observable<void>{
    const id=this.auth.getLocalId;
    console.log(id)
    return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}/${date}.json`);
  }
  check(taskTimes:string []):number{
    return taskTimes.map(el=>Number(el)).reduce((predval,val,array)=>predval+val,0);
  }
}
