import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl:string = 'http://localhost:8080/events';

  user:User;
  constructor(private httpClient: HttpClient,private userService: UserService) { 
    this.user = this.userService.getUserInSession();
  }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.apiUrl+'/all');
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl+'/2/getUsers');
  }
  
  bookAnEvent(event: Event): Observable<User> {
    return this.userService.bookAnEvent(this.user,event);
  }

  cancelAnEvent(event: Event): Observable<User> {
    return this.userService.cancelAnEvent(this.user,event)
  }
}
