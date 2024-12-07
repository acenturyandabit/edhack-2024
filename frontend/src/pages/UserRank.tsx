import * as React from "react";
import Markdown from "react-markdown";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { State } from "./ServeQuestion";

export const UserRank = (props: {state: State}) => {
  const {state} = props;
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
          <details>
            <summary style={{ fontSize: "1.3em" }}>
              Questions that Timmy Solved
            </summary>
            {renderedText.questionsSolvedText.map((question, index) => (
              <p key={index}>{question}</p>
            ))}
          </details>
          <details>
            <summary style={{ fontSize: "1.3em" }}>
              Questions that Timmy got incorrect
            </summary>
            {renderedText.questionsIncorrectText.map((question, index) => (
              <p key={index}>{question}</p>
            ))}
          </details>
          <details>
            <summary style={{ fontSize: "1.3em" }}>Timmy's Strengths</summary>
            <Markdown>{renderedText.strengthsText}</Markdown>
          </details>
          <details>
            <summary style={{ fontSize: "1.3em" }}>
              Timmy's Areas for improvement
            </summary>
            <Markdown>{renderedText.areasForImprovementText}</Markdown>
          </details>
        </MathJax>

          {state.questionHistory.map((item, index) => (
            <div key={index}>
              <MathJax>{item.question}</MathJax>
              <MathJax>{item.response}</MathJax>
              <MathJax>{item.aiResponse}</MathJax>
            </div>
          ))}

      </MathJaxContext>
    </div>
  );
};
