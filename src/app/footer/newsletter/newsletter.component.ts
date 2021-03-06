import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletterFormArray;
  newsletterArray:string = "newsletterFormArray"
  constructor( private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  newsletterForm = new FormGroup({
    inputNewsletter: new FormControl('',[Validators.required])
  });
  onSubmit(newsletterFormArray):any { 
    if(this.newsletterForm.value.length === 0){
      alert("le champs est vide.");
      return;
    }else{
      this.newsletterFormArray = newsletterFormArray;
      this.newsletterArray = this.newsletterArray;
      let insDate:any = new Date();
      insDate = insDate.getDate() + "/" + insDate.getMonth() + "/" +insDate.getFullYear();
      let flag:boolean = true;
      this.newsletterFormArray = {
        "email" : this.newsletterForm.value,
        "insDate" : insDate,
        "flag" : flag
      };
      this.localStorageService.setLocalstorage(this.newsletterFormArray,this.newsletterArray);
      this.newsletterForm.reset();
      return this.newsletterFormArray = {};
    }

  }

}
