export class PatientAdmissionRequestModel {
  patientId: string = '';
  reason: string = '';
  dateOfAdmission: Date = new Date();

  public constructor(obj?: any) {
    if (obj) {
      this.patientId = obj.patientId;
      this.reason = obj.reason;
      this.dateOfAdmission = obj.dateOfAdmission;
    }
  }
}
