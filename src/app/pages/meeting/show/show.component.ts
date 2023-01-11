import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { UserDTO } from '@app/Models/user.dto';
import { PopUpComponent } from '@app/pages/shared/pop-up/pop-up.component';
import { MeetingService } from '@app/Services/meeting.service';
import { UserService } from '@app/Services/user.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  users: UserDTO[] = [];
  meeting: MeetingDTO;
  meetingId: string | null;
  attendeeList: UserDTO[] = [];
  noAttendeeList: UserDTO[] = [];
  numberAttendee: number = 0;
  numberNoAttendee: number = 0;
  url: string;

  constructor(
    private userService: UserService,
    private meetService: MeetingService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.meetingId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.meetService.getMeetingById(this.meetingId).subscribe({
      next: (meeting) => {
        this.meeting = meeting;
        console.log("Info de l'esdeveniment" + this.meeting);
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.userService.getUsersByMeeting(this.meetingId).subscribe({
      next: (users) => {
        this.users = users;

        this.users.forEach((user) => {
          if (!user.attendee) {
            this.noAttendeeList.push(user);
            this.numberNoAttendee = this.numberNoAttendee + 1;
            console.log('No assistirà: ' + user.name);
          }
          if (user.attendee) {
            this.attendeeList.push(user);
            this.numberAttendee = this.numberAttendee + 1;
            console.log('Assistirà ' + user.name);
          }
        });
      },
    });
  }

  openDialog(): void {
    this.url = `http://localhost:4200/meetings/share/${this.meetingId}`;

    this.dialog.open(PopUpComponent, {
      width: '360px',
      height: '200px',
      data: this.url,
    });

    navigator.clipboard.writeText(this.url).then(
      function () {
        console.log('Copied!');
      },
      function () {
        console.log('Copy error');
      }
    );
  }
}
