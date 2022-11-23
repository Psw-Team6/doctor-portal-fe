import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsFromBloodBank } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsFromBloodBank[]> {
    return this.http.get<NewsFromBloodBank[]>(this.apiHost + 'api/news', {headers: this.headers});
  }

  updateNews(news: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/news/' + news.id, news, {headers: this.headers});
  }
}
