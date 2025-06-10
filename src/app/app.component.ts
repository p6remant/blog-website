import { Component, Input } from '@angular/core';
import { NotificationService } from './core/services/notification/notification.service';
import { LoginService } from './core/services/login/login.service';

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
  isLoggedIn: boolean = false;
  userAvatar: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.notificationService.notificationCount$.subscribe(
      (count) => (this.notificationLength = count)
    );

    this.notificationService.messages$.subscribe(
      (messages) => (this.messages = messages)
    );
    console.log(this.messages);

    this.isLoggedIn = this.loginService.isAuthenticated();
    console.log('Is user logged in?', this.isLoggedIn);

    this.userAvatar = this.loginService.getUserImage();
    console.log('Image URL from app component:', this.userAvatar);
  }

  logout() {
    this.loginService.clearSession();
    this.isLoggedIn = false;
    this.userAvatar = null;
  }
}
