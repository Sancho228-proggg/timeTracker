import { Component, OnInit } from '@angular/core';


import {DataService} from "../../shared/services/data.service";


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(public dataService:DataService) { }
  ngOnInit(): void {

  }
  go(dir:number){
    this.dataService.changeData(dir);
  }
}
