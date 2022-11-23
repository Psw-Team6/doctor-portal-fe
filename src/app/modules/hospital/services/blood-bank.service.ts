import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodBank, BloodBankName } from '../model/bloodBank.model';

@Injectable({
  providedIn: 'root'
})
export class BloodBankService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createBloodBank(bloodBank: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/bloodBank', bloodBank, {headers: this.headers});
  }

  findeBloodBankByName(name: string): Observable<BloodBank> {
    return this.http.get<BloodBank>(this.apiHost + 'api/bloodBank/findByName/' + name, {headers: this.headers});
  }

  updateBloodBank(bloodBank: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/bloodBank/' + bloodBank.id, bloodBank, {headers: this.headers});
  }


  public getBloodBanks(): Observable<BloodBankName[]> {
    return this.http.get<BloodBankName[]>(this.apiHost + 'api/bloodbank/bloodBankName', {headers: this.headers});
  }
}
