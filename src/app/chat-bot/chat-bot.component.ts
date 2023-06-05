import { Component } from '@angular/core';

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
  messageQueue: any[] = [];
  userMessage: string = '';
  botMessage: string = '';

  sendMessage(user: string) {
    let message = '';
    if (user === 'User') {
      message = this.userMessage;
      this.userMessage = '';
    } else {
      message = this.botMessage;
      this.botMessage = '';
    }

    const messageObject = {
      user: user,
      message: message
    };

    this.messageQueue.push(messageObject);
  }
  clearTheChat(){
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
