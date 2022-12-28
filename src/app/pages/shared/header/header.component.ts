import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenu } from '@app/Models/header-menu';
import { HeaderMenuService } from '@app/Services/header-menu.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuth: boolean = false;
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  constructor(
    private router: Router,
    private cookies: CookieService,
    private headerMenuService: HeaderMenuService
  ) {
    this.cookies.delete('access_token');
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.headerMenuService.headerManagement.subscribe(
      (headerInfo: HeaderMenu) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  logout(): void {
    this.cookies.delete('access_token');

    const headerInfo: HeaderMenu = {
      showAuthSection: false,
      showNoAuthSection: true,
    };
    this.headerMenuService.headerManagement.next(headerInfo);

    this.router.navigateByUrl('home');
  }
}
