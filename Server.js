const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function initializeExpressApp() {
  const App = express();

  App.use(express.json()); // This may not be necessary as I am providing and and being returned strings

  App.get("/", (req, res) => {
    res.send("Hello, welcome to the interview prep Api");
  });
  const port = process.env.PORT;
  App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
module.exports = initializeExpressApp;

async function getGeneratedContent(prompt) {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

getGeneratedContent("What is the weather like today?");

const prompt = "Write a story about a magic backpack.";
