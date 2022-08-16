import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
 import { DetailsComponent } from './details/details.component';
import { LineComponent } from './details/line/line.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dash',component:DashboardComponent},
   {path:'detail',component:DetailsComponent},
   {path:'line',component:LineComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
