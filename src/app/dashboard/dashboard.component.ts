import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private http: HttpClient) { }
  questions: any = []

  ngOnInit(): void {
    console.log("local ", localStorage.getItem('role'))

    this.http.get('http://localhost:8614/getQuestion').subscribe(
      (response) => {

        this.questions = response

        console.log(response);
        // Handle the response data here
      },
      (error) => {
        console.error(error);
        // Handle errors here
      }
    );

  }


}
