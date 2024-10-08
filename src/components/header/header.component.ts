import { Component,Output,EventEmitter, HostListener, ElementRef } from '@angular/core';
import { UserService } from '../user/user.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService: UserService,private elementRef: ElementRef) {

  }

  user = JSON.parse(sessionStorage.getItem('user') || JSON.stringify({name: 'default_user', email: 'default_user@example.com'}));
  profileToggle = false;

  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value:string) {     
    this.newItemEvent.emit(value);
  }

  displayProfile() {
    this.profileToggle = true;
  }
}
