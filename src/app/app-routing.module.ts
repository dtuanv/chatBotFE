import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'', component: LoginComponent},

  {path:'chat', component: ChatBotComponent},
  {path:'login', component: LoginComponent},
  {path:'admin', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
