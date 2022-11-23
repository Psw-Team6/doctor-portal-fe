
export class ConfigureGenerateAndSendPerid {
    bloodBankName: string = '';
    generatePeriod: string = '';
    sendPeriod: string= '';

    public constructor(obj?: any) {
        if (obj) {
            this.bloodBankName=obj.bloodBankName;
            this.generatePeriod=obj.generatePeriod;
            this.sendPeriod=obj.sendPeriod;
        }
    }
}
