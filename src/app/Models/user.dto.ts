export class UserDTO {
  id?: number;
  access_token?: string;
  name: string;
  email?: string;
  password?: string;
  status: number;
  attendee: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    status: number,
    attendee: boolean
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
    this.attendee = attendee;
  }
}
