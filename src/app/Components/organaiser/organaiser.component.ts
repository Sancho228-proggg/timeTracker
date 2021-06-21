import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../Shared/services/task.service";
import {DataService} from "../../Shared/services/data.service";
import {switchMap} from "rxjs/operators";
import {Task} from "../../Shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-organaiser',
  templateUrl: './organaiser.component.html',
  styleUrls: ['./organaiser.component.scss']
})
export class OrganaiserComponent implements OnInit,OnDestroy {
  tasks:Task[]=[];
  removeSub:Subscription;
  constructor(
    private taskService:TaskService,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.dataService.date$.pipe(
      switchMap(val=>this.taskService.getTasks(val))
    ).subscribe(tasks=>{
      this.tasks=tasks;
    })
  }
  ngOnDestroy() {
    this.removeSub.unsubscribe();
  }

  remove(date:string,tasksId:string){
   this.removeSub=this.taskService.remove(date,tasksId).subscribe();
  }

}
