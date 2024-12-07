import express from 'express';
import cors from 'cors';
import { getDb } from './db';
import { sendLLM } from './llm';

const app = express();
const port = 3000;

const db = getDb();

// Middleware to parse JSON body content
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/userRank', async (req, res) => {
  const questionsSolvedText = ["What is the area of a sector with radius 30cm and angle 60°?",
    "What is the volume of a cylinder with radius 10cm and height 20cm?",
    "What is the surface area of a sphere with radius 5cm?"
  ];
  res.send({
    strengthsText: await sendLLM(`Timmy has solved the following questions: ${questionsSolvedText.join(', ')}. What are his strengths?`),
    questionsSolvedText: questionsSolvedText,
    areasForImprovementText: await sendLLM(`Timmy has solved the following questions: ${questionsSolvedText.join(', ')}. What are the areas for improvement?`),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});