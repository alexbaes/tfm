import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingDTO } from '@app/Models/meeting.dto';
import { MeetingService } from '@app/Services/meeting.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  meetings: MeetingDTO[] = [];
  displayedColumns: string[] = ['title', 'actions'];
  url: string;

  constructor(private meetService: MeetingService, private router: Router) {}

  ngOnInit(): void {
    this.meetService.getMeetings().subscribe((data: MeetingDTO[]) => {
      this.meetings = data;
      console.log(this.meetings);
    });
  }

  shareMeeting(id: string) {
    this.url = `http://localhost:4200/meetings/share/${id}`;
    navigator.clipboard.writeText(this.url).then(
      function () {
        console.log('Copied!');
      },
      function () {
        console.log('Copy error');
      }
    );

    alert('Url copiada ! ' + this.url);
  }

  createMeeting(): void {
    this.router.navigateByUrl('/meetings/create');
  }

  updateMeeting(id: string): void {
    this.router.navigateByUrl('/meetings/edit/' + id);
  }

  showMeeting(id: string): void {
    this.router.navigateByUrl('/meetings/show/' + id);
  }

  deleteMeeting(id: string) {
    this.meetService.deleteMeeting(id).subscribe((res) => {
      this.meetings = this.meetings.filter((item) => item.id !== id);
      console.log('Meeting deleted successfully!');
    });
  }
}
