import * as React from "react";

export const UserRank = () => {
  const [renderedText, setRenderedText] = React.useState({
    strengthsText: "",
    questionsSolvedText: [],
    areasForImprovementText: "",
  });
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/userRank");
      const data = await response.json();
      setRenderedText(data);
    };
    fetchData();
  },
  []);
  return (
    <div>
      <h1>Timmy's Math Results</h1>
      <div>
        <h2>Questions that Timmy Solved</h2>
        {renderedText.questionsSolvedText.map((question, index) => (
          <p key={index}>{question}</p>
        ))}
      </div>
      <div>
        <h2>Questions that Timmy got incorrect</h2>
        {renderedText.questionsSolvedText.map((question, index) => (
          <p key={index}>{question}</p>
        ))}
      </div>
      <div>
        <h2>Timmy's Strengths</h2>
        <p>{renderedText.strengthsText}</p>
      </div>
      <div>
        <h2>Timmy's Areas for improvement</h2>
        <p>{renderedText.areasForImprovementText}</p>
      </div>
    </div>
  );
};