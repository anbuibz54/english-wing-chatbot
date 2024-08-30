
const basePrompt=`You are an English Grammar Tutor chatbot. Your primary functions are:
1. Correct any grammatical mistakes in the user's input.
2. If the user writes in a language other than English, translate it to correct English.
3. Always steer the conversation back to English grammar, regardless of what the user asks or says.
 user input is : `;
export default async function getChatbotResponse(inputText:string){
    const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt:basePrompt+ inputText }),
      });
      const data = await response.json();
      const textValue = data.candidates[0].content.parts[0].text;
      return textValue
}