export class NewsFromBloodBank {
    id: string = '';
    title: string = '';
    content: string = '';
    apiKey: string = '';
    base64image : string = '';
    newsStatus: NewsFromBloodBankStatus = NewsFromBloodBankStatus.ON_HOLD; 
    bloodBankName: string = '';


    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.title = obj.title;
            this.content = obj.content;
            this.apiKey = obj.apiKey;
            this.newsStatus = obj.newsStatus;
            this.base64image = obj.base64image;  
            this.bloodBankName = obj.bloodBankName;  
        }
    }
}

export enum NewsFromBloodBankStatus{
    ON_HOLD,
    ACTIVATED,
    REFUSED
}