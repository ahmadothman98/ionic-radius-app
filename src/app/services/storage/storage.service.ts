import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  result : any;
  storage_name : string = '' ;
  constructor(private storage : Storage) {
    this.storage.create();
    this.storage_name = 'octaradius/'
    // this.storage.setEncryptionKey('password');
   }

  async get(key: string){
    return this.storage.get(this.storage_name + key)
  }
  async set(key: string, value: any){
    return this.storage.set(this.storage_name + key, value);
  }
  async remove(key : string){
    return this.storage.remove(this.storage_name + key);

  }
  async clear(){
    return this.storage.clear();
  }

}
