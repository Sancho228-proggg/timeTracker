import { Component } from '@angular/core';


import {DateService} from "../../shared/services/date.service";
import {AppState} from "../../store/states/app.state";
import {Store} from "@ngrx/store";
import { GetCurrentTaskByMonth} from "../../store/actions/task.actions";


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent  {

  constructor(
    public dataService:DateService,
    private store:Store<AppState>
    ) { }

  go(dir:number){
    this.store.dispatch(GetCurrentTaskByMonth({dir}));
  }
}
