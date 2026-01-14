import express from "express";
import { generateReply } from "../llm/index.js";

const router = express.Router();

router.post("/reply", async (req, res) => {
  try {
    const reply = await generateReply(req.body);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
