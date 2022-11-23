import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BloodBank, BloodBankName } from '../model/bloodBank.model';
import { ConfigureGenerateAndSendPerid } from '../model/configureSending.model';
import { BloodBankService } from '../services/blood-bank.service';
import { ConfigureGenerateAndSendService } from '../services/configure-sending.service';

@Component({
  selector: 'app-configure-sending-reports',
  templateUrl: './configure-sending-reports.component.html',
  styleUrls: ['./configure-sending-reports.component.css']
})
export class ConfigureSendingReportsComponent implements OnInit {

  public dataSource = new MatTableDataSource<BloodBankName>();
  
  bloodBanks:BloodBankName[]= [];
  chooseRecomended:any;
  chooseCustomDate: any;

  chooseRecomendedSending:any;
  chooseCustomDateSending:any;

  showCustom:boolean=false;
  showSendCustom:boolean=false;
  
  maxDate = new Date();
  minDate = new Date();

  

  public configureGeenerateAndSend = new ConfigureGenerateAndSendPerid();


  constructor(private bloodBankService : BloodBankService, private configureGenerateAndSendService: ConfigureGenerateAndSendService , private router: Router) { }

  groupForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    generatePeriod:new FormControl('',[Validators.required]),
    sendPeriod: new FormControl('',[Validators.required]),

  });


  ngOnInit(): void {
    (this.bloodBankService.getBloodBanks()).subscribe(res => {
      this.bloodBanks = res;
      this.dataSource.data = this.bloodBanks;
      
    })  
  }

  isRecomendedSelected(){
      this.chooseCustomDate = '';
  }

  isCustomDateSelected(){
    if(this.configureGeenerateAndSend.generatePeriod != 'CUSTOM')
      this.chooseRecomended= '';
  }

  isRecomendedSendingSelected(){
    this.chooseCustomDateSending='';
  }

  isCustomDateSendingSelected(){
    if(this.configureGeenerateAndSend.sendPeriod != 'CUSTOM')
    this.chooseRecomendedSending='';
  }

  isCustomSelected(){
    if(this.configureGeenerateAndSend.generatePeriod === 'CUSTOM')
      this.showCustom=true;
    else
      this.showCustom=false;
  }

  isSendCustomSelected(){
    if(this.configureGeenerateAndSend.sendPeriod === 'CUSTOM')
      this.showSendCustom=true;
    else
      this.showSendCustom=false;
  }


  public saveConfiguration(){
    if(this.groupForm.valid){
      this.configureGenerateAndSendService.saveConfiguration(this.configureGeenerateAndSend).subscribe(res => {

        return console.log("Configuratin is save!");
    });
  }
  }

}
