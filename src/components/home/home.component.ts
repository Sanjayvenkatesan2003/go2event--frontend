import { Component } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { EventComponent } from "../event/event.component";
import { EventService } from '../event/event.service';
import { Event } from '../event/event.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EventComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user:User = { 
    id: 0,
    name: 'Default Name',
    email: 'default@example.com',
    password: 'default password',
    events:[]
  };
  events:Event[] = [];
  allEvents:Event[] = [];
  searchQuery:string = '';
  
  constructor(private router:Router,private userService:UserService,private eventService:EventService) {
    this.user = userService.getUserInSession();

    if(this.user.id === -1) {
      this.router.navigate(['/login']);
    }

    this.eventService.getAllEvents().subscribe(events => {
      events.forEach(element => {
        let dateString:string = element.date+"T"+element.time;
        element.date = new Date(dateString);
        dateString = "1970-01-01T"+element.duration;
        element.duration = new Date(dateString);
      });
      this.allEvents = events;
      this.events = this.allEvents;
    });
  }

  logOut() {
    this.userService.logout();
  }

  getSearchString(newString: string) {
    this.searchQuery = newString;
    if(this.searchQuery === '') {
      this.events = this.allEvents;
    } else {
      this.events = this.allEvents.filter(event => event.name.toLowerCase().startsWith(this.searchQuery.toLowerCase()));
    }
  }
}
