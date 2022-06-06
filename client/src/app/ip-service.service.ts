import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {

  constructor(private http: HttpClient) { }

  getIpAddress(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>("http://api.ipify.org/?format=json");
  }
}
