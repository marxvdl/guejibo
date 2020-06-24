import { Component, OnInit, Input } from '@angular/core';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() showLogo: boolean = true;
  loggedIn: boolean = null;
  user: User;

  testMessage:string = 'yalala';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.initTopbarReference(this);
    this.updateLoggedInStatus();
  }

  updateLoggedInStatus(){
    if(this.loggedIn = this.authService.isLoggedIn()){
      this.user = this.authService.getLoggedInUser();
    }
  }

}