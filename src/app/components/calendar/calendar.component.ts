import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';


import {DateService} from "../../shared/services/date.service";



interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
  withTask: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: Week[];

  @Input() tasks: string [];

  constructor(
    private dateService: DateService
  ) {
  }

  ngOnInit(): void {
    this.dateService.date$.subscribe(this.generate.bind(this));

  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').subtract(1, 'day').startOf('week');
    const endDay = now.clone().endOf('month').subtract(1, 'day').endOf('week');
    let date = startDay.clone();
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            const withTask = this.checkTask(value);
            return {
              value, active, disabled, selected, withTask
            }
          })
      });
    }
    this.calendar = calendar;
  }

  select(day: Day): void {
    if (day.selected) {
      return;
    }
    this.dateService.changeDay(day.value);
  }

  checkTask(date: moment.Moment): boolean {
    if (this.tasks) {
      return this.tasks.includes(date.format('DD-MM-YYYY').toString());
    } else {
      return false;
    }
  }

}
