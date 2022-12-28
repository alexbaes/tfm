import { Injectable } from '@angular/core';
import { HeaderMenu } from '@app/Models/header-menu';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenuService {
  headerManagement: BehaviorSubject<HeaderMenu> =
    new BehaviorSubject<HeaderMenu>({
      showAuthSection: false,
      showNoAuthSection: true,
    });
}
