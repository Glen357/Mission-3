import { useState } from "react";
// import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API URL:", API_URL);

async function getGeneratedContent(prompt) {
  console.log(prompt);
  const response = await fetch(`${API_URL}/generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "prompt": prompt}),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`); // Better error handling
  }
  const data = await response.json();
  return data.response;
}

function InterviewApp() {
  const [jobTitle, setJobTitle] = useState("");
  const [conversation, setConversation] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleJobTitleSubmit = async (event) => {
    event.preventDefault();
    const prompt = jobTitle;
    console.log(prompt);
    const initialQuestion = await getGeneratedContent(prompt);
    setConversation([{ role: "User", text: initialQuestion }]);
  };

  const handleAnswerSubmit = async () => {
    const newConversation = [
      ...conversation,
      { role: "User", text: currentAnswer },
    ];
    setConversation(newConversation);

    const nextQuestion = await getGeneratedContent(currentAnswer);
    setConversation([
      ...newConversation,
      { role: "model", text: nextQuestion },
    ]);

    setCurrentAnswer("");
  };

  const conversationText = conversation
    .map((entry) => `${entry.role}: ${entry.text}`)
    .join("\n");

  return (
    <div>
      {/* this is the job title input field */}
      <input
        type="text"
        value={jobTitle}
        onChange={(event) => setJobTitle(event.target.value)}
        placeholder="Enter the Job Title"
      />
      <button onClick={handleJobTitleSubmit}>Start Interview</button>
      {/* this is where you answer the chatbots questions it uses a map method to render an array of items as a list of html properties,(turning strings into paragraphs)
      It also sets an index position with the key prop(so that react knows which items have changed), and embeds dynamic content or a JSX expression in the html*/}
      <textarea
        rows="10"
        cols="50"
        readOnly
        value={conversationText}
        style={{ width: "100%", marginTop: "20px" }}
      />
      <div>
        {conversation.map((response, index) => (
          <p key={index}>{response.text}</p>
        ))}
      </div>
      {/* this is where the answer to the chatbots question is answered by the user, and the button to submit it */}
      <input
        type="text"
        value={currentAnswer}
        onChange={(event) => setCurrentAnswer(event.target.value)}
        placeholder="Write your response"
      />
      <button onClick={handleAnswerSubmit}>Submit Response</button>
    </div>
  );
}

export default InterviewApp;

// ***************************************************************************************

// async function getGeneratedContent(prompt) {
//   const result = await model.generateContent(prompt);
//   return result;
// }

// const response = await fetch("/api/jobtitle", {
//   method: "POST",
//   headers: {
//     "content-type": "application.json",
//   },
//   body: JSON.stringify({ title: jobTitle }),
// });
// const data = await response.json();
// console.log(data, "job title has been defined");
