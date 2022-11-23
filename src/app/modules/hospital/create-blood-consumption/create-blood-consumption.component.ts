import { Component, OnInit } from '@angular/core';
import {BloodConsumationRequest, BloodConsumptionClient, BloodType} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserToken} from "../../../model/UserToken";

@Component({
  selector: 'app-create-blood-consumption',
  templateUrl: './create-blood-consumption.component.html',
  styleUrls: ['./create-blood-consumption.component.css']
})
export class CreateBloodConsumptionComponent implements OnInit {
  request: BloodConsumationRequest;
  userToken:UserToken;
  maxAmount = 0
  constructor(private alert: NgToastService,private readonly router:Router,private tokenStorageService:TokenStorageService,private client:BloodConsumptionClient) {
   this.request = new BloodConsumationRequest();
   this.request.bloodType = this.router.getCurrentNavigation()?.extras.state?.['data']
   this.maxAmount =  this.router.getCurrentNavigation()?.extras.state?.['p']
   this.userToken = this.tokenStorageService.getUser()
    console.log(this.maxAmount)
  }

  ngOnInit(): void {
  }

  createConsumption=()=> {
    if(this.validateFileds())
      return
    this.client.CreateConsumptions(this.userToken.id, this.request).subscribe(
      {
        next: response => {
          this.redirectToBloodUnits()
        }})
  }

  validateFileds(){
    if(this.request.amount==0 || this.request.amount == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Enter blood amount",duration:5000});
      return true;
    }
    if(this.request.amount >this.maxAmount){
      this.alert.error({detail: 'Error!',summary:"Hospital doesn't have that amount of blood unit",duration:5000});
      return true
    }
    if(this.request.purpose=="" || this.request.purpose == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Enter purpose for this request",duration:5000});
      return true;
    }
    return false
  }

  async redirectToBloodUnits(): Promise<void>{
    await this.router.navigateByUrl('/blood-units')
  }
}
