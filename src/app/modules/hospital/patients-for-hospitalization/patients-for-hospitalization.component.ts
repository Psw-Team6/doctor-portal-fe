import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientClient, PatientResponse} from "../../../api/api-reference";

@Component({
  selector: 'app-patients-for-hospitalization',
  templateUrl: './patients-for-hospitalization.component.html',
  styleUrls: ['./patients-for-hospitalization.component.css']
})
export class PatientsForHospitalizationComponent implements OnInit {

  @Output() onSelectedPatient: EventEmitter<string> = new EventEmitter()
  selectedItem: PatientResponse
  patients:PatientResponse[]=[]

  constructor(private client: PatientClient) {
    this.selectedItem = new PatientResponse()
  }

  ngOnInit(): void {
    this.client.getAllPatients().subscribe(
      {
        next: response => {
          this.patients = response
          //console.log(this.patients)
        }
      }
    )
  }
  public selectedPatient(value: string){
    this.onSelectedPatient.emit(value)
  }

}

