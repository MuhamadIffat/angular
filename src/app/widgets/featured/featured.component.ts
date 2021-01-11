import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Slide } from 'src/app/shared/slide';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featured;
  sliderSecRow;
  sliderFirstRow;
  firstRowStatus:boolean;
  secRowStatus:boolean;
  flag:number;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.firstRowStatus = false;
    this.secRowStatus = false;
    this.flag = 4;
    this.getFeaturedsData(this.firstRowStatus, this.secRowStatus);
  }

  getFeaturedsData(firstRowStatus,secRowStatus):void{
    this.apiService.getBooks().subscribe(
      data => { 
        this.featured = data;
        this.sliderFirstRow = new Slide().setFirstRow(this.featured,this.sliderFirstRow,this.flag);
        this.sliderSecRow = new Slide().setSecondRow(this.featured,this.sliderSecRow,this.flag);
        this.firstRowStatus = !firstRowStatus;
        this.secRowStatus = secRowStatus;
      },
      err => console.error(err),
      () => {console.log('done loading featureds');}
    );
  }
  setWidgetStatus(firstRowStatus,secRowStatus){
    this.firstRowStatus = firstRowStatus;
    this.secRowStatus = secRowStatus;
    console.log("firstRowStatus : ",this.firstRowStatus);
    console.log("secRowStatus : ",this.secRowStatus);
    if(this.firstRowStatus == true){
      this.firstRowStatus = false;
      this.secRowStatus = true;
    }else{
      this.firstRowStatus = true;
      this.secRowStatus = false;
    }
  }

}
