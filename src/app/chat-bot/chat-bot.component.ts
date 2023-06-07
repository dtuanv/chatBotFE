import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { HttpClient } from '@angular/common/http';

interface Message {
  sender: string;
  content: string;
}


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  constructor(private http: HttpClient) { }
  messageQueue: any[] = [];
  userMessage: string = '';
  botMessage: string = '';
  botAnswer: any = {};
  messageObject: any = {};
  botSteps: any[] = []


  indexStep = 0





  sendMessage(user: string): void {
    let message = '';
    if (user === 'User') {
      message = this.userMessage;
      this.userMessage = '';
    } else {
      message = this.botMessage;
      this.botMessage = '';
    }

    // const messageObject = {
    //   user: user,
    //   message: message

    // };

    // this.messageQueue.push(messageObject);

    const inputToBot = {
      input: message,
      state: 'hi'
    }

    this.http.post('http://localhost:8080/it_chat/', inputToBot).subscribe(
      (response) => {
        // Handle the response
        this.botAnswer = response
        console.log(" this.botAnswer ", response);
        if (this.botAnswer.label) {
          this.messageObject = {
            user: user,
            message: message,
            answer: this.botAnswer.answer
          };
          this.messageQueue.push(this.messageObject);

        }
        if (this.botAnswer.name) {
          this.messageObject = {
            user: user,
            message: message,
            initial_answer: this.botAnswer.initial_answer,
            network: this.botAnswer.network,
            steps: this.botAnswer.steps
          }
          this.botGetStep(this.botAnswer.steps)
          this.messageQueue.push(this.messageObject);

        }


      },
      (error) => {
        // Handle any errors
        console.error(error);
      }
    );
    // Reset the input fields
    if (user === 'User') {
      this.userMessage = '';
    } else {
      this.botMessage = '';
    }
  }

  botGetStep(steps: any) {
    console.log("this.indexStep ", this.indexStep)
    this.botSteps.push(steps[this.indexStep])
    console.log("this.botSteps ", this.botSteps)
    return this.botSteps
  }

  stepAnswer(answer: any, steps: any, stepNum: any) {
    if (answer == 'failure') {
      this.indexStep++
      this.botGetStep(steps)
    }
    if (answer == 'success') {
      let inputSuccess = { state: "problem_solved" }
      this.http.post('http://localhost:8080/it_chat/', inputSuccess).subscribe(
        (response) => {
          // Handle the response
          this.botAnswer = response
          console.log(" this.botAnswer ", response);
          if (this.botAnswer.answer) {
            this.messageObject = {

              answer: this.botAnswer.answer
            };
            this.messageQueue.push(this.messageObject);

          }
        },
        (error) => {
          // Handle any errors
          console.error(error);
        }
      );
    }

    if(answer == 'unable'){
      let inputUnable = { state: "problem_solved" }
      this.http.post('http://localhost:8080/it_chat/', inputUnable).subscribe(
        (response) => {
          // Handle the response
          this.botAnswer = response
          console.log(" this.botAnswer ", response);
          if (this.botAnswer.answer) {
            this.messageObject = {

              answer: this.botAnswer.answer
            };
            this.messageQueue.push(this.messageObject);

          }
        },
        (error) => {
          // Handle any errors
          console.error(error);
        }
      );
    }
  }



  clearTheChat() {
    this.messageQueue = [];
  }

  formatMessage(message: string): string {
    const lineBreakInterval = 100;
    let formattedMessage = '';
    for (let i = 0; i < message.length; i += lineBreakInterval) {
      formattedMessage += message.substring(i, i + lineBreakInterval) + '<br>';
    }
    return formattedMessage;
  }
}
