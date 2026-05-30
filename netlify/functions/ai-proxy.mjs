// Netlify Function — proxies requests to Groq API
// Keeps API key server-side (set GROQ_API_KEY in Netlify env vars)

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'GROQ_API_KEY not configured. Set it in Netlify Environment Variables.' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { messages, model, temperature, max_tokens, response_format } = body;

    const payload = {
      model: model || 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages,
      temperature: temperature ?? 0.7,
      max_tokens: max_tokens || 4096,
    };

    if (response_format) {
      payload.response_format = response_format;
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || 'Groq API error', details: data }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        content: data.choices?.[0]?.message?.content || '',
        model: data.model,
        usage: data.usage,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
