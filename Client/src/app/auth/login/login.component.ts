import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model = {
    email: '',
    password: ''
  };
  public errorMessage: string = "";
  @Output() success = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      response => {
        if (response.success === true) {
          this.authService.setupUserWithToken(response['token']);
          this.success.emit();
          this.router.navigate(['/']);
        }
        else {
          this.errorMessage = response['error'];
        }
      }
    );
  }

}
