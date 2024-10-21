import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Event } from './event.model';
import { EventService } from './event.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { NotificationService } from '../notification/notification.service';
import { HomeService } from '../home/home.service';
import { TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

 
  user:User;
  buttonText:string = 'Book';

  constructor(private eventService: EventService,private userService: UserService,
    private ticketService: TicketService, private homeService:HomeService) {  
    this.user = this.userService.getUserInSession();
  }

  ngOnInit() {
    this.buttonText = this.isBooked()?'View Ticket' : 'Book';
  }
  

  @Input() event: Event = {
    name:"Default event",
    description:"This is a default event",
    type:"Default type",
    venue:"Default Venue",
    ticketPrice:50,
    totalSeats:500,
    availableSeats:450,
    date:new Date("2024-10-18T18:00:00"),
    time:new Date("18:00:00"),
    duration:new Date("1970-01-01T02:30:00")
  };

  book():void {
    this.ticketService.bookAnEvent(this.userService.getUserInSession(),this.event);
    setTimeout(()=>{
      this.homeService.getAllEvents();
    },200);
  }

  showTicket():void {
    this.ticketService.displayTicket(this.userService.getUserInSession(),this.event);
  }

  isBooked(): boolean {
    for(let i=0;i<this.user.tickets.length;i++) {
      if(this.user.tickets[i].event!.name === this.event.name)
        return true;
    }
    return false;
  }

 }

