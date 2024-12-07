import * as React from "react";
import Markdown from "react-markdown";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export const UserRank = () => {
  const [renderedText, setRenderedText] = React.useState({
    strengthsText: "",
    questionsSolvedText: [],
    questionsIncorrectText: [],
    areasForImprovementText: "",
  });
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/userRank");
      const data = await response.json();
      setRenderedText(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <MathJaxContext>
        <MathJax dynamic hideUntilTypeset="every">
          <h1>Timmy's Math Results</h1>
          <div>
            <h2>Questions that Timmy Solved</h2>
            {renderedText.questionsSolvedText.map((question, index) => (
              <p key={index}>{question}</p>
            ))}
          </div>
          <div>
            <h2>Questions that Timmy got incorrect</h2>
            {renderedText.questionsIncorrectText.map((question, index) => (
              <p key={index}>{question}</p>
            ))}
          </div>
          <div>
            <h2>Timmy's Strengths</h2>
            <Markdown>{renderedText.strengthsText}</Markdown>
          </div>
          <div>
            <h2>Timmy's Areas for improvement</h2>

            <Markdown>{renderedText.areasForImprovementText}</Markdown>
          </div>
        </MathJax>
      </MathJaxContext>
    </div>
  );
};
