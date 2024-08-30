
export async function POST(request: Request) {
    const { prompt } = await request.json();
      const input={
          contents:[{parts:[{text:prompt}]}]
      }
      const url=`${process.env.GEMINI_ENDPOINT}?key=${process.env.GEMINI_KEY}`
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await geminiResponse.json();
    return new Response(JSON.stringify(data));
  }