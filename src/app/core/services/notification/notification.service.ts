import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notificationCount = new BehaviorSubject<number>(0);
  notificationCount$ = this._notificationCount.asObservable(); //$ is used to denote an observable variable

  private _messages = new BehaviorSubject<string[]>([]);
  messages$ = this._messages.asObservable();

  updateMessages(messages: string[]) {
    this._messages.next(messages);
    this._notificationCount.next(messages.length);
  }
}
