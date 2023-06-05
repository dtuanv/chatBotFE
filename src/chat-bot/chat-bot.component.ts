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
  messages: string[] = [];
  messagesBot: string[] =[];
  userInput: string = '';

  sendMessage() {
    const inputElement = document.querySelector('.input-user');
    if (inputElement instanceof HTMLInputElement && inputElement.value.trim() !== '') {
      this.messages.unshift(inputElement.value.trim());
      inputElement.value = '';
    }
  }

  sendMessage2() {
    const inputElement = document.querySelector('.input-bot');
    if (inputElement instanceof HTMLInputElement && inputElement.value.trim() !== '') {
      this.messagesBot.unshift(inputElement.value.trim());
      inputElement.value = '';
    }
  }

}
