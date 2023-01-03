import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  async post(url: string , headers : any, data? : any){
    const options = {
      url: url,
      headers: headers,
      data: data,
    };
    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;

  }

  getHeaders(auth: string = ''){
    let headers ={
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': auth,
        };
        return headers;
  }
  constructor() { }
}
