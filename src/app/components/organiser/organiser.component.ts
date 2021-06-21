import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";


import {TaskService} from "../../shared/services/task.service";
import {DataService} from "../../shared/services/data.service";
import {Task} from "../../shared/interfaces";


@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.scss']
})
export class OrganiserComponent implements OnInit,OnDestroy {

  tasks$:Observable<Task[]>
  removeSub:Subscription;
  constructor(
    private taskService:TaskService,
    private dataService:DataService,
    public cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.tasks$=this.dataService.date$.pipe(
      switchMap(val=>this.taskService.getTasks(val))
    )
  }
  ngOnDestroy() {
    if(this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  remove(date:string,tasksId:string){
   this.removeSub=this.taskService.remove(date,tasksId).subscribe();
  }

}
