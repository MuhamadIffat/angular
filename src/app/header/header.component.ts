import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { DataShareService } from '../services/data-share.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Toggle } from '../shared/toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  clearReceivedData:boolean = false;
  catLength:number = 0;
  cartData:any [] = [];
  isVisible : boolean =false;
  mobileNavVis:boolean = false;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor( private dataShareService: DataShareService, 
              private tokenStorageService: TokenStorageService) { 
    this.dataShareService.shareDataSubject.subscribe(receivedata =>{
      this.cartData= receivedata;
      this.catLength= this.cartData.length;
    });
  }

 

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
    }
  }

   //mobileNavToggle()
   mobileNavToggle():boolean{
    let widgetStatus:boolean = new Toggle(this.mobileNavVis).simpleToggle(this.mobileNavVis);
    return this.mobileNavVis = widgetStatus;
  }

   // cartToggle
   cartToggle():void {
    this.catLength = this.cartData.length;
    if(this.catLength != 0 ){
      let widgetStatus:boolean = new Toggle(this.isVisible).simpleToggle(this.isVisible);
      this.isVisible = widgetStatus;
      console.log('tidak 0')
    }else{
      this.isVisible = this.isVisible;
      console.log('0')
    }
  }

  //cartStatus()
  cartStatus(status) {
    if(status == false){
      return;
    }else{
      this.isVisible = false;
      this.cartData = [];
      this.catLength = 0;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
