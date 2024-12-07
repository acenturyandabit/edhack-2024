import { useState } from "react";
import * as React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Question
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        1 + 1 = ?
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Input your answer here
      </Typography>
      <TextField
        placeholder="Answer"
        variant="outlined"
        value={answer}
        onChange={handleInputChange}
        sx={{ mb: 2, width: "300px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Button>Next</Button>
    </Box>
  );
};

export default ServeQuestionPage;
