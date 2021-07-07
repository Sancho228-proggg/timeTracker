import {Component, OnInit} from '@angular/core';
import {DateService} from "../../shared/services/date.service";
import {Task} from "../../shared/interfaces";
import {AlertService} from "../../shared/services/alert.service";
import {AppState} from "../../store/states/app.state";
import {select, Store} from "@ngrx/store";
import {selectAllTasks, selectTask} from "../../store/selectors/task.selectors";
import {CreateTask, GetAllTasks, GetInitialTask, RemoveTask, UpdateTask} from "../../store/actions/task.actions";

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit{
  task: Task;
  tasks: string [] = [];
  preloader: boolean = true;
  task$ = this.store.pipe(select(selectTask));
  tasks$ = this.store.pipe(select(selectAllTasks));
  stayWindow: boolean = false;

  constructor(
    private dateService: DateService,
    private alert: AlertService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetInitialTask());
    this.store.dispatch(GetAllTasks());

    this.task$.subscribe(
      (task) => this.task = task
    )
    this.tasks$.subscribe(
      (tasks) => {
        this.tasks = tasks;
        if (this.tasks !== null) {
          this.preloader = false;
        }
      }
    )
  }


  toggleWindow(check: boolean) {
    this.stayWindow = check;
  }

  remove(date: string) {
    this.store.dispatch(RemoveTask({date}))
    this.alert.success('Задание было удалено');
  }

  create(task: Task) {
    if (!this.task.text) {
        this.store.dispatch(CreateTask({task}));
    } else {
        this.store.dispatch( UpdateTask({task}));
    }
  }

}
