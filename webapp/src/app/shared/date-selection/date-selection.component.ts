import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-date-selection",
  templateUrl: "./date-selection.component.html",
  styleUrls: ["./date-selection.component.css"],
})
export class DateSelection implements OnInit {
    years = [];
    allMonths = [
        { text: 'January', id: 0 },
        { text: 'February', id: 1 },
        { text: 'March', id: 2 },
        { text: 'April', id: 3 },
        { text: 'May', id: 4 },
        { text: 'June', id: 5 },
        { text: 'July', id: 6 },
        { text: 'August', id: 7 },
        { text: 'September', id: 8 },
        { text: 'October', id: 9 },
        { text: 'November', id: 10 },
        { text: 'December', id: 11 }
    ];
  fromDays = [];
  toDays = [];
  today: Date = new Date();
  fromDate: Date = new Date();
  toDate: Date = new Date();

  @Output() datesSelected = new EventEmitter<any>();

  ngOnInit() {
    for (let i = 2022; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
  }

  private getNumberOfDays = function (year, monthId: any) {
    const isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthId];
  };

  onSelectYear(date: Date, selectedYear){
    date.setFullYear(selectedYear);
  }

  getMonthId(selectedMonth){
    let monthId = 0;
    for (let id = 0; id < this.allMonths.length; id++) {
      if (this.allMonths[id].text == selectedMonth) {
        monthId = id;
      }
    }
    return monthId;
  }

  getMonth(date: Date){
    let selectedMonth = "";
    for (let id = 0; id < this.allMonths.length; id++) {
      if (this.allMonths[id].id == date.getMonth()) {
        selectedMonth = this.allMonths[id].text;
      }
    }
    return selectedMonth;
  }

  onSelectMonth(date: Date, selectedMonth: any, allMonthDays) {
    const monthDays: any = [];
    let monthId = this.getMonthId(selectedMonth);
    
    const daysCount = this.getNumberOfDays(date.getFullYear(), monthId);
    for (let dayNo = 1; dayNo <= daysCount; dayNo++) {
      monthDays.push({ id: dayNo, text: dayNo.toString() });
    }
    if(allMonthDays=="from"){
      this.fromDays = monthDays;
    }else{ 
      this.toDays = monthDays;
    }
    date.setMonth(monthId);
  }

  onSelectDay(date: Date, selectedDay: any) {
    date.setDate(selectedDay);    
  }

  customDateSelected(from: Date, to: Date){
    if(to<=from || to>this.today){
      return;
    }
    let event = {
      from: from,
      to: to
    }
    this.datesSelected.emit(event);
  }
}