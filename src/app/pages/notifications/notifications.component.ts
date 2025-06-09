import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  messages: string[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['messages']) {
      this.messages = nav.extras.state['messages'];
    }
  }
}
