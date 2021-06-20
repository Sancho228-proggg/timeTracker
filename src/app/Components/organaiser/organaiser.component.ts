import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../Shared/services/task.service";
import {DataService} from "../../Shared/services/data.service";
import {switchMap} from "rxjs/operators";
import {Task} from "../../Shared/interfaces";

@Component({
  selector: 'app-organaiser',
  templateUrl: './organaiser.component.html',
  styleUrls: ['./organaiser.component.scss']
})
export class OrganaiserComponent implements OnInit {
  tasks:Task[]=[];
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

}
