import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrieveProjectsService {
  private apiUrl = 'https://api.trakto.io/document';

  constructor(private http: HttpClient) {}

  getProjects(showAll = false): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    let params: { [param: string]: string } = {};

    if (!showAll) {
      params = { total_per_page: '10', order_orientation: 'desc' };
    }
    const result = this.http.get(this.apiUrl, { headers, params });
    return result
  }
}