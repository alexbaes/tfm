import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { MeetingService } from '@app/Services/meeting.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id!: string;
  message: string = '';
  meeting: MeetingDTO;
  title: FormControl;
  description!: FormControl;
  place: FormControl;
  start_date: FormControl;
  end_date: FormControl;
  slug: FormControl;

  meetingForm: FormGroup;

  private meetingId: string;

  constructor(
    private meetService: MeetingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.meeting = new MeetingDTO('', '', new Date(), new Date(), '');

    this.title = new FormControl(this.meeting.title, [Validators.required]);
    this.place = new FormControl(this.meeting.place, [Validators.required]);
    this.start_date = new FormControl(
      formatDate(this.meeting.start_date, 'dd-MM-yyyy hh:mm', 'en'),
      [Validators.required]
    );
    this.end_date = new FormControl(
      formatDate(this.meeting.end_date, 'dd-MM-yyy hh:mm', 'en'),
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.meetService.getMeetingById(this.id).subscribe({
      next: (data) => {
        this.meeting = data;
        this.meetingForm.setValue({
          title: this.meeting.title,
          place: this.meeting.place,
          start_date: this.meeting.start_date,
          end_date: this.meeting.end_date,
          slug: this.meeting.slug,
        });
        console.log(data);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  editMeeting(): void {
    const meeting = this.meetingForm.value;
    this.meetService.updateMeeting(this.id, meeting).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/meetings/index');
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  reset() {
    this.meetingForm.reset();
  }
}
