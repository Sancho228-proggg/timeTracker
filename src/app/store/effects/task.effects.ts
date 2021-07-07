import {Injectable} from "@angular/core";
import {Actions, createEffect,ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../states/app.state";
import * as TasksActions from "../actions/task.actions";
import {DateService} from "../../shared/services/date.service";
import {switchMap, tap} from "rxjs/operators";
import {TaskService} from "../../shared/services/task.service";
import {of} from "rxjs";


@Injectable()
export class TaskEffects {


  public getTask$=createEffect(
    ()=>{
        return this.actions$.pipe(
          ofType(TasksActions.GetInitialTask),
          switchMap(() => this.dateService.date$),
          switchMap((date) => this.taskService.getTask(date)),
          switchMap((task) => of(TasksActions.GetTaskSuccess({task})))
        )
    }
  )


  public getCurrentTaskByDay$ = createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.GetCurrentTaskByDay),
        tap((action) => this.dateService.changeDay(action.date)),
        switchMap(() => this.dateService.date$),
        switchMap((date) => this.taskService.getTask(date)),
        switchMap((task) => of(TasksActions.GetTaskSuccess({task})))
      )
    }
  )

  public getCurrentTaskByMonth$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.GetCurrentTaskByMonth),
        tap((action) => this.dateService.changeData(action.dir)),
        switchMap(() => this.dateService.date$),
        switchMap((date) => this.taskService.getTask(date)),
        switchMap((task) => of(TasksActions.GetTaskSuccess({task})))
      )
    }
  )

  public getAllTasks$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.GetAllTasks),
        switchMap(() => this.taskService.getTasks()),
        switchMap((tasks) => of(TasksActions.GetAllTasksSuccess({tasks})))
      )
    }
  )

  public createTask$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.CreateTask),
        switchMap((action) => this.taskService.create(action.task)),
        switchMap((task) => of(TasksActions.CreateTaskSuccess({task})))
      )
    }
  )

  public updateTask$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.UpdateTask),
        switchMap((action) => this.taskService.update(action.task,action.task.id)),
        switchMap((task) => of(TasksActions.GetTaskSuccess({task})))
      )
    }
  )

  public removeTask$=createEffect(
    ()=>{
      return this.actions$.pipe(
        ofType(TasksActions.RemoveTask),
        tap((action)=>this.taskService.remove(action.date).subscribe()),
        switchMap((action)=>of(TasksActions.RemoveTaskSuccess({date:action.date})))
      )
    }
  )




  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dateService: DateService,
    private taskService: TaskService
  ) {
  }

}

