import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { UserDTO } from '@app/Models/user.dto';
import { AuthService } from '@app/Services/auth.service';
import { MeetingService } from '@app/Services/meeting.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  meeting: MeetingDTO;
  user: UserDTO;
  name: FormControl;
  attendee: FormControl;
  attendeeForm: FormGroup;

  meetingId!: string | null;

  constructor(
    private authService: AuthService,
    private meetService: MeetingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = new UserDTO('', '', '', 2, false);

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);

    this.attendee = new FormControl(this.user.attendee, Validators.required);

    this.attendeeForm = this.fb.group({
      name: this.name,
      attendee: this.attendee,
      status: 2,
    });
  }

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id');
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

  registerAttendee() {
    const register = this.attendeeForm.value;
    this.authService.register(register).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
