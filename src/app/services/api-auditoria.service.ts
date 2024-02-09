import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAuditoriaService {

  // Local WWA
  //url: string = 'http://localhost:43000';
  url: string = 'http://192.168.10.8:43000';

  constructor(public http: HttpClient) { }

  get(path: any) {
    return this.http.get(this.url + '/' + path);
  };

  post(path: string, body: any) {
    return this.http.post(this.url + '/' + path, body);
  }
}
