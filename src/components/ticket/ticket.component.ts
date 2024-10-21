import { Component } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  
  constructor(public ticketService: TicketService) {
    
  }

  closeTicket(): void {
    this.ticketService.showBookingTicket = false;
    this.ticketService.showBookedTicket = false;
  }

  cancelTicket(): void {
    this.ticketService.cancelATicket();
  }
}
