export class MeetingDTO {
  id!: string;
  title: string;
  place: string;
  start_date: Date;
  end_date: Date;
  slug: string;
  user_id?: string;

  constructor(
    title: string,
    place: string,
    start_date: Date,
    end_date: Date,
    slug: string
  ) {
    this.title = title;
    this.place = place;
    this.start_date = start_date;
    this.end_date = end_date;
    this.slug = slug;
  }
}

export class MeetingUserDTO {
  id: string;
  title: string;
  place: string;
  start_date: Date;
  end_date: Date;
  user_id: string;
  meeting_id: string;
  name: string;
}
