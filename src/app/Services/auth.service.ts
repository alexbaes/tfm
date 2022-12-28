import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO } from '@app/Models/auth.dto';
import { UserDTO } from '@app/Models/user.dto';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: AuthDTO): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', user);
  }

  register(user: UserDTO): Observable<any> {
    return this.http.post('http://localhost:8000/api/register', user);
  }
  setToken(token: string) {
    this.cookies.set('access_token', token);
  }
  getToken() {
    return this.cookies.get('access_token');
  }
}
