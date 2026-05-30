import type { Handler } from '@netlify/functions'

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ''
const GROQ_API_KEY = process.env.GROQ_API_KEY || ''

const EVAL_PROMPT = `You are an AI Bid Evaluation Engine for Indian government procurement.
Evaluate the submitted bid against the tender criteria.
For each criterion, provide: score, pass/fail, evidence quote, and rationale.
Be precise, cite page numbers, and ensure every score is justifiable per GFR 2017.
Output as structured markdown with a table.`

async function callAI(messages: any[]): Promise<string> {
  // Try NVIDIA first
  if (NVIDIA_API_KEY) {
    try {
      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${NVIDIA_API_KEY}` },
        body: JSON.stringify({
          model: 'deepseek-ai/deepseek-r1',
          messages: [{ role: 'system', content: EVAL_PROMPT }, ...messages],
          max_tokens: 1024,
          temperature: 0.3,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        return data.choices?.[0]?.message?.content || ''
      }
    } catch (e) { console.log('NVIDIA eval failed:', e) }
  }
  // Fallback to Groq
  if (GROQ_API_KEY) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: 'deepseek-r1-distill-llama-70b',
        messages: [{ role: 'system', content: EVAL_PROMPT }, ...messages],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    })
    if (res.ok) {
      const data = await res.json()
      return data.choices?.[0]?.message?.content || ''
    }
  }
  throw new Error('No API available')
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  try {
    const { tender, bid } = JSON.parse(event.body || '{}')
    const content = await callAI([{
      role: 'user',
      content: `Tender Requirements:\n${tender}\n\nBid Submission:\n${bid}\n\nEvaluate this bid.`
    }])
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }
  } catch (err: any) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
