import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client';
  user = { name: '' };
  loggedIn = false;

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      let user = params['user'];

      if (token && user) {
        this.authService.setUser({ name: user });
        this.authService.setupUserWithToken(token);
        this.loggedIn = true;
      }
    });
  }

  showLogo(): boolean {
    return this.router.url != '/';
  }
}
