import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Event } from '../event/event.model';
import { Router } from '@angular/router';
import { CreateEventFormService } from './create-event-form.service';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.css'
})
export class CreateEventFormComponent {
  newEvent:Event;

  constructor(private router:Router,private createEventFormService:CreateEventFormService) {
    this.newEvent = {
      name: '',
      description: '',
      type:'',
      venue:'',
      date: '',
      time: '',
      duration: '',
      ticketPrice:NaN,
      totalSeats:NaN,
      availableSeats:NaN
    }
  }

  createEvent():void {
    this.newEvent.time += ":00";
    this.newEvent.duration += ":00";
    this.createEventFormService.createEvent(this.newEvent).subscribe((receivedEvent:Event) => {
      
    })
    this.router.navigate(['home/events']);
  }

  leaveForm():void {
    this.router.navigate(['home/events']);
  }
}
