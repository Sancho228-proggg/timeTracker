import {Component, OnDestroy, OnInit} from '@angular/core';


import {TaskService} from "../../shared/services/task.service";
import {switchMap} from "rxjs/operators";
import {DataService} from "../../shared/services/data.service";
import {Task} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit,OnDestroy {
  task: Task;
  removeSub: Subscription;

  constructor(
    public taskService: TaskService,
    private dataService: DataService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.dataService.date$.pipe(
      switchMap(val => this.taskService.getTask(val))
    ).subscribe(
      (task) => {
        this.task = task;
      }
    )
  }
  ngOnDestroy() {
    if(this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  togleWindow() {
    this.taskService.showWindow();
  }

  remove(date: string) {
    this.removeSub = this.taskService.remove(date).subscribe();
    this.alert.success('Задание было удалено');
    this.task={
      time:'',
      text:'',
      date:''
    };
  }

  create(task:Task){
    if(!this.task.text){
      if (+task.time <= 24) {
        this.taskService.create(task).subscribe((task) => {
          if(task.id) {
            localStorage.setItem('taskId', task.id);
          }
        });
        this.taskService.showWindow();
        this.alert.success('Задание было успешно добавлено');
        this.task=task;
      } else {
        this.taskService.showWindow();
        this.alert.danger('Количество общих часов на день превышает 24');
      }
    }
   else{
     if(+task.time<=24) {
       const taskId:string=localStorage.getItem('taskId')||'';
       this.taskService.uppdate(task,taskId).subscribe();
       this.taskService.showWindow();
       this.alert.success('Задание было успешно обновлено');
       this.task=task;
     }else{
       this.taskService.showWindow();
       this.alert.danger('Количество общих часов на день превышает 24');
     }

    }

  }

}
