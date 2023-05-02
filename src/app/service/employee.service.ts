import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private baseUrl = 'https://tuliphr.azurewebsites.net/api/employees';
  private baseUrl = 'https://localhost:7265/api/employees';
  constructor(private _http: HttpClient) { }

  create(employee: any): Observable<any> {
    return this._http.post(`${this.baseUrl}`, employee);
  }

  update(id: number, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, data);
  }

  getAll(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
}
