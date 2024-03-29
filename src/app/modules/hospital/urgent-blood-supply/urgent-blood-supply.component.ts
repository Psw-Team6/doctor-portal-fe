import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BloodBankName } from '../model/bloodBank.model';
import { BloodDTOModel } from '../model/bloodDTO.model';
import { BloodBankService } from '../services/blood-bank.service';
import { UrgentBloodSupplyService } from '../services/urgent-blood-supply.service';

@Component({
  selector: 'app-urgent-blood-supply',
  templateUrl: './urgent-blood-supply.component.html',
  styleUrls: ['./urgent-blood-supply.component.css']
})
export class UrgentBloodSupplyComponent implements OnInit {

  constructor(private urgentBloodSupplyService: UrgentBloodSupplyService,private router: Router, private alert: NgToastService) { }

  urgentBloodSupplyRequest: BloodDTOModel= new BloodDTOModel();
  
  ngOnInit(): void {
  }

  groupForm= new FormGroup({
    bloodType:new FormControl('',[Validators.required]),
    bloodQuantity: new FormControl('',[Validators.required])
  });


  public sendRequestForUrgentSupply(){
    if(this.groupForm.valid){
      this.urgentBloodSupplyService.sendRequestForUrgentBloodSupply(this.urgentBloodSupplyRequest).subscribe(res => {
        this.alert.success({detail: 'Success!',summary:"Request successfully sent!",duration:5000})
        return console.log("Request for urgent blood is send!");
    });
  }
  }

}
