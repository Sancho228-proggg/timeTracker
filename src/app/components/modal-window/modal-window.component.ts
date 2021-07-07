import {Component, Input,OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {TaskService} from "../../shared/services/task.service";
import {DateService} from "../../shared/services/date.service";
import {Task} from "../../shared/interfaces";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit{
  @Input() task: Task;
  form: FormGroup;

  @Output() onCreate: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() toggleWindow:EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor(
    private taskService: TaskService,
    private dateService: DateService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      time: new FormControl(this.task.time, [Validators.required]),
      text: new FormControl(this.task.text, [Validators.required])
    })
  }



  close() {
    this.toggleWindow.emit(false);
  }

  submit() {
    const task = {
      time: this.form.value.time,
      text: this.form.value.text,
      date: this.dateService.date$.value.format('DD-MM-YYYY'),
      id: this.task.id
    }
    this.onCreate.emit(task);
    this.toggleWindow.emit(false);
  }

}
