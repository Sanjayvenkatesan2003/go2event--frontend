import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Event } from '../event/event.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080/users';

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
      events:[]
    }));
  }

  bookAnEvent(user:User,event:Event):Observable<User> {
    return this.httpClient.put<User>(this.apiUrl+'/'+user.id+'/addEvent'+'/'+event.id,{});
  }

  cancelAnEvent(user:User,event:Event):Observable<User> {
    return this.httpClient.put<User>(this.apiUrl+'/'+user.id+'/cancelEvent'+'/'+event.id,{});
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
        events: updatingUser.events
    });
  }
}
