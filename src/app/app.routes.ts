import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { HomeComponent } from '../components/home/home.component';
import { UpdateComponent } from '../components/update/update.component';
import { CreateEventFormComponent } from '../components/create-event-form/create-event-form.component';

export const routes: Routes = [
  {path: 'login', component: UserComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'home/test', component: HomeComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'home/events', component: HomeComponent},
  {path: 'create-event',component: CreateEventFormComponent},
];