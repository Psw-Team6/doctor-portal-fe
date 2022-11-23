import {BloodType} from "../../../api/api-reference";

export class BloodRequest {
  type: BloodType | undefined;
  amount: number | undefined;
  reason: string = '';
  date: Date = new Date();
  doctor: string = '';
  status: string ='';
  bankComment: string = '';
  public constructor(obj?: any) {
    if (obj) {
      this.type = obj.type;
      this.amount = obj.amount;
      this.reason = obj.reason;
      this.date = obj.date;
      this.doctor = obj.doctor;
      this.status = obj.status;
      this.bankComment = obj.bankComment;
    }
  }
}
