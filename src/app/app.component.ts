import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserComponent } from "../components/user/user.component"
import { NotificationService } from '../components/notification/notification.service';
import { NotificationComponent } from '../components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UserComponent,NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  ns:NotificationService;
  constructor(private notificationService: NotificationService) {
    this.ns = this.notificationService;
  }
  title = 'go2event';
}