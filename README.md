Interview Coaching App

Interview Coaching App is a personalized chatbot that helps users prepare for job interviews by generating interview questions based on the provided job title. The app uses Google Gemini AI to simulate a conversational interview, offering feedback and guidance.

This app currently only asks two questions and recives the answers before providing feedback on the way the user interviewd. This is easily expanded by adjusting the system instructions in Server.js - I have just left it at 2 for faster testing

Features
Job-specific interview questions: Enter a job title, and the chatbot will ask role-specific questions.

Interactive conversation: Users answer questions, and the chatbot provides the next question after acknowledging the response.

Feedback: After two questions and responses, the chatbot gives feedback on the answers provided.

Technologies Used
React.js: Frontend framework for the user interface.
Google Gemini AI: Powers the chatbot's conversational logic.
Node.js/Express.js: Backend API and server logic.
CSS Modules: Scoped CSS for styling.

Project Structure
App.jsx: Main component handling user input, displaying the conversation, and interacting with the AI.
Server.js: Express.js server that manages API requests and communicates with the Google Gemini API.

Installation
Clone the repository:
git clone https://github.com/Glen357/InterviewCoachingApp.git

Navigate into the project directory:
cd InterviewCoachingApp

Install dependencies:
npm install

Create a .env file and add your API key and environment variables:
GEMINI_API_KEY=your_api_key

Start the server
node server.js

Start the frontend:
cd client
npm run dev

Usage
Enter the job title in the input field and start the interview.
Answer the chatbot’s questions, and after two questions, feedback will be provided.
Continue practicing with various roles to improve your interview skills.

Future Improvements
adjust onClick to hand keyPress
Add more comprehensive feedback.
Extend the conversation for more questions.
Integrate a logging system for analytics.
