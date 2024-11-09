import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../event/event.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateEventFormService {

  private apiUrl: string = 'http://localhost:8080/events'
  constructor(private httpClient: HttpClient) { }

  createEvent(newEvent:Event):Observable<Event> {
    return this.httpClient.post<Event>(this.apiUrl+'/new',newEvent);
  }
}
