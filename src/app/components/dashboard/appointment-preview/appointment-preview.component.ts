import {Component, Input, OnInit} from '@angular/core';
import {AppointmentResponse} from "../../../api/api-reference";
import * as moment from "moment";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointments :AppointmentResponse[]=[];
  displayedColumns: string[] = ['date','start time','finish time','Patient'];
  constructor() { }

  ngOnInit(): void {
  }

  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }
  getHourFormat(date: Date) {
    return moment(date).format("h:mma");
  }

}
