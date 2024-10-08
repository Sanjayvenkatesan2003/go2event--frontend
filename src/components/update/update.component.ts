import { Component } from '@angular/core';
import { User } from '../user/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  constructor(private router: Router,private userService: UserService,private notificationService: NotificationService) {
    this.oldUser = this.userService.getUserInSession();
  }

  oldPassword: string = '';
  newUser:User = {name:"", email:"", password:"",events:[]};
  oldUser:User = {name:"", email:"", password:"",events:[]};
  visibility:boolean = false;
  visibility1:boolean = false;
  updateMode:boolean = false;


  togglePasswordVisibility():void {
    this.visibility = !this.visibility;
  }

  togglePasswordVisibility1():void {
    this.visibility1 = !this.visibility1;
  }

  updateUser(): void {
    this.newUser.id = this.oldUser.id;
    if(this.newUser.name !== '') {
      this.oldUser.name = this.newUser.name;
    }

    if(this.newUser.email !== '') {
      this.oldUser.email = this.newUser.email;
    }

    if(this.newUser.password !== '') {
      this.oldUser.password = this.newUser.password;
    } else {
      this.oldUser.password = this.oldPassword;
    }

    this.userService.updateUser(this.oldUser).subscribe((updatedUser) => {
      if(updatedUser) {
        this.notificationService.launchNotification('success','User updated successfully');
        this.userService.storeUserInSession(updatedUser);
      } else {
        this.notificationService.launchNotification('error','Server error, Please try again later');
      }
    });
  }

  backToHome():void {
    this.router.navigate(['/home']);
  }

  checkPassword(): void {
    this.userService.getUserByEmail(this.oldUser).subscribe((receivedUser) => {
      if(receivedUser.password === this.oldPassword) {
        this.notificationService.launchNotification('success','Password verfied');
        this.updateMode = true;
      } else {
        this.notificationService.launchNotification('error','Password does not matches');
      }
    });
  }
}
