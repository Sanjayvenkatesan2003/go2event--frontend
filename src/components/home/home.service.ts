import { Injectable } from '@angular/core';
import { Event } from '../event/event.model';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private userService: UserService,private eventService: EventService) { }

  allEvents:Event[] = [];
  events:Event[] = [{
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

  formatEvents(receivedEvents:Event[]):Event[] {
    receivedEvents.forEach(element => {
      let dateString:string = element.date+"T"+element.time;
      element.date = new Date(dateString);
      element.time = new Date(dateString);
      dateString = "1970-01-01T"+element.duration;
      element.duration = new Date(dateString);
    });
    return receivedEvents;
  }

  getUpcomingEventsOfUser():void {
    this.events = [{
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

    let today = new Date();
    this.allEvents = this.userService.getAllEvents(this.userService.getUserInSession());
    this.events = this.allEvents.filter((event) => this.isBooked(event) && event.date >= today);
  }

  getAttendedEventsOfUser():void {
    this.events = [{
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

    let today = new Date();
    this.allEvents = this.userService.getAllEvents(this.userService.getUserInSession());
    this.events = this.allEvents.filter((event) => this.isBooked(event) && event.date < today); 
  };

  getAllEvents():void {
    let today = new Date();
    this.eventService.getAllEvents().subscribe(events => {
      events = this.formatEvents(events);
      events = events.filter((event) => !this.isBooked(event) && event.date >= today);
      events.sort((event1, event2) => {
        if(event1.date >= event2.date) {
          return 1;
        } else {
          return -1;
        }
      })
      this.events = events;
      this.allEvents = this.events;
    });

  }

  isBooked(event:Event):boolean {
    let user = this.userService.getUserInSession();
    for(let i=0;i<user.tickets.length;i++) {
      if(user.tickets[i].event!.name === event.name)
        return true;
    }
    return false;
  }
}
