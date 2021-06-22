import { Component, OnInit } from '@angular/core';


import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  constructor(
              public taskService:TaskService
              ) { }

  ngOnInit(): void {
  }

  showWindow(){
    this.taskService.showWindow();
  }

}
