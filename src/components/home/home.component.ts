import { Component } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user:User = { 
    id: 0,
    name: 'Default Name',
    email: 'default@example.com',
    password: 'default password'
  };

  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService) {
    this.route.params.subscribe(params => {
      this.user = JSON.parse(sessionStorage.getItem(params['id'].toString()) || JSON.stringify(this.user));
    });

    if(this.user.id === -1) {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    this.userService.removeUserInSession(this.user);
  }
}
