import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) { }

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

  removeUserInSession(user:User):void {
    sessionStorage.removeItem('user');
  }
}
