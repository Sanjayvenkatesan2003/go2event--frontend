import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Ticket } from '../ticket/ticket.model';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private userService: UserService,private router:Router,private notificationService:NotificationService) {}

  currentForm: string = "login-form";
  visibility: boolean = false;
  visibility1: boolean = false;
  newUser:User = {name:"", email:"", password:"",tickets:[]};
  confirmPassword: string = "";

  createUser():void {
    this.userService.getUserByEmail(this.newUser).subscribe((receivedUser) => {
      if(receivedUser) {
        this.notificationService.launchNotification('warning','User already exists');
      } else if(this.newUser.password === this.confirmPassword) {
        this.userService.createUser(this.newUser).subscribe((createdUser) => {
          this.userService.storeUserInSession(createdUser);
          this.newUser = {name:"", email:"", password:"",tickets:[]};
          this.confirmPassword = "";
          this.notificationService.launchNotification('success','User registered successfully');
          this.currentForm='login-form';
        });
      } else {
        this.notificationService.launchNotification('error','Passwords must be matched at both feilds');
      }
    });
  }

  existingUser: User = {name:"", email:"", password:"",tickets:[]};
  
  login():void {
    this.userService.getUserByEmail(this.existingUser).subscribe((receivedUser) => {
      if(!receivedUser) {
        this.notificationService.launchNotification('error','User not found!!');
      } else if(receivedUser.password === this.existingUser.password) {
        this.userService.formatTicketsOfUser(receivedUser.tickets);
        this.userService.storeUserInSession(receivedUser);
        this.router.navigate(['/home']);
      } else {
        this.notificationService.launchNotification('warning','Please enter the valid password');
      }
    });
  }

  logout():void {
    this.userService.logout();
  }
  
  toggleForms(otherForm: string) {
    if(this.currentForm === 'signup') {
      this.newUser = {name:"", email:"", password:"",tickets:[]};
      this.confirmPassword = "";
    } else {
      this.existingUser = {name:"", email:"", password:"",tickets:[]};
    }
    this.currentForm = otherForm;
  }

  isActive(form: string) {
    return form === this.currentForm;
  }

  togglePasswordVisibility() {
    this.visibility = !this.visibility;
  }

  togglePasswordVisibility1() {
    this.visibility1 = !this.visibility1;
  }

  
}
