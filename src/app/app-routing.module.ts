import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/meeting/create/create.component';
import { EditComponent } from './pages/meeting/edit/edit.component';
import { IndexComponent } from './pages/meeting/index/index.component';
import { ShareComponent } from './pages/meeting/share/share.component';
import { ShowComponent } from './pages/meeting/show/show.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'meetings/share/:id', component: ShareComponent },
  {
    path: 'meetings/index',
    component: IndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meetings/create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meetings/edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meetings/show/:id',
    component: ShowComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
