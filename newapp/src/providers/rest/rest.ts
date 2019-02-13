import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://localhost:3000';

  header:any={
    'Content-Type':'application/json'
    
  }
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getCategories() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/categories').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/signup', JSON.stringify(data), {headers: this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  loginUser(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/signup/login', JSON.stringify(data), {headers: this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  sendCount(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/chant', JSON.stringify(data), {headers: this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  showCount(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/chant/count', JSON.stringify(data), {headers: this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
