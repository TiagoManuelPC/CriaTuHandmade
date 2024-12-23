import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/.netlify/functions/database'; // Serverless function URL

  constructor(private http: HttpClient) {}

  getData(collectionName: any): Observable<any> {
    const url = `${this.baseUrl}/${collectionName}`
    return this.http.get<any>(url);
  }

  addData(collectionName: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/${collectionName}`;
    return this.http.post<any>(url, data);
  }
}