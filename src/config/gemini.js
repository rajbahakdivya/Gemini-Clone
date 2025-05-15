//AIzaSyCtq3XmYUxpWlq8rfsmeBdNKXQtAgmAYKM

// Import the Google Generative AI SDK
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Set your Gemini model and API key
const MODEL_NAME = "gemini-2.5-flash-preview-04-17"; // Use gemini-1.5-pro-latest for the latest version
const API_KEY = "AIzaSyAdsKgUy2w2hF04a2MNhi0GtQ7kPsOe5Lk"; // 🔥 Replace with your real API key

async function runChat(promptText) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = await model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(promptText);
  const response = result.response;

  const finalText = await response.text();
  console.log(finalText);
  return finalText;
}

export default runChat;

