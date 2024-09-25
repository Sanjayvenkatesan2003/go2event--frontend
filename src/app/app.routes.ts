import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
  {path: 'login', component: UserComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'home/test', component: HomeComponent}

];