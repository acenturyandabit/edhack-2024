import * as fs from 'fs';


export const processImage = async (message: string): Promise<string> => {
    
    const imageName = 'math1.png';
    

    const imageBuffer = fs.readFileSync(imageName).toString('base64');
    const { LLM_API_KEY, LLM_URL, LLM_MODEL } = process.env;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LLM_API_KEY}`,
      };
    
    const body = JSON.stringify({
        model: "llama-3.2-90b-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: message
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/png;base64,${imageBuffer}`
                        }
                    }
                ]
            }
        ],
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
      });

    const response = await fetch(LLM_URL as string, {
        method: "POST",
        body: body, 
        headers: headers,
      });
    
    const data = await response.json();
    
    return data.choices[0];
    // return data.choices[0].message;
}


const main = async () => {
    const message = "Generate 1 question of the same type as the one in the image, return in JSON format";
    const response = await processImage(message);
    console.log(response);
}

main();