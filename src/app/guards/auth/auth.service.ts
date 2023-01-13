import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn : boolean ;
  
  constructor(public storage : StorageService) {
    this.isAuthenticated();
   }

async isAuthenticated()  {
    await this.storage.get('data').then((data) => {

      
      if(data && data.jwt && data.jwt.length > 10){
          this.isLoggedIn = true;
                    
      }
      else{
          this.isLoggedIn = false;
      }
    })
    return this.isLoggedIn ;
    
  }
}
