import {Component, Input, OnDestroy, OnInit, Output,EventEmitter} from '@angular/core';


import {Task} from "../../shared/interfaces";



@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.scss'],
  })
export class OrganiserComponent implements OnInit,OnDestroy {

  @Input() task:Task;
  @Output() onRemove=new EventEmitter<string>()
  constructor(

  ) {

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {

  }

  remove(date: string){
    this.onRemove.emit(date);
  }

}
