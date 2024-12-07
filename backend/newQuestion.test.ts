import { beforeEach, describe, it, expect } from "@jest/globals";

const jest = require("jest");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

// Mock the sendLLM function
const sendLLM = jest.fn();

app.get("/api/serveQuestion", async (req, res) => {
  try {
    const { question: currQuestion, feedback } = req.body;

    let prompt;

    if (!feedback || feedback.trim() === "") {
      prompt = `
        Based on the question: "${currQuestion}",
        generate a new question with the same difficulty level to continue practicing the topic.
      `;
    } else {
      prompt = `
        Based on the question: "${currQuestion}" and the feedback: "${feedback}",
        generate a new question that either:
        1. Reinforces the current topic at the same level if feedback indicates difficulty.
        2. Introduces a slightly harder challenge if feedback indicates mastery.
      `;
    }

    const newQuestion = await sendLLM(prompt);

    res.send({ generatedQuestion: newQuestion });
  } catch (error) {
    console.error("Error generating question:", error);
    res.status(500).send({ error: "Failed to generate question." });
  }
});

describe("GET /api/serveQuestion", () => {
  beforeEach(() => {
    sendLLM.mockClear();
  });

  it("should generate a question with the same difficulty when feedback is empty", async () => {
    sendLLM.mockResolvedValue("Generated question with same difficulty");

    const response = await request(app)
      .get("/api/serveQuestion")
      .send({ question: "What is 2+2?", feedback: "" });

    expect(response.status).toBe(200);
    expect(response.body.generatedQuestion).toBe(
      "Generated question with same difficulty"
    );
    expect(sendLLM).toHaveBeenCalledWith(
      expect.stringContaining(
        "generate a new question with the same difficulty level"
      )
    );
  });

  it("should generate a question based on feedback", async () => {
    sendLLM.mockResolvedValue("Generated advanced question");

    const response = await request(app)
      .get("/api/serveQuestion")
      .send({ question: "What is 2+2?", feedback: "Mastery" });

    expect(response.status).toBe(200);
    expect(response.body.generatedQuestion).toBe("Generated advanced question");
    expect(sendLLM).toHaveBeenCalledWith(
      expect.stringContaining("generate a new question that either")
    );
  });

  it("should return a 500 error if sendLLM fails", async () => {
    sendLLM.mockRejectedValue(new Error("Mocked LLM failure"));

    const response = await request(app)
      .get("/api/serveQuestion")
      .send({ question: "What is 2+2?", feedback: "Difficulty" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to generate question.");
    expect(sendLLM).toHaveBeenCalled();
  });
});
