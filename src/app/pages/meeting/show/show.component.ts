import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { UserDTO } from '@app/Models/user.dto';
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
  meetingId!: string | null;

  constructor(
    private userService: UserService,
    private meetService: MeetingService,
    private route: ActivatedRoute
  ) {
    this.meetingId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: UserDTO[]) => {
      this.users = data;
      console.log(this.users);
    });

    this.meetService.getMeetingById(this.meetingId).subscribe({
      next: (data) => {
        this.meeting = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
