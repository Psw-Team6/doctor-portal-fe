import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-forward-appointment',
  templateUrl: './forward-appointment.component.html',
  styleUrls: ['./forward-appointment.component.css']
})
export class ForwardAppointmentComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation> | undefined;
  selectedValue: any;
  specialisation : string[] =['general','dermatologist','surgeon']
  selectedName= "";

  constructor(private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }


  ngOnInit(): void {
  }

}