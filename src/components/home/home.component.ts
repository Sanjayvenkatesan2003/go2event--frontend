import { Component } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { HeaderComponent } from "../header/header.component";
import { EventComponent } from "../event/event.component";
import { EventService } from '../event/event.service';
import { Event } from '../event/event.model';
import { LoadingComponent } from "../loading/loading.component";
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketService } from '../ticket/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EventComponent, LoadingComponent, TicketComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user:User = { 
    id: 0,
    name: 'Default Name',
    email: 'default@example.com',
    password: 'default password',
    tickets:[]
  };
  searchQuery:string = '';
  typeOfEvents:string = '';
  upcoming:boolean = true;
  attended:boolean = false;
  
  constructor(private userService:UserService,private eventService:EventService,public hs:HomeService,public router:Router,public ticketService:TicketService) {
    this.user = userService.getUserInSession();
    this.hs.events = [{
      name: 'Default event',
      description: 'Default description',
      type: 'Default type',
      venue: 'Default venue',
      ticketPrice:0,
      totalSeats:0,
      availableSeats:0,
      date: new Date(),
      time: new Date(),
      duration: new Date(),
    }];
    
    if(this.router.url === '/home') {
      setTimeout(() => {
        this.typeOfEvents = 'All Events';
        this.hs.getAllEvents();
      },500);
    } else if(this.router.url === '/home/events') {
      setTimeout(() => {
        this.typeOfEvents = 'My Events';
        if(this.upcoming) {
          this.hs.getUpcomingEventsOfUser();
        } else {
          this.hs.getAttendedEventsOfUser();
        }
      },500);
    }
  }

  toggleUpcomingOrAttended(target:string) {
    if(target === 'upcoming') {
      this.upcoming = true;
      this.attended = false;
      this.hs.getUpcomingEventsOfUser();
    } else {
      this.upcoming = false;
      this.attended = true;
      this.hs.getAttendedEventsOfUser();
    }
  }

  displayCreateEvent():void {
    this.router.navigate(['create-event']);
  }

  logOut() {
    this.userService.logout();
  }

  getSearchString(newString: string) {
    this.searchQuery = newString;
    this.hs.events = [{
      name: 'Default event',
      description: 'Default description',
      type: 'Default type',
      venue: 'Default venue',
      ticketPrice:0,
      totalSeats:0,
      availableSeats:0,
      date: new Date(),
      time: new Date(),
      duration: new Date(),
    }];

    if(this.searchQuery === '') {
      if(this.router.url === '/home') {
        setTimeout(() => {
          this.hs.getAllEvents();
        },500);
      } else {
        setTimeout(() => {
          if(this.upcoming) {
            this.hs.getUpcomingEventsOfUser();
          } else {
            this.hs.getAttendedEventsOfUser();
          }
        },500);
      }
    } else {
      console.log('All Events');
      console.log(this.hs.allEvents);
      
      setTimeout(() => {
        this.hs.events = this.hs.allEvents.filter(event => event.name.toLowerCase().startsWith(this.searchQuery.toLowerCase()));
      },200)
    }
  }
}
