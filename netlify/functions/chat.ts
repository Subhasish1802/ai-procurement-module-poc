import type { Handler } from '@netlify/functions'

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ''
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

const SYSTEM_PROMPT = `You are an AI Government Procurement RFP drafting assistant for Indian government tendering.
Help officers create GeM-compliant tender documents through natural conversation.
Follow GFR 2017 (Rules 144-175), include MSME clauses per Order 2018, Make-in-India per DPIIT.
Generate scoring matrices, eligibility criteria, and standard tender sections.
Use markdown formatting. Be professional but conversational. Keep responses concise.
When you have enough information, generate structured RFP sections with tables.`

async function callNvidia(messages: any[]): Promise<string> {
  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta/llama-4-maverick-17b-128e-instruct',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`NVIDIA API error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

async function callGroq(messages: any[]): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`Groq API error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  try {
    const { messages } = JSON.parse(event.body || '{}')
    if (!messages?.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Messages required' }) }
    }

    let content = ''

    // Try NVIDIA NIM first, fallback to Groq
    if (NVIDIA_API_KEY) {
      try {
        content = await callNvidia(messages)
      } catch (e) {
        console.log('NVIDIA failed, trying Groq:', e)
      }
    }

    if (!content && GROQ_API_KEY) {
      try {
        content = await callGroq(messages)
      } catch (e) {
        console.log('Groq also failed:', e)
      }
    }

    if (!content) {
      return {
        statusCode: 503,
        body: JSON.stringify({ error: 'No API keys configured. Set NVIDIA_API_KEY or GROQ_API_KEY in Netlify environment variables.' }),
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
