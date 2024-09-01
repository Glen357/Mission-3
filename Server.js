const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Ensure environment variables are loaded
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", //  frontend
  })
);

app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({ apiUrl: `http://localhost:${PORT}/api` });
});

app.post("/api/generateContent", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await model.generateContent(prompt);
    res.json({ response, text }); // Validate this with actual response structure
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.get("/", (req, res) => {
  res.send("This is my Interview API");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
({
  model: "gemini-1.5-pro",
  systemInstruction:
    "I want to be interviewed to fine tune my responses in an interview. I will provide a role title and the interview will begin. You will provide a welcome then ask one question specific to that role. I will answer that question. then you will acknowledge my answer without feedback, then ask the next question. There will be 2 questions and two answers. after that you can provide feed back on the answers I have provided",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();

// async function chat() {
//   // [START chat]
//   // Make sure to include these imports:
//   // import { GoogleGenerativeAI } from "@google/generative-ai";
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//   });
//   let result = await chat.sendMessage("I have 2 dogs in my house.");
//   console.log(result.response.text());
//   result = await chat.sendMessage("How many paws are in my house?");
//   console.log(result.response.text());
//   // [END chat]
// }
// async function runAll() {
//   // Comment out or delete any sample cases you don't want to run.
//   await chat();
// }

// runAll();
