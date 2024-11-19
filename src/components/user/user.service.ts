import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Event } from '../event/event.model';
import { Ticket } from '../ticket/ticket.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080/users';
  private events:Event[] = [];

  constructor(private httpClient: HttpClient,private router: Router) { }

  createUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl+'/new', newUser);
  }

  getUserByEmail(existingUser: User): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl+'/getUserByEmail',{ 
      params: { 
        email: existingUser.email
      }
    });
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiUrl+'/getUserById',{ 
      params: { 
        id: id
      }
    });
  }

  storeUserInSession(user: User): void {
    let {password, ...userWithoutPassword} = user;
    sessionStorage.setItem('user',JSON.stringify(userWithoutPassword));
  }

  removeUserInSession():void {
    sessionStorage.removeItem('user');
  }

  getUserInSession():User {
    return JSON.parse(sessionStorage.getItem('user') || JSON.stringify({ 
      id: 0,
      name: 'Default Name',
      email: 'default@example.com',
      password: 'default password',
      tickets:[]
    }));
  }


  logout():void {
    this.removeUserInSession();
    this.router.navigate(['/']);
  }

  updateUser(updatingUser:User):Observable<User> {
    return this.httpClient.put<User>(this.apiUrl+'/'+updatingUser.id+'/update',{
        id: updatingUser.id,
        name: updatingUser.name,
        email: updatingUser.email,
        password: updatingUser.password,
        tickets: []
    });
    
  }

  getAllEvents(user:User):Event[] {
      
      for(let i=0;i < user.tickets.length;i++) {
        this.events[i] = user.tickets[i].event!;
        this.events[i].date = new Date(this.events[i].date);
        this.events[i].time = new Date(this.events[i].time);
        this.events[i].duration = new Date(this.events[i].duration);
      }
      
      return this.events;
  }

  getTicketFromEvent(user:User,event:Event):Ticket {
    for(let i=0;i < user.tickets.length;i++) {
      if(user.tickets[i].event!.name === event.name) {
        return user.tickets[i];
      }
    }
    return {
      amountPaid: 0,
      purchaseDate: new Date("1970-01-01T00:00:00"),
      purchaseTime: new Date("1970-01-01T00:00:00"),
      numberOfSeats: 0
    };
  }

  formatTicketsOfUser(tickets:Ticket[]):void {
    for(let i = 0; i < tickets.length; i++) {
      tickets[i].purchaseDate = new Date(tickets[i].purchaseDate);
      tickets[i].purchaseTime = new Date("1970-01-01T"+tickets[i].purchaseTime);
      tickets[i].event!.date = new Date(tickets[i].event!.date);
      tickets[i].event!.time = new Date("1970-01-01T"+tickets[i].event!.time);
      tickets[i].event!.duration = new Date("1970-01-01T"+tickets[i].event!.duration);
    }
  }
}
