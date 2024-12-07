import { useState } from "react";
import * as React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const testStr = `What is the area of a sector with radius 30cm and angle 60°?`;

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

type QuestionAndResponse = {
  question: string;
  response: string | undefined;
  aiResponse: string | undefined;
};

type Mode = "Presenting Question" | "Waiting for AI Answer";

const ServeQuestionPage = () => {
  const [state, setState] = useState<{
    questionHistory: Array<QuestionAndResponse>;
    answer: string;
    currentState: Mode;
  }>({
    questionHistory: [],
    answer: "",
    currentState: "Presenting Question",
  });

  React.useEffect(() => {
    setState((prevState) => {
      prevState.questionHistory.push({
        question: testStr,
        response: undefined,
        aiResponse: undefined,
      });
      return {
        ...prevState,
      };
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      answer: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setState((prevState) => {
      prevState.questionHistory[prevState.questionHistory.length - 1].response =
        prevState.answer;
      prevState.answer = "";
      fetchAIAnswer(
        prevState.questionHistory[prevState.questionHistory.length - 1]
      );
      return {
        ...prevState,
        currentState: "Waiting for AI Answer",
      };
    });
  };

  const fetchAIAnswer = async (questionAndResponse: QuestionAndResponse) => {
    const response = await fetch("/api/userResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionAndResponse),
    });
    const data = await response.json();
    setState((prevState) => {
      prevState.questionHistory[
        prevState.questionHistory.length - 1
      ].aiResponse = data.response;
      return {
        ...prevState,
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <MathJaxContext version={3} config={config}>
        <MathJax dynamic hideUntilTypeset="every">
          {state.questionHistory.map((item, index) => (
            <div>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                Question
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                <MathJax>{testStr}</MathJax>
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Input your answer here
              </Typography>
              <TextField
                placeholder="Answer"
                variant="outlined"
                value={state.answer}
                onChange={handleInputChange}
                sx={{ mb: 2, width: "100%" }}
              />
            </div>
          ))}
        </MathJax>
      </MathJaxContext>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Button>Next</Button>
    </Box>
  );
};

export default ServeQuestionPage;
