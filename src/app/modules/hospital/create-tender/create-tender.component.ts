import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { BloodUnitAmount, Tender } from '../model/tender.model';
import { TenderService } from '../services/tender.services';
@Component({
  selector: 'app-create-tender',
  templateUrl: './create-tender.component.html',
  styleUrls: ['./create-tender.component.css']
})
export class CreateTenderComponent implements OnInit {
  public dataSource = new MatTableDataSource<Tender>();
    tender : Tender;
    amountApos: BloodUnitAmount = new BloodUnitAmount;
    amountAneg : BloodUnitAmount = new BloodUnitAmount;
    amountBpos : BloodUnitAmount = new BloodUnitAmount;
    amountBneg : BloodUnitAmount = new BloodUnitAmount;
    amountABpos : BloodUnitAmount = new BloodUnitAmount;
    amountABneg : BloodUnitAmount = new BloodUnitAmount;
    amountOpos : BloodUnitAmount = new BloodUnitAmount;
    amountOneg : BloodUnitAmount = new BloodUnitAmount;
    blodAmounts: BloodUnitAmount[] = [];
    todayDate: Date;
    date:any;
    hasDeadlineOption :string='';


  constructor(private alert: NgToastService,private readonly router:Router,private tokenStorageService:TokenStorageService, private service:TenderService) {
    this.tender = new Tender();
    this.todayDate = new Date();
  }


  ngOnInit(): void {
    this.amountApos.bloodType=0;
    this.amountAneg.bloodType=1;
    this.amountBpos.bloodType=2;
    this.amountBneg.bloodType=3;
    this.amountABpos.bloodType=4;
    this.amountABneg.bloodType=5;
    this.amountOpos.bloodType=6;
    this.amountOneg.bloodType=7;
  }

  hasDeadline() {
   if (this.hasDeadlineOption==="HAS_DEADLINE")
      this.tender.hasDeadline=true;
   else
      this.tender.hasDeadline=false;
  }

  noDeadline(){
    if (this.hasDeadlineOption==="NO_DEADLINE")
    this.tender.hasDeadline=false;
 else
    this.tender.hasDeadline=true;
  }


  createTender() {
    if (this.hasDeadlineOption==="HAS_DEADLINE")
    this.tender.hasDeadline=true;
 else
    this.tender.hasDeadline=false;
    if (this.tender.hasDeadline)
      this.tender.deadlineDate=new Date (new Date(this.date).getFullYear(),new Date(this.date).getMonth(),new Date(this.date).getDay());
    else
    this.tender.deadlineDate=this.todayDate;
      if(this.validateFields())
      return


    this.tender.bloodUnitAmount.push(this.amountApos);
    this.tender.bloodUnitAmount.push(this.amountAneg);
    this.tender.bloodUnitAmount.push(this.amountBpos);
    this.tender.bloodUnitAmount.push(this.amountBneg);
    this.tender.bloodUnitAmount.push(this.amountABpos);
    this.tender.bloodUnitAmount.push(this.amountABneg);
    this.tender.bloodUnitAmount.push(this.amountOpos);
    this.tender.bloodUnitAmount.push(this.amountOneg);


      this.service.create(this.tender).subscribe(res => {
        this.alert.success({detail: 'Success!',summary:"Tender created!",duration:5000})

      })
    }


    private validateFields() {
      if((this.amountApos?.amount==0 || this.amountApos?.amount == undefined) &&
      (this.amountAneg?.amount==0 || this.amountAneg?.amount == undefined) &&
      (this.amountBpos?.amount==0 || this.amountBpos?.amount == undefined) &&
      (this.amountBneg?.amount==0 || this.amountBneg?.amount == undefined) &&
      (this.amountABpos?.amount==0 || this.amountABpos?.amount == undefined) &&
      (this.amountABneg?.amount==0 || this.amountABneg?.amount == undefined) &&
      (this.amountOpos?.amount==0 || this.amountOpos?.amount == undefined) &&
      (this.amountOneg?.amount==0 || this.amountOneg?.amount == undefined)
      )
      {
        this.alert.error({detail: 'Error!',summary:"Enter blood amount",duration:5000});
        return true;
      }
      if (this.hasDeadlineOption==='') {
        this.alert.error({detail: 'Error!',summary:"Enter tender deadline",duration:5000});
        return true;
      }


      if(this.tender.hasDeadline)
          if(this.date == undefined)
          {
            this.alert.error({detail: 'Error!',summary:"Select date",duration:5000});
            return true;
          }
      return false;
    }
}
