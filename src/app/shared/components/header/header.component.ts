import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAdmin = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor() {}

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
