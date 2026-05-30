// Netlify Function — proxies requests to NVIDIA NIM API (Groq as fallback)
// Set NVIDIA_API_KEY and GROQ_API_KEY in Netlify Environment Variables

const NVIDIA_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const NVIDIA_DEFAULT_MODEL = 'meta/llama-4-maverick-17b-128e-instruct';
const GROQ_FALLBACK_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';

async function callProvider(endpoint, apiKey, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { response, data };
}

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

  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  if (!nvidiaKey && !groqKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'No API keys configured. Set NVIDIA_API_KEY or GROQ_API_KEY in Netlify Environment Variables.' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { messages, temperature, max_tokens, response_format } = body;

    const basePayload = {
      messages,
      temperature: temperature ?? 0.7,
      max_tokens: max_tokens || 4096,
    };

    if (response_format) {
      basePayload.response_format = response_format;
    }

    // Try NVIDIA first
    if (nvidiaKey) {
      const payload = { ...basePayload, model: NVIDIA_DEFAULT_MODEL };
      const { response, data } = await callProvider(NVIDIA_ENDPOINT, nvidiaKey, payload);

      if (response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            content: data.choices?.[0]?.message?.content || '',
            model: data.model,
            usage: data.usage,
            provider: 'nvidia',
          }),
        };
      }
      console.warn('NVIDIA API failed, falling back to Groq:', data.error?.message);
    }

    // Fallback to Groq
    if (groqKey) {
      const payload = { ...basePayload, model: GROQ_FALLBACK_MODEL };
      const { response, data } = await callProvider(GROQ_ENDPOINT, groqKey, payload);

      if (response.ok) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            content: data.choices?.[0]?.message?.content || '',
            model: data.model,
            usage: data.usage,
            provider: 'groq',
          }),
        };
      }

      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || 'Both NVIDIA and Groq API calls failed', details: data }),
      };
    }

    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'NVIDIA API failed and no Groq fallback key is configured.' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
