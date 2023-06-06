import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,MatDividerModule,MatButtonModule,FormsModule],
})
export class LoginComponent {
  constructor(private router: Router) { }
  hide = true;
  username: string = '';
  password: string = '';
  invalidMessage: string = '';

  toLogin(){
     if(this.username == 'team14' && this.password =='14'){
      console.log("14")
      this.invalidMessage = ''
      this.router.navigate(['/chat']);
     }else{
      this.invalidMessage = '*Username or Password not correct'
     }
  }
}
