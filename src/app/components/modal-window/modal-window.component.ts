import {Component, Input, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";



import {TaskService} from "../../shared/services/task.service";
import {AuthService} from "../../shared/services/auth.service";
import {DateService} from "../../shared/services/date.service";
import {Task} from "../../shared/interfaces";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  form: FormGroup;
  taskTime: string;

  @Output() onCreate: EventEmitter<Task> = new EventEmitter<Task>()

  constructor(
    private taskService: TaskService,
    private auth: AuthService,
    private dateService: DateService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      time: new FormControl(this.task.time, [Validators.required]),
      text: new FormControl(this.task.text, [Validators.required])
    })
  }

  ngOnDestroy() {

  }

  close() {
    this.taskService.toggleWindow();
  }

  submit() {
    const task = {
      time: this.form.value.time,
      text: this.form.value.text,
      date: this.dateService.date$.value.format('DD-MM-YYYY'),
      id: this.task.id
    }
    this.onCreate.emit(task);
  }

}
