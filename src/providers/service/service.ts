import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  header:any;
  options:any;

  constructor(public http: Http) {
    this.header = new Headers();
    this.header.append('Accept', 'application/json');
    this.header.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.header });
  }

  goService(){
    var link = ""; 
    return this.http.get(link,this.options).pipe(map((res) => res.json()));
  }

}
