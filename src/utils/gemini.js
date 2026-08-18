import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constant";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default geminiModel;
