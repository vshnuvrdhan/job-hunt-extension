import { groqReply } from "./groq.js";
import { openAIReply } from "./openai.js";
import { buildReplyPrompt } from "../prompts/replyPrompt.js";

export async function generateReply({ mailText, mode, extra, model }) {
  const prompt = buildReplyPrompt({ mailText, mode, extra });

  if (model === "groq") {
    return await groqReply(prompt);
  }

  if (model === "openai") {
    return await openAIReply();
  }

  throw new Error("Invalid model selected");
}
