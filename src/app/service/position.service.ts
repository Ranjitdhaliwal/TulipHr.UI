import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private baseUrl = 'https://tuliphr.azurewebsites.net/api/positions';
  //private baseUrl = 'https://localhost:7265/api/positions';

  constructor(private _http: HttpClient) { }
    
  getTree(): Observable<any> {
    return this._http.get(`${this.baseUrl}/hierarchy`);
  }
}
