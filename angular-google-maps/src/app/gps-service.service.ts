import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsServiceService {

  constructor( private httpClient: HttpClient) {}
  private urlHost = 'http://localhost:4949/getdata';
  // getData(): Promise<any> {
  //   return this.httpClient.get('https://jsonplaceholder.typicode.com/posts/1').toPromise();
  // }
  postData(reqJson: any): Promise<any>{
    return this.httpClient.post(this.urlHost, reqJson).toPromise();
  }

}
