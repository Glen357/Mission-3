const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const systemInstruction =
  "I want to be interviewed to fine tune my responses in an interview. I will provide a role title and the interview will begin. You will provide a welcome then ask one question specific to that role. I will answer that question. then you will acknowledge my answer without feedback, then ask the next question. There will be 2 questions and two answers. after that you can provide feed back on the answers I have provided";
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

let chatSession;
async function startChatSession() {
  chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  await chatSession.sendMessage(systemInstruction);
}

startChatSession()
  .then(() => console.log("Chat session started"))
  .catch((err) => console.error("Error starting chat session:", err));

app.post("/api/generateContent", async (req, res) => {
  try {
    console.log(req.body);
    const userMessage = req.body.prompt;

    if (!chatSession) {
      return res.status(500).json({ error: "Chat session not initialized" });
    }

    console.log("Sending message:", userMessage);
    const result = await chatSession.sendMessage(userMessage);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
