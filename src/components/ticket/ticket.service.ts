import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './ticket.model';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  showBookingTicket: boolean = false;
  showBookedTicket: boolean = false;
  showMessage: boolean = false;
  bookedTicket:Ticket;

  constructor(private httpClient: HttpClient,private notificationService: NotificationService
    ,private userService: UserService,private router: Router
  ) {
    this.bookedTicket = {
      amountPaid: 0,
      purchaseDate: new Date("1970-01-01T00:00:00"),
      purchaseTime: new Date("1970-01-01T00:00:00"),
      numberOfSeats: 0
    };
  }

  private apiUrl: string = 'http://localhost:8080/tickets';
  public qrApi: string = 'https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=80x80';


  bookAnEvent(user: User,event: Event): void {
    this.bookATicket(user,event);
  }

  bookATicket(user:User, event:Event):void {

    this.httpClient.post<User>(this.apiUrl+'/new/user/'+user.id+'/event/'+event.id,{
      purchaseDate: new Date().toISOString(),
      purchaseTime: new Date().toTimeString().slice(0,8),
      numberOfSeats: 2,
      amountPaid: 100
    },).subscribe(receivedUser => {
      this.userService.storeUserInSession(receivedUser);
      this.notificationService.launchNotification('success',event.name+' Event Booked Successfully');
    }, (err:HttpErrorResponse) => {
      this.notificationService.launchNotification('error',err.error);
    });
    
  }

  displayTicket(user:User,event:Event):void {
    this.showBookedTicket = true;
    this.bookedTicket = this.userService.getTicketFromEvent(user,event);
    this.qrApi = 'https://api.qrserver.com/v1/create-qr-code/?data='+'Ticket for event: '+this.bookedTicket.event!.name + ', Number of seats: '+
    this.bookedTicket.numberOfSeats +'&amp;size=80x80';
  }

  cancelATicket(): void {
    this.httpClient.delete<User>(this.apiUrl+'/'+this.bookedTicket.id!).subscribe(receivedUser => {
      this.userService.storeUserInSession(receivedUser);
      this.showBookedTicket = false;
      this.notificationService.launchNotification('success','Ticket cancelled successfully');
      setTimeout(() => {
        window.location.reload();
      },1000);
      
    }, (error: HttpErrorResponse) => {
      this.notificationService.launchNotification('error','No Ticket was found');
    })
  }
}
