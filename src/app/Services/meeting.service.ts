import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { UserDTO } from '@app/Models/user.dto';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:8000/api/meetings/';
  }

  registerUser(user: UserDTO, meetingId: string | null): Observable<any> {
    return this.http.post(this.urlApi + meetingId, user);
  }

  getMeetings(): Observable<MeetingDTO[]> {
    return this.http
      .get<MeetingDTO[]>(this.urlApi)
      .pipe(catchError(this.errorHandler));
  }

  getMeetingById(meetingId: string | null): Observable<MeetingDTO> {
    return this.http
      .get<MeetingDTO>(this.urlApi + meetingId)
      .pipe(catchError(this.errorHandler));
  }

  createMeeting(meeting: MeetingDTO): Observable<MeetingDTO> {
    return this.http.post<MeetingDTO>(this.urlApi, meeting);
  }

  updateMeeting(meetingId: string, meeting: MeetingDTO): Observable<any> {
    return this.http
      .put<MeetingDTO>(this.urlApi + meetingId, meeting)
      .pipe(catchError(this.errorHandler));
  }

  deleteMeeting(meetingId: string): Observable<any> {
    return this.http
      .delete<MeetingDTO>(this.urlApi + meetingId)
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
