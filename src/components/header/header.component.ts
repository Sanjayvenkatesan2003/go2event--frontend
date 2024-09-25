import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user = JSON.parse(sessionStorage.getItem('user') || JSON.stringify({name: 'default_user', email: 'default_user@example.com'}));
}
