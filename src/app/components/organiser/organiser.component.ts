import {Component, Input, Output,EventEmitter} from '@angular/core';

import {Task} from "../../shared/interfaces";

@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.scss'],
  })
export class OrganiserComponent {
  @Input() task:Task;
  @Output() onRemove=new EventEmitter<string>();
  remove(date: string){
    this.onRemove.emit(date);
  }

}
