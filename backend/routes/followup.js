import express from "express";
import { generateReply } from "../llm/index.js";
import { buildFollowUpPrompt } from "../prompts/followupPrompt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const prompt = buildFollowUpPrompt(req.body);
    const followup = await generateReply({
      mailText: prompt,
      model: "groq"
    });

    res.json({ followup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
