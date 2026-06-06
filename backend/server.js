import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("PortfolioPilot API Running");
});

app.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    const website = await axios.get(url);

    const html = website.data;

    const $ = cheerio.load(html);

    const title = $("title").text();

    const headings = $("h1,h2,h3")
      .map((i, el) => $(el).text())
      .get()
      .join("\n");

    const bodyText = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 5000);

    const prompt = `
You are an experienced recruiter reviewing a developer portfolio.

Portfolio Title:
${title}

Portfolio Headings:
${headings}

Portfolio Content:
${bodyText}

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "improvements": []
  "recruiterVerdict": ""
}

Rules:
- Score should be between 1 and 10.
- Give exactly 3 strengths.
- Give exactly 3 improvements.
- Do not include markdown.
- Do not include explanations outside JSON.
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    let text = completion.choices[0].message.content;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const review = JSON.parse(text);
      res.json(review);
    } catch {
      res.json({
        score: 7,
        strengths: ["Portfolio content detected"],
        improvements: ["AI response was not valid JSON"],
       });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      score: 0,
      strengths: ["Analysis failed"],
      improvements: ["Try another portfolio URL"],
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
