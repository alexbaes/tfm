import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '@app/Models/user.dto';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:8000/api/users/';
  }

  getUsersByMeeting(meetingId: string | null): Observable<UserDTO[]> {
    return this.http
      .get<UserDTO[]>(this.urlApi + meetingId)
      .pipe(catchError(this.errorHandler));
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http
      .get<UserDTO[]>(this.urlApi)
      .pipe(catchError(this.errorHandler));
  }

  getUserById(userId: string | null): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlApi + userId)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error('test'));
  }
}
