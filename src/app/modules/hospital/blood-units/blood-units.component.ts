import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserToken} from "../../../model/UserToken";
import {
  BloodConsumption,
  BloodConsumptionClient,
  BloodType,
  BloodUnitClient,
  BloodUnitDto
} from "../../../api/api-reference";
import {Router} from "@angular/router";


@Component({
  selector: 'app-blood-units',
  templateUrl: './blood-units.component.html',
  styleUrls: ['./blood-units.component.css']
})
export class BloodUnitsComponent implements OnInit {
  bloodUnitsSum:BloodUnitDto[]=[]
  consumptions:BloodConsumption[]=[]
  userToken:UserToken;
  displayedColumns: string[] = ['Type','Amount','Request','Reduce'];
  displayedColumnsConsumptions: string[] = ['Type','Amount','Date','Purpose'];
  constructor(private tokenStorageService:TokenStorageService, private client: BloodUnitClient,private readonly router:Router,private clientConsumption: BloodConsumptionClient) {
    this.userToken = this.tokenStorageService.getUser();
    console.log(this.userToken)
  }

  ngOnInit(): void {
    this.getUnits()
    this.getConsumptions()
  }

  private readonly getUnits=()=> {
    this.client.getUnits().subscribe(
      {
        next: response => {
          this.bloodUnitsSum = response;
          console.log(this.bloodUnitsSum)
        }})
  }

  private readonly getConsumptions=()=> {
    this.clientConsumption.getDoctorConsumptions(this.userToken.id).subscribe(
      {
        next: response => {
          this.consumptions = response;
          console.log(this.consumptions)
        }})
  }

   async createBloodRequest(t:BloodType): Promise<void>{
    await this.router.navigateByUrl('/create-blood-request', {
      state: {data:t}
    })
  }

  async createBloodConsumption(t:BloodType,maxAmount:number): Promise<void>{
    await this.router.navigateByUrl('/create-blood-consumption', {
      state: {data:t, p:maxAmount}
    })
  }

  BloodTypeString(bloodType: any) {
    return BloodType[bloodType]
  }

  formatDate = (date:any) => {
    let d = new Date(date)
    return `${d.getMonth().toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
  }

}
