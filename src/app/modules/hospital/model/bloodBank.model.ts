import { BloodBankChangePasswordComponent } from "../blood-bank-change-password/blood-bank-change-password.component";

export class BloodBank {
    id: number = 0;
    name: string = '';
    serverAddress: string = '';
    email: string = '';
    password: string = '';

    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.serverAddress = obj.serverAddress;
            this.email = obj.email;
            this.password = obj.password;
        }
    }
}

export class BloodBankName {
    name: string = '';

    public constructor(obj?: any) {
        if (obj) {
            this.name = obj.name;
        }
    }
}


