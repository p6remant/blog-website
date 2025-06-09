import { Component, Input } from '@angular/core';
import { NotificationService } from './core/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-blog';
  currentYear: number = new Date().getFullYear();
  notificationLength: number = 0;
  messages: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notificationCount$.subscribe(
      (count) => (this.notificationLength = count)
    );

    this.notificationService.messages$.subscribe(
      (messages) => (this.messages = messages)
    );
    console.log(this.messages);
  }
}
