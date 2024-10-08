import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationMsg: string = '';
  notificationType: string = ''; 
  notificationNum: number = 0;

  constructor() { }

  launchNotification(type: string, message: string):void {
    this.notificationMsg = message;
    this.notificationType = type;
    this.notificationNum = Math.random();
  }
}
