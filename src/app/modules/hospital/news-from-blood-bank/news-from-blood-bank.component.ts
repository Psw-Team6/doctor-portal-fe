import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NewsFromBloodBank, NewsFromBloodBankStatus } from '../model/news.model';
import { NewsService } from '../services/news.service';


@Component({
  selector: 'app-news-from-blood-bank',
  templateUrl: './news-from-blood-bank.component.html',
  styleUrls: ['./news-from-blood-bank.component.css']
})
export class NewsFromBloodBankComponent implements OnInit {

  public dataSource = new MatTableDataSource<NewsFromBloodBank>();
  public displayedColumns = ['Image', 'Blood bank', 'Title', 'Content', 'publish', 'archive'];
  public news: NewsFromBloodBank[] = [];
  public new: NewsFromBloodBank = new NewsFromBloodBank();
  public isNewsEmpty: boolean = false;

  constructor(private newsService: NewsService, private router: Router,  private alert: NgToastService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(res => {
      this.news = res;
      this.dataSource.data = res;
      if(this.news.length == 0){
        this.isNewsEmpty = true;
      }
      this.new = this.news[1];
    })
  }

  public updateNews(news: NewsFromBloodBank, status: NewsFromBloodBankStatus){
    news.newsStatus = status;
    this.newsService.updateNews(news).subscribe(res => {
      this.newsService.getNews().subscribe(res =>{
        this.dataSource.data = res;
        if(res.length == 0){
          this.isNewsEmpty = true;
        }
        this.alert.success({detail: 'Success!',summary:"News status successfuly changed!",duration:5000})
      })
    })
  }
}
