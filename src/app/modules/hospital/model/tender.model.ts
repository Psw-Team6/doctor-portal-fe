import {BloodType} from "src/app/api/api-reference";

export class BloodUnitAmount {
    bloodType: BloodType | undefined;
    amount: number | undefined;
}
export enum StatusTender {
Open=0,
InProcess=1,
Close=2
}

export class Tender {
    bloodUnitAmount : BloodUnitAmount []=[];
    hasDeadline : boolean = false;
    deadlineDate: Date = new Date();
    status:StatusTender|undefined


    public constructor(obj?: any) {
        if (obj) {
          this.bloodUnitAmount = obj.bloodUnitAmount;
          this.hasDeadline = obj.hasDeadline;
          this.deadlineDate = obj.deadlineDate;
          this.status=obj.status;
        }
      }
}

export class TenderWithId {
  bloodUnitAmount : BloodUnitAmount []=[];
  hasDeadline : boolean = false;
  deadlineDate: Date = new Date();
  tenderOffer : TenderOffer [] = [];
  status:StatusTender|undefined;
  winner: TenderOffer | undefined;
  id : any | undefined;


  public constructor(obj?: any) {
      if (obj) {
        this.bloodUnitAmount = obj.bloodUnitAmount;
        this.hasDeadline = obj.hasDeadline;
        this.deadlineDate = obj.deadlineDate;
        this.tenderOffer = obj.tenderOffer;
        this.status=obj.status;
        this.winner=obj.winner;
        this.id = obj.id;
      }
    }
}

export class TenderOffer {
  bloodBankName : string = "";
  realizationDate: Date = new Date();
  price: number|undefined;


  public constructor(obj?: any) {
      if (obj) {
        this.bloodBankName = obj.bloodBankName;
        this.realizationDate = obj.realizationDate;
        this.price = obj.price;
      }
    }
}


export class OrderedTenderBlood implements IOrderedTenderBlood {
  bloodType?: BloodType;
  amount?: number;
  date?: Date;
  price? : number


  constructor(data?: IOrderedTenderBlood) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.bloodType = _data["bloodType"];
      this.amount = _data["amount"];
      this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
      this.price = _data["price"];
    }
  }

  static fromJS(data: any): OrderedTenderBlood {
    data = typeof data === 'object' ? data : {};
    let result = new OrderedTenderBlood();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["bloodType"] = this.bloodType;
    data["amount"] = this.amount;
    data["date"] = this.date ? this.date.toISOString() : <any>undefined;
    data["price"] = this.price;
    return data;
  }
}

export interface IOrderedTenderBlood {
  bloodType?: BloodType;
  amount?: number;
  date?: Date;
  price?: number;
}
