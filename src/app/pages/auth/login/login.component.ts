import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public message = '';
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // login(): void {
  //   const login = this.loginForm.value;
  //   this.authService.login(login).subscribe(
  //     (resp) => {
  //       console.log('Successfully logged in');
  //     },
  //     (err) => {
  //       console.error('Error logging in', err);
  //     }
  //   );
  // }

  login(): void {
    const login = this.loginForm.value;
    this.authService.login(login).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
