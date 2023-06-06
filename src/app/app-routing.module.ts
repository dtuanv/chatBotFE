import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'', component: LoginComponent},

  {path:'chat', component: ChatBotComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
