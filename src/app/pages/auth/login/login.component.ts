import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    // const userData = {
    //   email: 'eric@gmail.com',
    //   password: '123456789',
    // };

    // this.authSvc.login(userData).subscribe((res) => console.log('Login'));

    const user = { email: this.email, pasword: this.password };

    this.authSvc.login(user).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
