import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodRequest } from '../model/bloodRequest.model';
import { BloodRequestWithBloodBank } from '../model/bloodRequestWithBloodBank';
import { BloodSupply } from '../model/bloodSupplay.model';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getBloodRequests(): Observable<BloodRequest[]> {
    return this.http.get<BloodRequest[]>(this.apiHost + 'api/BloodRequest', {headers: this.headers});
  }

  getBloodRequestsOnPending(): Observable<BloodRequest[]> {
    return this.http.get<BloodRequest[]>(this.apiHost + 'api/BloodRequest/pending', {headers: this.headers});
  }

  confirmRequest(request:BloodRequest, bbName: string): Observable<BloodSupply>{
    return this.http.put<BloodSupply>(this.apiHost + 'api/BloodRequest/sendBloodRequest/'+ bbName, request, {headers: this.headers})
  }
  declineRequest(request:BloodRequest): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/BloodRequest/update',request, {headers: this.headers})
  }
  returnRequest(request:BloodRequest): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/BloodRequest/update',request, {headers: this.headers})
  }
}