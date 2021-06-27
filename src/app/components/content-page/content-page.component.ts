import {Component, OnDestroy, OnInit} from '@angular/core';


import {TaskService} from "../../shared/services/task.service";
import {switchMap} from "rxjs/operators";
import {DateService} from "../../shared/services/date.service";
import {Task} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit, OnDestroy {
  task: Task;
  removeSub: Subscription;
  tasks: string [] = [];
  preloader:boolean=true;

  constructor(
    public taskService: TaskService,
    private dateService: DateService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.dateService.date$.pipe(
      switchMap(val => this.taskService.getTask(val))
    ).subscribe(
      (task) => {
        this.task = task;
      }
    )
    this.taskService.getTasks().subscribe(
      val => {
        this.tasks = val;
        this.preloader=false;
        console.log(this.preloader);
      }
    )

  }

  ngOnDestroy() {
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  toggleWindow() {
    this.taskService.toggleWindow();
  }

  remove(date: string) {
    this.removeSub = this.taskService.remove(date).subscribe();
    this.tasks = this.tasks.filter(val => val !== date);
    this.alert.success('Задание было удалено');
    this.task = {
      time: '',
      text: '',
      date: ''
    };
  }

  create(task: Task) {
    if (!this.task.text) {
      if (+task.time <= 24) {
        this.taskService.create(task).subscribe();
        this.tasks.push(task.date)
        this.taskService.toggleWindow();
        this.alert.success('Задание было успешно добавлено');
        this.task = task;
      } else {
        this.taskService.toggleWindow();
        this.alert.danger('Количество общих часов на день превышает 24');
      }
    } else {
      if (+task.time <= 24) {
        this.taskService.update(task, task.id || '').subscribe();
        this.taskService.toggleWindow();
        this.alert.success('Задание было успешно обновлено');
        this.task = task;
      } else {
        this.taskService.toggleWindow();
        this.alert.danger('Количество общих часов на день превышает 24');
      }

    }

  }

}
