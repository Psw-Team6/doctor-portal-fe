import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgentBloodSupplyService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  sendRequestForUrgentBloodSupply(urgentBloodSupplyRequest: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/v1/UrgentBloodSupply', urgentBloodSupplyRequest, {headers: this.headers});
  }
}
