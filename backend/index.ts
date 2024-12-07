import express from "express";
import cors from "cors";
import { getDb } from "./db";
import { sendLLM } from "./llm";

const app = express();
const port = 3000;

const db = getDb();

const FORMAT_INSTRUCTIONS =
  "You may use MathJax in your response. Surround inline math expressions with single $ and block maths with $$.";

// Middleware to parse JSON body content
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/userRank", async (req, res) => {
  const questionsSolvedText = [
    "What is the area of a sector with radius 30cm and angle 60°?",
    "What is the volume of a cylinder with radius 10cm and height 20cm?",
    "What is the surface area of a sphere with radius 5cm?",
  ];
  const questionsIncorrectText = [
    "What is the area of a sector with radius 30cm and angle 220°?",
    "What is the volume of a cylinder with radius 10cm and slant height 20cm?",
    "What is the surface area of a hemisphere sphere with radius 5cm?",
  ];
  const strengthsText = await sendLLM(
    `Timmy has solved the following questions: ${questionsSolvedText.join(", ")}. What are his strengths? You may use MathJax in your response.`
  );
  const areasForImprovementText = await sendLLM(
    `Timmy has solved the following questions: ${questionsSolvedText.join(", ")}. What are the areas for improvement? You may use MathJax in your response.`
  );
  console.log(strengthsText);
  console.log(areasForImprovementText);
  res.send({
    strengthsText,
    questionsSolvedText: questionsSolvedText,
    questionsIncorrectText: questionsIncorrectText,
    areasForImprovementText,
  });
});

app.post("/api/userBank", async (req, res) => {
  const questionsSolvedText = req.body.data;
  const strengthsText = await sendLLM(
    `Timmy has solved the following questions correctly:
    ========
    ${questionsSolvedText}
    ========
    . What are his strengths? You may use MathJax in your response.`
  );
  const areasForImprovementText = await sendLLM(
    `Timmy has solved the following questions correctly: 
     ========
    ${questionsSolvedText}
    ========
    . What are the areas for improvement? You may use MathJax in your response.`
  );
  console.log(strengthsText)
  console.log(areasForImprovementText)
  res.send({
    strengthsText,
    questionsSolvedText: questionsSolvedText,
    areasForImprovementText,
  });
})

app.post("/api/userResponse", async (req, res) => {
  const question = req.body.question;
  const userResponse = req.body.response;
  const prompt = ` Question: ${question}.\n===========\nStudent: ${userResponse}.\n===========\n`+
  `Determine whether the student's response is correct or incorrect. If the student's response is incorrect, provide a reason for the incorrectness. If the student's response is correct, provide a reason for the correctness. Present your answer in language suitable for a high school student. ${FORMAT_INSTRUCTIONS}. Remember, start your explanation with a clear response of whether the student is correct or incorrect.`
  console.log(prompt)
  const response = await sendLLM(prompt);
  res.send({ response: response });
});

app.post("/api/serveQuestion", async (req, res) => {
  try {
    const { question: currQuestion, feedback } = req.body;

    let prompt;

    if (!feedback || feedback.trim() === "") {
      prompt = `
        Based on the question: "${currQuestion}",
        generate a new question with the same difficulty level to continue practicing the topic.
        Remove all wrapper and give the question as single string only.
      `;
    } else {
      prompt = `
        Based on the question: "${currQuestion}" and the feedback: "${feedback}",
        generate a new question that either:
        1. Reinforces the current topic at the same level if feedback indicates difficulty.
        2. Introduces a slightly harder challenge if feedback indicates mastery.
        Remove all wrapper and give the question as single string only.
      `;
    }
    const newQuestion = await sendLLM(prompt);

    res.send({ generatedQuestion: newQuestion });
  } catch (error) {
    console.error("Error generating question:", error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
