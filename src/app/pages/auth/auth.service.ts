import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_ENDPOINT = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // login(user: User): Observable<any> {
  //   return this.http.post(`${this.API_ENDPOINT}/login`, user).pipe(
  //     map((resp: any) => {
  //       console.log('Loggin correcte');
  //       // this.userStore.token = resp.token;
  //       // return resp;
  //     })
  //   );
  // }

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', user);
  }
}
