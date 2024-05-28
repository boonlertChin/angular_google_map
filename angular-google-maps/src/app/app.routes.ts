/*
import { Routes } from '@angular/router';

export const routes: Routes = [];
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { DashboardWorkingGroupFFComponent } from './dashboard-working-group-ff/dashboard-working-group-ff.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/*    
const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full'},
//   { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'DashboardWorkingGroupFFComponent', component: DashboardWorkingGroupFFComponent },
  { path: 'dashboard', component: DashboardComponent },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboardWorkingGroupFFComponent', component: DashboardWorkingGroupFFComponent },
  { path: 'dashboard', component: DashboardComponent },
];