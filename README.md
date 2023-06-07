Frontend Chatbot Project Readme
This project is a frontend chatbot developed in JavaScript using the Angular framework. The chatbot allows users to log in and then ask questions, to which the bot responds. Users have a green background, and the bot's responses are displayed in red.

Features
Login: The project includes a login page where users can log in to access the chatbot.
Chatbot Communication: After logging in, users can ask questions in the chat window. The questions are displayed as chat messages, and the chatbot responds accordingly.
User Interaction: The chatbot allows users to interact and provide input based on the requirements of the project.
Project Structure
The project structure is organized as follows:


components: Contains the Angular components for the login page and the chat functionality.
models: Contains the model for a chat message.
services: Contains Angular services for authentication and communication with the chatbot.
app.component: The main component of the application that loads and controls the other components.
app.module: The Angular module file where application components and services are registered.
app.routing: The routing configuration file for the application.

Installation
Make sure you have Node.js installed on your system.
Clone the project from GitHub: git clone https://github.com/dtuanv/chatBotFE
Navigate to the project directory: cd chatBotFE
Install the dependencies: npm install
Running the Application
Start the application: ng serve
Open your web browser and go to http://localhost:4200/
The login page will be displayed.
Log in to access the chatbot.
After logging in, the chat interface will be displayed, allowing you to ask questions and receive responses from the chatbot.
Customization
You can customize the project to fit your requirements by extending the Angular components, modifying CSS styles, or adding additional functionality. Please note that this readme provides basic information about the project structure and main functionalities of the chatbot. For more details, refer to the respective files in the source code.

Authors
This frontend chatbot project was developed by Team14.
