import { useState } from "react";
import * as React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const testStr = `When $a \\ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

const ServeQuestionPage = () => {
  const [answer, setAnswer] = useState("");
  //   const [question, setQuestion] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Your answer is: ${answer}`);
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
        value={answer}
        onChange={handleInputChange}
        sx={{ mb: 2, width: "100%"}}
      />
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
