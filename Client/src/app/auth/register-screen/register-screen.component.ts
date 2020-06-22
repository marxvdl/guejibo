import { Component, OnInit } from '@angular/core';

enum Display { Form, Success };

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent implements OnInit {
  DisplayEnum = Display;

  public display: Display = Display.Form;

  constructor() { }

  ngOnInit(): void {
  }

  onSuccess() {
    this.display = Display.Success;
  }

}
