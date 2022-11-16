import {Component, OnInit} from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../api/api-reference";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments: AppointmentResponse[]=[];
  currentTabIndex = new Date().getDay() - 1;
  doctorId : string = ""
  constructor(private readonly client: AppointmentClient,private userService: UserService) { }
  ngOnInit(): void {
    this.userService.userId.subscribe(
      id =>{
        this.doctorId = id
        console.log(this.doctorId)
      }
    )
    this.getDoctorAppointments();
    console.log(this.currentTabIndex);

  }
  private readonly getDoctorAppointments=()=> {
  this.client.getDoctorAppointments("5247f675-6fc5-4700-be92-bc82524432ee").subscribe(
    {
      next: response => {
        this.appointments = response;
        console.log(this.appointments)
      }
    }
  )
}
     filterAppointmentByMonday() {
    return  this.appointments.filter(a => a.duration?.from?.getDay() == 1).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByTuesday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 2).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByWednesday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 3).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByThursday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 4).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByFriday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 5).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentBySaturday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 6).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentBySunday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 0).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
  getSelectedIndex(): number {
    return this.currentTabIndex;
  }
  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index;
  }
  onDelete(){
    this.getDoctorAppointments();
  }

}

