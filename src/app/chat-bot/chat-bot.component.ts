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
  userMessageLocal: string = '';
  botMessage: string = '';
  botAnswer: any = {};
  botAnswerMessage: string='';
  messageObject: any = {};
  botSteps: any[] = []


  indexStep = 0





  sendMessage(user: string): void {
    this.botAnswerMessage = ''
    let message = '';
    if (user === 'User') {
      message = this.userMessage;
      this.userMessageLocal = this.userMessage

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

        if (this.botAnswer.state) {
          this.messageObject = {
            user: user,
            message: message,
            answer: this.botAnswer.answer
          };
          this.messageQueue.push(this.messageObject);

        }

        if (this.botAnswer.answer && !this.botAnswer.state && !this.botAnswer.label ) {
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
              user: 'User',
              message: steps[this.indexStep].answers.success,
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
      let stepAskSet: any[] = []
      this.botSteps.forEach((st, i)  => {

        let putOb: any = {};
        if(i == this.botSteps.length - 1){
          putOb.question = st.question
          putOb.answer = st.answers.unable

        }else{
          putOb.question = st.question
          putOb.answer = st.answers.failure
        }

        stepAskSet.push(putOb)
      });

      console.log("this.userMessage ",  this.userMessageLocal)
      let inputUnable = {
        input:   this.userMessageLocal,
        stepAskSet:stepAskSet

      }

      console.log("inputUnable ",inputUnable)
        // state: "problem_solved"
      this.http.post('http://localhost:8614/saveMessage', inputUnable).subscribe(
        (response) => {
          // Handle the response
          this.botAnswer = response
          console.log(" this.botAnswer ", response);
         this.botAnswerMessage = 'Ihre Frage wurde an unsere Team Weitergeleitet. Bitte kontaktieren Sie uns unter dieser E-Mail-Adresse team14@itech.com, damit wir Sie besser beraten können.'
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
    if(message){
      for (let i = 0; i < message.length; i += lineBreakInterval) {
        formattedMessage += message.substring(i, i + lineBreakInterval) + '<br>';
      }
    }

    return formattedMessage;
  }
}
