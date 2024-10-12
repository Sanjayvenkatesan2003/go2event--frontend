import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Event } from './event.model';
import { EventService } from './event.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { NotificationService } from '../notification/notification.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  constructor(private eventService: EventService,private userService: UserService,
    private notificationService: NotificationService) {  
    this.user = this.userService.getUserInSession();
  }
  user:User;
  buttonText:string = 'Book';


  ngOnInit() {
    this.buttonText = this.isBooked()?'Cancel' : 'Book';
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
    this.eventService.bookAnEvent(this.event).subscribe(updatedUser => {
      this.userService.storeUserInSession(updatedUser);
      this.user = this.userService.getUserInSession();
      this.event.availableSeats -= 1;
      this.buttonText = 'Cancel';
      this.notificationService.launchNotification('success',this.event.name+' event booked successfully');
    }); 
  }

  isBooked(): boolean {
    for(let i=0;i<this.user.events.length;i++) {
      if(this.user.events[i].name === this.event.name)
        return true;
    }
    return false;
  }

  cancel():void {
    this.eventService.cancelAnEvent(this.event).subscribe(updatedUser => {
      this.userService.storeUserInSession(updatedUser);
      this.user = this.userService.getUserInSession();
      this.event.availableSeats += 1;
      this.buttonText = 'Book';
      this.notificationService.launchNotification('success',this.event.name+' event cancelled successfully');
    }); 
  }
 }

