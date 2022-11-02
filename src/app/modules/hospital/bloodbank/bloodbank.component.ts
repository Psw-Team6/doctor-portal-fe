import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/room.service';
import { BloodbankService } from '../services/bloodbank.service';

@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.css']
})
export class BloodBankComponent implements OnInit {

  public responseStatus= "Enter your requirements!";
  public bloodType = "";
  public bloodAmount = "0";

  constructor(private bloodbankService: BloodbankService, private router: Router) { }

  ngOnInit(): void {
  }
  public checkBloodSupply() {
    if (this.isValidInput() != true) {
      return;
    }
    this.bloodbankService.checkBloodSupply(this.bloodType, this.bloodAmount).subscribe(res => {
      this.responseStatus = this.generateMessage(res);
    })
  }

  private isValidInput(): boolean {
    var re = new RegExp("^[0-9][0-9]?$|^100$");
    if (re.test(this.bloodAmount) && this.bloodType != ''){
        return true;
    }else{
      return false;
    }
  }

  private generateMessage(status: boolean){
    if (status == true){
      return "Required amount of blood is available";
    }else{
      return "Required amount of blood is NOT available";
    }
  }
}