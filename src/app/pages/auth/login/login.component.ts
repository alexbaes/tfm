import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from '@app/Models/auth.dto';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.user = new AuthDTO(0, '', '', '');

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    let token = this.authService.deleteToken();
    if (token == null) {
      const login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: (data) => {
          this.authService.setToken(data.accessToken);
          this.router.navigateByUrl('/meetings/index');
        },
        error: (err) => {
          this.error = err.error.missatge;
          console.log(err.error.missatge);
        },
      });
    }
  }
}
