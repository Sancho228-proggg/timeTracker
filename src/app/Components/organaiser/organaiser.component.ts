import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../Shared/services/task.service";
import {DataService} from "../../Shared/services/data.service";
import {switchMap} from "rxjs/operators";
import {Task} from "../../Shared/interfaces";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-organaiser',
  templateUrl: './organaiser.component.html',
  styleUrls: ['./organaiser.component.scss']
})
export class OrganaiserComponent implements OnInit,OnDestroy {

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
    this.removeSub.unsubscribe();
  }

  remove(date:string,tasksId:string){
   this.removeSub=this.taskService.remove(date,tasksId).subscribe();
  }

}
