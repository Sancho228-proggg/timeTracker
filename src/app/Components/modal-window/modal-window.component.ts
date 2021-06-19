import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../Shared/services/task.service";
import {AuthService} from "../../Shared/services/auth.service";
import {DataService} from "../../Shared/services/data.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  form:FormGroup;
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
  }
  submit(){


    const task={
      time:this.form.value.time,
      text:this.form.value.text,
      date:this.dataService.date$.value.format('DD-MM-YYYY')
    }
    this.taskService.create(task).subscribe(()=>{
      this.form.reset();
    })
    this.taskService.showWindow();
  }

}
