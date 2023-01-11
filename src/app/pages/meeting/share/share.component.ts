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
  url: string | null;
  successMsg: boolean = false;
  message: string = '';

  constructor(
    private meetService: MeetingService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.user = new UserDTO('', '', '', 2, true);

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);

    this.attendee = new FormControl(this.user.attendee, Validators.required);

    this.attendeeForm = this.fb.group({
      name: this.name,
      status: 2,
      attendee: this.attendee,
    });
  }

  ngOnInit(): void {
    this.meetingId = this.route.snapshot.paramMap.get('id');
    this.meetService.getMeetingById(this.meetingId).subscribe({
      next: (data) => {
        this.meeting = data;
        // console.log(this.meeting);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  registerAttendee() {
    const register = this.attendeeForm.value;

    if (!register.attendee) {
      console.log(register.name + ' no assistirà');
    } else {
      this.meetService.registerUser(register, this.meetingId).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    }
    this.message = 'Formulari enviat, gràcies !';
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2500);
  }
}
