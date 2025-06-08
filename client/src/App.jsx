import { useState } from "react";
import myStyles from "./App.module.css";


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
    <>
    <div className= {myStyles.headerContainer}><header><h1>Welcome To Your Personal Interview Coach</h1></header></div>
    <div className= {myStyles.pageContainer}>
      <div className= {myStyles.interactSpace}>
          <div className= {myStyles.jobTitleBox}>
      {/* this is the job title input field */}
      <input
        type="text"
        value={jobTitle}
        onChange={(event) => setJobTitle(event.target.value)}
        placeholder="Enter the Job Title"
      />
      <button onClick={handleJobTitleSubmit}>Start Interview</button>
      </div>
      {/* this is where you answer the chatbots questions it uses a map method to render an array of items as a list of html properties,(turning strings into paragraphs)
      It also sets an index position with the key prop(so that react knows which items have changed), and embeds dynamic content or a JSX expression in the html*/}
      <div className= {myStyles.conversationSpace}>
      {/* <textarea
        rows="auto"
        cols="50"
        readOnly
        value={conversationText}
        style={{ width: "97%", marginTop: "15px" }}
      /> */}
      <div>
        {conversation.map((response, index) => (
          <p key={index}>{response.text}</p>
        ))}
      </div>
      </div>
      {/* this is where the answer to the chatbots question is answered by the user, and the button to submit it */}
      <div className= {myStyles.responseBox}>
      <input
        type="text"
        value={currentAnswer}
        onChange={(event) => setCurrentAnswer(event.target.value)}
        placeholder="Write your response"
      />
      <button onClick={handleAnswerSubmit}>Submit Response</button>
      </div>
      </div>
    </div>
    </>
  );
}

export default InterviewApp;

