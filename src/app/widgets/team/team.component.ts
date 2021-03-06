import { Component, Input, OnInit } from '@angular/core';
import { TeamMember } from 'src/app/shared/team-member';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() emittedPrantId;
  team;
  teamArray:any[] = [];
  allTeam;
  widgetSatus:boolean = false;
  widgetParent:number = 0;
  emailStatus:boolean = true;
  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTeam(this.team);
    this.customWidgetDisplay(this.emittedPrantId,this.emailStatus);
  }
  getTeam(team):any{
    this.team = team;
    this.apiService.getUsers("https://randomuser.me/api/?results=3").subscribe(
      data => { 
        this.team = data; 
        this.team = this.team.results;
        this.resolveAfterdelay(this.widgetSatus);
        return this.team;
      },
      err => console.error(err),
      () => console.log('done loading team')
    );
  }

  setTeam(widgetSatus):boolean{
    this.widgetSatus = widgetSatus;
    this.team.map((val, index, data)=>{
      let teamMember = new TeamMember().setMember(data,index);
      console.log("new member : ", teamMember);
      this.teamArray.push(teamMember);
    });
    return this.widgetSatus = true;
  }

  resolveAfterdelay(widgetSatus) {
    this.widgetSatus = widgetSatus;
    return new Promise(resolve => {
      setTimeout(() => {
        this.setTeam(this.widgetSatus);
        resolve('resolved');
      }, 
      300);
    });
  }

  customWidgetDisplay(emittedPrantId,emailStatus):boolean{
    this.emittedPrantId = emittedPrantId;
    this.emailStatus = emailStatus;
    this.widgetParent = this.emittedPrantId;
    if(this.emittedPrantId == 0){
      this.emailStatus = true;
    }else if(this.emittedPrantId == 1){
      this.emailStatus = true;
    }else{
      this.emailStatus = false;
    }
    return this.emailStatus;
  }
}


