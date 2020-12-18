import { CrudComponent } from './crud/crud.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'crud', component: CrudComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: '**', redirectTo: 'login' },
    { path: ' ', pathMatch: 'full', redirectTo: 'login'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
