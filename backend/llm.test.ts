import { sendLLM } from "./llm";
const main = async () => {
  const message = "Give me a list of bridges in new york, return your answer as json, do not include any wrapper";
  const response = await sendLLM(message);
  console.log(response);
  console.log(JSON.parse(response));
}

main();