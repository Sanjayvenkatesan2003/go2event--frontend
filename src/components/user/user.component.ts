import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private userService: UserService,private router:Router) {}

  currentForm: string = "login-form";
  visibility: boolean = false;
  visibility1: boolean = false;
  newUser:User = {name:"", email:"", password:""};
  confirmPassword: string = "";

  createUser():void {
    this.userService.getUserByEmail(this.newUser).subscribe((receivedUser) => {
      if(receivedUser) {
        alert('User already exists');
      } else if(this.newUser.password === this.confirmPassword) {
        this.userService.createUser(this.newUser).subscribe((createdUser) => {
          this.userService.storeUserInSession(createdUser);
          this.newUser = {name:"", email:"", password:""};
          this.confirmPassword = "";
          this.router.navigate(['/home/'+createdUser.id]);
        });
      } else {
        console.log(receivedUser);
        alert('Passwords must be equal in both feilds');
      }
    });
  }

  existingUser: User = {name:"", email:"", password:""};
  
  login():void {
    this.userService.getUserByEmail(this.existingUser).subscribe((receivedUser) => {
      if(!receivedUser) {
        alert('User does not exists Please sign up');
      } else if(receivedUser.password === this.existingUser.password) {
        this.userService.storeUserInSession(receivedUser);
        this.router.navigate(['/home/'+receivedUser.id]);
      } else {
        alert('Please enter the valid password');
      }
    });
  }

  toggleForms(otherForm: string) {
    if(this.currentForm === 'signup') {
      this.newUser = {name:"", email:"", password:""};
      this.confirmPassword = "";
    } else {
      this.existingUser = {name:"", email:"", password:""};
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
