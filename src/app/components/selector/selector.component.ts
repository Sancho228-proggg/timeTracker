import { Component, OnInit } from '@angular/core';


import {DateService} from "../../shared/services/date.service";


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(public dataService:DateService) { }
  ngOnInit(): void {

  }
  go(dir:number){
    this.dataService.changeData(dir);
  }
}
