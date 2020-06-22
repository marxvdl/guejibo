import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

interface NewUser {
  name: string,
  email: string,
  password1: string,
  password2: string
}

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public model: NewUser = {
    name: '',
    email: '',
    password1: '',
    password2: ''
  };

  public errorMessage: string = "";

  @Output() success = new EventEmitter();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register(
      this.model.name,
      this.model.email,
      this.model.password1
    )
      .subscribe(response => {
        if (response.success === true) {
          this.authService.logIn(response['token']);
          this.success.emit();
        }
        else {
          this.errorMessage = response['error'];
        }
      });
  }
}
