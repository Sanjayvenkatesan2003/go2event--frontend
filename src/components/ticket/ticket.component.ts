import { Component } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  numberOfSeats: number;
  amount: number;
  constructor(public ticketService: TicketService,private notificationService: NotificationService) {
    this.numberOfSeats = 1;
    this.amount = this.ticketService.event.ticketPrice;
  }

  closeTicket(): void {
    this.ticketService.showBookingTicket = false;
    this.ticketService.showBookedTicket = false;
  }

  cancelTicket(): void {
    this.ticketService.cancelATicket();
  }

  bookTicket(): void {
    this.ticketService.bookATicket(this.amount,this.numberOfSeats);
  }

  incrementSeats():void {
    if(this.numberOfSeats == 10) {
      this.notificationService.launchNotification('warning','Maximum number of seats is reached');
    } else {
      this.numberOfSeats += 1;
      this.amount += this.ticketService.event.ticketPrice; 
    }
  }

  decrementSeats():void {
    if(this.numberOfSeats == 1) {
      this.notificationService.launchNotification('warning','Minimum number of seats is reached');
    } else {
      this.numberOfSeats -= 1;
      this.amount -= this.ticketService.event.ticketPrice;
    }
  }

}
