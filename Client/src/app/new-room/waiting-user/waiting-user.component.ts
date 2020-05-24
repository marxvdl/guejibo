import { Component, OnInit, Input } from '@angular/core';

export interface WaitingUser {
  name : string,
  online : boolean    
}

@Component({
  selector: 'nr-waiting-user',
  templateUrl: './waiting-user.component.html',
  styleUrls: ['./waiting-user.component.scss']
})
export class WaitingUserComponent implements OnInit {

  @Input() user : WaitingUser;
  
  constructor() { }

  ngOnInit(): void {
  }

}
