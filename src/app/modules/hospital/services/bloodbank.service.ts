import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { BloodBank } from '../model/bloodBank.model';
import { BloodSupply } from '../model/bloodSupplay.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BloodbankService {

  apiHost: string = 'http://localhost:5001/';
  bloodSupply: BloodSupply = new BloodSupply();
  bloodSupplySub: Subscription = new Subscription;

  headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }

   checkBloodSupply(bloodType:string, bloodAmount:string): Observable <BloodSupply> {
    return this.http.get<BloodSupply>(this.apiHost + 'api/bloodbank/bloodSupply/'+ bloodType + '/'+ bloodAmount, { headers: this.headers }); 
  }

}
