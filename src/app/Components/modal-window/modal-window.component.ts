import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../Shared/services/task.service";
import {AuthService} from "../../Shared/services/auth.service";
import {DataService} from "../../Shared/services/data.service";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit,OnDestroy {
  form:FormGroup;
  taskTimes:string []=[];
  tasks:Subscription;
  constructor(
    private taskService:TaskService,
    private auth:AuthService,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      time:new FormControl(null,[Validators.required]),
      text:new FormControl(null,[Validators.required])
    })
    this.tasks=this.dataService.date$.pipe(
      switchMap(val=>this.taskService.getTasks(val))
    ).subscribe(tasks=>{
     tasks.map((task)=>this.taskTimes.push(task.time));
    })
  }
  ngOnDestroy() {
    this.tasks.unsubscribe();
  }

  submit(){
    const task={
      time:this.form.value.time,
      text:this.form.value.text,
      date:this.dataService.date$.value.format('DD-MM-YYYY')
    }
    this.taskTimes.push(this.form.value.time);
    const allTime:number=this.taskTimes.map(el=>Number(el)).reduce((predval,val,array)=>predval+val,0);
    if(allTime<24){
    this.taskService.create(task).subscribe(()=>{
      this.form.reset();
    })
      this.taskService.showWindow();
    }
    else{
      this.taskService.showWindow();
      this.form.reset();
    }

  }

}
