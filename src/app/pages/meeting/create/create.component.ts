import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { MeetingService } from '@app/Services/meeting.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [DatePipe],
})
export class CreateComponent implements OnInit {
  message: string = '';

  meeting: MeetingDTO;
  title: FormControl;
  description!: FormControl;
  place: FormControl;
  start_date: FormControl;
  end_date: FormControl;
  slug: FormControl;
  meetingForm: FormGroup;

  constructor(
    private meetService: MeetingService,
    public router: Router,
    private fb: FormBuilder
  ) // private datePipe: DatePipe
  {
    this.meeting = new MeetingDTO('', '', new Date(), new Date(), '');

    this.title = new FormControl(this.meeting.title, [Validators.required]);
    this.place = new FormControl(this.meeting.place, [Validators.required]);
    this.start_date = new FormControl(
      formatDate(this.meeting.start_date, 'dd-MM-yyyy h:mm', 'en'),
      [Validators.required]
    );
    this.end_date = new FormControl(
      formatDate(this.meeting.end_date, 'dd-MM-yyyy h:mm', 'en'),
      [Validators.required]
    );
    this.slug = new FormControl(this.meeting.slug, [Validators.required]);

    this.meetingForm = this.fb.group({
      title: this.title,
      place: this.place,
      start_date: this.start_date,
      end_date: this.end_date,
      slug: this.slug,
    });
  }

  ngOnInit(): void {}

  createMeeting() {
    const meeting = this.meetingForm.value;

    this.meetService.createMeeting(meeting).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/meetings/index');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
