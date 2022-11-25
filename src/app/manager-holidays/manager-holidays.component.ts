import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-holidays',
  templateUrl: './manager-holidays.component.html',
  styleUrls: ['./manager-holidays.component.css']
})
export class ManagerHolidaysComponent implements OnInit {
holidays: CdkTableDataSourceInput<any> | undefined;
getDateFormat(arg0: any) {
throw new Error('Method not implemented.');
}
getStatus(arg0: any) {
throw new Error('Method not implemented.');
}
canCancel(_t58: any) {
throw new Error('Method not implemented.');
}
cancleHoliday(arg0: any) {
throw new Error('Method not implemented.');
}
displayedColumns: any;

  constructor() { }

  ngOnInit(): void {
  }

}
