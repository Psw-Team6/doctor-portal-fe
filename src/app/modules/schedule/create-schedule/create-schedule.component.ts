import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  AppointmentRequest,
  AppointmentState,
  AppointmentType,
  DateRange,
  ScheduleClient
} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import * as moment from "moment/moment";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myForm: FormGroup;
  patientId : string = "";
  doctorId : string[] = ['4a5f7b19-f0d1-4461-b7f7-d5c0f74a0b0b',
    '317eb3a7-f6af-4c0b-851a-728bedde9062','f6b8e95e-9a4a-46d6-8c38-a895d79ec8e8']
  constructor(private  fb: FormBuilder,private client: ScheduleClient, private alert: NgToastService) {
    this.myForm = this.fb.group({
      date: new Date(),
      startTime : "",
      finishTime : ""
      }
    )
  }

  ngOnInit(): void {
  }

  onSelecting(value: string) {
    this.patientId  = value
    console.log(this.patientId)
  }

  scheduleAppointment() {
    if(!this.validateFields()){
      return;
    }
    let fromDateTime: moment.Moment = this.getMomentFromTimeString(this.myForm.controls['startTime'].value)
    let toDateTime: moment.Moment = this.getMomentFromTimeString(this.myForm.controls['finishTime'].value)
    let hoursTo:number = fromDateTime.toDate().getHours()
    let minsTo:number = fromDateTime.toDate().getMinutes()
    let fromDate: Date  = new Date(new Date(this.myForm.controls['date'].value).setHours(hoursTo+1, minsTo, 0, 0))
    let hoursFrom:number = toDateTime.toDate().getHours()
    let minsFrom :number= toDateTime.toDate().getMinutes()
    let toDate: Date = new Date(new Date(this.myForm.controls['date'].value).setHours(hoursFrom+1, minsFrom, 0, 0))
    if(!this.checkTime(hoursTo,hoursFrom,minsTo,minsFrom)){
      return;
    }
    this.postAppointment(fromDate, toDate);
  }

  private postAppointment(fromDate: Date, toDate: Date) {
    let app: AppointmentRequest = new AppointmentRequest(
      {
        appointmentState: AppointmentState.Pending,
        appointmentType: AppointmentType.Examination,
        doctorId: this.doctorId[1],
        patientId: this.patientId,
        duration: new DateRange(
          {
            from: fromDate,
            to: toDate
          }
        ),
        emergent: false
      }
    );
    this.client.scheduleAppointment(app).subscribe(
      {
        next: response => {
          app = response
          console.log(response)
        },
        error: message => {
          console.log(message.Error)
          this.alert.error({detail: 'Error!', summary: message.Error, duration: 5000})
        }

      }
    )
  }

  private validateFields():boolean{
    if(this.patientId === ""){
      this.alert.error({detail: 'Error!',summary:"Please select a patient",duration:5000})
      return false
    }
    if(this.myForm.controls['startTime'].value === ""){
      this.alert.error({detail: 'Error!',summary:"Please select startTime",duration:5000})
      return false
    }
    if(this.myForm.controls['startTime'].value === ""){
      this.alert.error({detail: 'Error!',summary:"Please finishTime",duration:5000})
      return false
    }
    return true
  }
  private getMomentFromTimeString(str: string) {
    const t = moment(str, 'HH:mm A');
    // Now t is a moment.js object of today's date at the time given in str

    if (t.get('hour') < 22) // If it's before 9 pm
      t.add(1,'d'); // Add 1 day, so that t is tomorrow's date at the same time

    return t;
  }
  private checkTime(startHours:number,endHours:number,startMins:number,endMins:number):boolean{
    if (startHours > endHours){
      this.alert.error({detail: 'Error!',summary:"Invalid duration!",duration:5000})
      return false
    }
    else if (startHours + 2 < endHours) {
      this.alert.error({detail: 'Error!',summary:"Duration too long!",duration:5000})
      return false
    }
    else if (startHours == endHours) {
      if(startMins+15>endMins){
        this.alert.error({detail: 'Error!',summary:"Duration too short!",duration:5000})
        return false
      }
    }
    return true
    }
}
