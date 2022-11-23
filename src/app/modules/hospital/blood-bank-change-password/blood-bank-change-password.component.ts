import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BloodBank } from '../model/bloodBank.model';
import { BloodBankService } from '../services/blood-bank.service';

@Component({
  selector: 'app-blood-bank-change-password',
  templateUrl: './blood-bank-change-password.component.html',
  styleUrls: ['./blood-bank-change-password.component.css']
})
export class BloodBankChangePasswordComponent{

  public bloodBank: BloodBank = new BloodBank()
  public name: string = '';
  public oldPass: string = '';
  public newPass: string = '';
  public confirmNewPass: string = '';
  public errorUsername: string = '';
  public errorOldPass: string = '';
  public errorNewPass: string = '';

  public changePasswordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('',[Validators.required]),
    newPassword: new FormControl('',[Validators.required]),
    repeatedNewPassword: new FormControl('',[Validators.required])
  })

  constructor(private bloodBankService: BloodBankService, private router: Router,  private alert: NgToastService) { }

  get username(){
    return this.changePasswordForm.get('name')
  }

  get oldPassword(){
    return this.changePasswordForm.get('oldPassword')
  }

  get newPassword(){
    return this.changePasswordForm.get('newPassword')
  }

  get repeatedNewPassword(){
    return this.changePasswordForm.get('repeatedNewPassword')
  }

  public changePassword() {
    this.bloodBankService.findeBloodBankByName(this.name).subscribe(result =>{
      this.bloodBank = result;
      if(result == null){
        this.errorUsername = 'Username is not valid!'
        return;
      }

      this.errorNewPass = ''
      this.errorOldPass = ''
      this.errorUsername = ''

      if(this.bloodBank.password != this.oldPass){
        this.errorOldPass = 'Password is not valid!' 
          return;
      }else if(this.newPass.length < 8){
        this.errorNewPass = 'Password must have minimum 8 characters!'
          return;
      }else if(this.newPass != this.confirmNewPass){
        this.errorNewPass = 'Passwords do not match!'
          return;
      }

      this.bloodBank.password = this.newPass;

      this.bloodBankService.updateBloodBank(this.bloodBank).subscribe(res =>{
        this.changePasswordForm.reset(this.changePasswordForm.value);
        window.location.reload();
        this.alert.success({detail: 'Success!',summary:"Password successfuly changed!",duration:5000})
      })
    });

    
  }
}
