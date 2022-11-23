import { Component, OnInit } from '@angular/core';
import { PatientAdmissionRequestModel } from "../model/patientAdmissionRequest.model";
import {PatientAdmissionService} from "../services/patient-admission.service";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-patient-hospitalization',
  templateUrl: './patient-hospitalization.component.html',
  styleUrls: ['./patient-hospitalization.component.css']
})
export class PatientHospitalizationComponent implements OnInit {

  public patientId: string = '';
  public patientAdmission = new PatientAdmissionRequestModel();

  constructor(private alert: NgToastService, private patientAdmissionService: PatientAdmissionService) { }

  ngOnInit(): void {
  }

  onSelecting(value: string) {
    this.patientAdmission.patientId = value;
  }

  hospitalize(): void {
    if(!this.isValidInput()){
     return;
    }
    this.patientAdmissionService.postAdmission(this.patientAdmission).subscribe(res => {
        this.alert.success({detail: 'Patient hospitalized successfully!', summary: "Success!", duration: 5000})
    },
      error => {
      if(error.status == '403') {
        this.alert.error({detail: 'This patient is already hospitalized!', summary: error.status, duration: 5000})
      }
        else if (error.status == '404') {
        this.alert.error({detail: 'There is no free beds left!', summary: error.status, duration: 5000})
      }

      });
  }

  private isValidInput(): boolean {
    if (this.patientAdmission.reason == ''){
      this.alert.error({detail: 'Enter a reason!', summary: "Fill all the fields!", duration: 5000})
      return false;
    }
    if (this.patientAdmission.patientId == '' || this.patientAdmission.patientId == undefined){
      this.alert.error({detail: 'Select a patient!', summary: "A patient must be selected...", duration: 5000})
      return false;
    }
    return true;
  }
}
