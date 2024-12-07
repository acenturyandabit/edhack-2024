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

type Mode =
  | "Presenting Question"
  | "Waiting for AI Answer"
  | "Fetching question"
  | "Student reading answer";

export type State = {
  questionHistory: Array<QuestionAndResponse>;
  answer: string;
  currentState: Mode;
};

const ServeQuestionPage = (props: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) => {
  const { state, setState } = props;

  React.useEffect(() => {
    if (state.questionHistory.length == 0) {
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
    }
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
        questionHistory: [...prevState.questionHistory],
        currentState: "Waiting for AI Answer",
      };
    });
  };

  // const handleNext = () => {
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       questionHistory: [...prevState.questionHistory],
  //       currentState: "Fetching question",
  //     };
  //   });

  //   setTimeout(() => {
  //     setState((prevState) => {
  //       return {
  //         ...prevState,
  //         questionHistory: [
  //           ...prevState.questionHistory,
  //           {
  //             question: testStr + "third one",
  //             response: undefined,
  //             aiResponse: undefined,
  //           },
  //         ],
  //         currentState: "Presenting Question",
  //       };
  //     });
  //   }, 1000);
  // };

  const handleNext = async () => {
    const currQuestion =
      state.questionHistory[state.questionHistory.length - 1];
    const feedback = "This question is too easy.";

    const response = await fetch("/api/serveQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: currQuestion,
        feedback: feedback,
      }),
    });

    const data = await response.json();
    const newQuestion = data.generatedQuestion;
    console.log(newQuestion);

    setState((prevState) => {
      return {
        ...prevState,
        questionHistory: [
          ...prevState.questionHistory,
          {
            question: newQuestion,
            response: undefined,
            aiResponse: undefined,
          },
        ],
        currentState: "Presenting Question",
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
        // force child rerender
        questionHistory: [...prevState.questionHistory],
        currentState: "Student reading answer",
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
      <QuestionHistory questionHistory={state.questionHistory} />
      {state.currentState == "Presenting Question" && (
        <div>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
      {state.currentState == "Waiting for AI Answer" && (
        <div>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Groq is reading your response...
          </Typography>
        </div>
      )}
      {state.currentState == "Student reading answer" && (
        <div>
          <Typography variant="body1" sx={{ mb: 1 }}>
            When you're ready, press Next.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      )}
      {state.currentState == "Fetching question" && (
        <div>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Groq is making a new question...
          </Typography>
        </div>
      )}
    </Box>
  );
};

// performance optimisation
const QuestionHistory = (props: {
  questionHistory: Array<QuestionAndResponse>;
}) => {
  const { questionHistory } = props;
  return (
    <MathJaxContext version={3} config={config}>
      <MathJax dynamic hideUntilTypeset="every">
        {questionHistory.map((item, index) => (
          <div key={index}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              Question {index + 1}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              <MathJax>{item.question}</MathJax>
            </Typography>
            {item.response && (
              <>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Student's Response
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {item.response}
                </Typography>
              </>
            )}
            {item.aiResponse && (
              <>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Groq Says:
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {item.aiResponse}
                </Typography>
              </>
            )}
          </div>
        ))}
      </MathJax>
    </MathJaxContext>
  );
};

export default ServeQuestionPage;
