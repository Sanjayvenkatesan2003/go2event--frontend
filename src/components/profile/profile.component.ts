import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileToggle = true;
  typeOfEvents = '';

  constructor(private userService: UserService,private elementRef: ElementRef,private router: Router,private homeService:HomeService) {
    if(this.router.url === '/home') {
      this.typeOfEvents = 'Booked Events';
    } else {
      this.typeOfEvents = 'All Events';
    }
  }
  
  logout():void {
    this.userService.logout();
  }

  updateUser():void {
    this.router.navigate(['/update']);
  }

  getEvents():void {
    if(this.router.url === '/home') {
      this.typeOfEvents = 'All Events';
      this.router.navigate(['home/events']);
    } else {
      this.typeOfEvents = 'Booked Events';
      this.router.navigate(['home']);
    }
  }

  @HostListener('document:click',['$event.target'])
  onOutsideClick(targetElement:any) {
    const clickInside = (targetElement.className !== 'user-events' && (this.elementRef.nativeElement.contains(targetElement) || (targetElement.className === 'pm')));
    if(!clickInside) {
      this.profileToggle = false;
    } else {
      this.profileToggle = true;
    }
  }
}
