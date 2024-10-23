import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './ticket.model';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  showBookingTicket: boolean = false;
  showBookedTicket: boolean = false;
  showMessage: boolean = false;
  bookedTicket:Ticket;
  user:User;
  event:Event;
  qrCode:any;
  
  constructor(private httpClient: HttpClient,private notificationService: NotificationService
    ,private userService: UserService,private router: Router
  ) {
    this.bookedTicket = {
      amountPaid: 0,
      purchaseDate: new Date("1970-01-01T00:00:00"),
      purchaseTime: new Date("1970-01-01T00:00:00"),
      numberOfSeats: 0
    };

    this.user = {
      name: 'Default user',
      email: 'default@example.com',
      password: 'password',
      tickets : []
    }

    this.event = {
      name: 'Default event',
      description: 'Default description',
      type: 'Default type',
      venue: 'Default venue',
      ticketPrice:0,
      totalSeats:0,
      availableSeats:0,
      date: new Date(),
      time: new Date(),
      duration: new Date()
    }
  }

  private apiUrl: string = 'http://localhost:8080/tickets';
  public qrApi: string = 'https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&size=80x80&bgcolor=255-165-0';


  bookAnEvent(user: User,event: Event): void {
    this.showBookingTicket = true;
    this.user = user;
    this.event = event;
  }

  bookATicket(amount:number,seats:number):void {
   
    this.httpClient.post<User>(this.apiUrl+'/new/user/'+this.user.id+'/event/'+this.event.id,{
      purchaseDate: new Date().toISOString(),
      purchaseTime: new Date().toTimeString().slice(0,8),
      numberOfSeats: seats,
      amountPaid: amount
    },).subscribe(receivedUser => {
      
      this.userService.formatTicketsOfUser(receivedUser.tickets);
      this.userService.storeUserInSession(receivedUser);
      this.notificationService.launchNotification('success',this.event.name+' Event Booked Successfully');
      this.showBookingTicket = false;
      // setTimeout(() => {
      //   window.location.reload();
      // },1000);
    }, (err:HttpErrorResponse) => {
      this.notificationService.launchNotification('error',err.error);
    });
    
  }

  displayTicket(user:User,event:Event):void {
    this.qrCode = 'no-qr';
    this.showBookedTicket = true;
    this.bookedTicket = this.userService.getTicketFromEvent(user,event);
    this.qrApi = 'https://api.qrserver.com/v1/create-qr-code/?data='+'Ticket for event: '+this.bookedTicket.event!.name + ', Number of seats: '+
    this.bookedTicket.numberOfSeats +'&size=80x80&bgcolor=255-165-0';
    this.getQrcode(this.qrApi);
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

  getQrcode(imageUrl: string): void {
    this.httpClient.get(imageUrl, { responseType: 'blob' }).subscribe((responseBlob) => {
      this.blobToBase64(responseBlob).then(res => {
        this.qrCode = res;
      });
    });
  }

  blobToBase64(blob:Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
}
