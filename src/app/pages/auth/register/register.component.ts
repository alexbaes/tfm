import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from '@app/Models/user.dto';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: UserDTO;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  registerForm: FormGroup;

  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new UserDTO('', '', '', 1, true);

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.registerForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password,
      status: 1,
      attendee: true,
    });
  }

  register(): void {
    const register = this.registerForm.value;
    this.authService.register(register).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err.error);

        if (err.error.errors.email) {
          this.error = 'Email ja utilitzat';
        }
      },
    });
  }
}
