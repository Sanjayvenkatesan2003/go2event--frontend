import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../ticket/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl:string = 'http://localhost:8080/events';

  constructor(private httpClient: HttpClient,private userService: UserService,private ticketService: TicketService) {}

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.apiUrl+'/all');
  }
  
}
