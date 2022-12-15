import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tender, TenderWithId } from '../model/tender.model';
import { TenderService } from '../services/tender.services';

@Component({
  selector: 'view-all-tenders.component',
  templateUrl: './view-all-tenders.component.html',
  styleUrls: ['./view-all-tenders.component.css']
})
export class AllTendersComponent implements OnInit {

  public dataSource = new MatTableDataSource<TenderWithId>();
  public displayedColumns = ['status', 'deadline', 'details'];
  public tenders: TenderWithId[] = [];

  constructor(private tenderService: TenderService, private router: Router) { }

  ngOnInit(): void {
    this.tenderService.getAll().subscribe(res => {
      this.tenders = res;
      this.dataSource.data = this.tenders;
    })
  }

  public tenderDetails(id: number) {
    this.router.navigate(['/view-tender', id]);
  }

  public statusToString(status:number){
    if (status == 0){
        return "OPEN";
    }else if (status == 1){
        return "IN PROCESS";
    }else if (status == 2){
        return "CLOSED";
    }else{
        return "UNKNOWN";
    }
}

}