import { Component, OnInit } from '@angular/core';
import {Holiday, HolidayClient, HolidayResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import * as moment from "moment/moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctors-holidays',
  templateUrl: './doctors-holidays.component.html',
  styleUrls: ['./doctors-holidays.component.css']
})
export class DoctorsHolidaysComponent implements OnInit {
  displayedColumns: string[] = ['StartDate','EndDate','Description','Status','Cancel'];
  holidays: HolidayResponse[] =[]

  constructor(private readonly client: HolidayClient,private tokenStorageService:TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.client.getDoctorHolidays(this.tokenStorageService.getUser().id).subscribe(
      {
        next: response=>{
          this.holidays = response
        }
      }
    )
  }
  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }
  getStatus(num:Number) {
    if(num == 0){
      return 'Pending'
    }
    if(num==1){
      return "Approved"
    }
    return 'Declined'
  }

  canCancel(holiday:Holiday) {
    if(holiday.holidayStatus==1|| holiday.dateRange?.from!<new Date()){
      return false
    }
    return true
  }

  cancleHoliday(id:string) {
    this.client.cancelHoliday(id).subscribe({
      next:res=>{
        this.client.getDoctorHolidays(this.tokenStorageService.getUser().id).subscribe({
          next:response=>{
            this.holidays=response
          }
        })
    }
    })
  }

  navigateNewHoliday() {
    this.router.navigate(['schedule-holiday'])
  }
}
