import * as React from "react";
import Markdown from "react-markdown";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { State } from "./ServeQuestion";
import { config } from "../mathJaxConfig";

export const UserRank = (props: { state: State }) => {
  const { state } = props;
  const [renderedText, setRenderedText] = React.useState({
    strengthsText: "",
    questionsSolvedText: [] as string[],
    areasForImprovementText: "",
  });
  const getSampleData = () => {
    const fetchData = async () => {
      const response = await fetch("/api/userRank");
      const data = await response.json();
      setRenderedText(data);
    };
    fetchData();
  };

  React.useEffect(() => {
    fetchAIAnswer(renderedText.questionsSolvedText);
  }, [renderedText.questionsSolvedText]);

  const fetchAIAnswer = async (questionsSolvedText: string[]) => {
    console.log(JSON.stringify(questionsSolvedText.join(", ")));
    const response = await fetch("/api/userBank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: questionsSolvedText.join(", ") }),
    });
    const data = await response.json();
    setRenderedText((prevstate) => {
      return {
        ...prevstate,
        strengthsText: data.strengthsText,
        areasForImprovementText: data.areasForImprovementText,
      };
    });
  };

  React.useEffect(() => {
    setRenderedText({
      strengthsText: "",
      questionsSolvedText: [
        ...renderedText.questionsSolvedText,
        ...state.questionHistory.map((i) => i.question),
      ],
      areasForImprovementText: "",
    });
  }, [state.questionHistory]);

  // {state.questionHistory.map((item, index) => (
  //   <div key={index}>
  //     <MathJax>{item.question}</MathJax>
  //     <MathJax>{item.response}</MathJax>
  //     <MathJax>{item.aiResponse}</MathJax>
  //   </div>
  // ))}

  return (
    <div>
      <MathJaxContext version={3} config={config}>
        <MathJax dynamic hideUntilTypeset="every">
          <h1>Timmy's Math Results</h1>
          <button onClick={getSampleData}>Generate sample data</button>
          <details>
            <summary style={{ fontSize: "1.3em" }}>
              Questions that Timmy Solved
            </summary>
            {renderedText.questionsSolvedText.map((question, index) => (
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
      </MathJaxContext>
    </div>
  );
};
