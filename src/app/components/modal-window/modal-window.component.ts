import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";


import {TaskService} from "../../shared/services/task.service";
import {AuthService} from "../../shared/services/auth.service";
import {DataService} from "../../shared/services/data.service";
import {AlertService} from "../../shared/services/alert.service";

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
    private dataService:DataService,
    private alert:AlertService
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
    const allTime:number=this.taskService.check(this.taskTimes);
    if(allTime<=24){
    this.taskService.create(task).subscribe(()=>{
      this.form.reset();
    })
      this.taskService.showWindow();
      this.alert.success('Задание было успешно добавлено');
    }
    else{
      this.taskService.showWindow();
      this.alert.danger('Количество общих часов на день превышает 24');
      this.form.reset();
    }

  }

}
