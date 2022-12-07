import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { EquipmentMovementAppointmentResponse, EquipmentMovementAppointmentRequest } from 'src/app/api/api-reference';


const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':'aplication/json'
  })

}



@Injectable({
  providedIn: 'root'
})
export class EquipmentMovementService {
  private aplUrl = 'http://localhost:5000/api/v1/EquipmentMovementAppointment'
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); ///dodato

  constructor(private http:HttpClient) { }

  create(request:EquipmentMovementAppointmentResponse): Observable<any>{

    console.log(request)
    const url = `${this.aplUrl}`
    return this.http.post<EquipmentMovementAppointmentResponse>(url,request)
  }

  getAvailableByRequest(request:EquipmentMovementAppointmentRequest) : Observable<any>
  {
    console.log(request)
    const url = `${this.aplUrl}`
    return this.http.post<EquipmentMovementAppointmentResponse>(url+"/getAvailable",request)
  }


  getEquipmentMovementAppointmentById(id:string): Observable<EquipmentMovementAppointmentResponse[]>{
    return this.http.get<EquipmentMovementAppointmentResponse[]>(this.aplUrl + id,{headers: this.headers});

  }


}

