export const sendLLM = async (message: string): Promise<string> => {
  const { LLM_API_KEY, LLM_URL, LLM_MODEL } = process.env;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LLM_API_KEY}`,
  };
  const body = JSON.stringify({
    model: LLM_MODEL,
    messages: [{
      role: "user", content: message
    }]
  });

  const response = await fetch(LLM_URL as string, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.choices[0].message.content;
}
