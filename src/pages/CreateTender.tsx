import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Download, Upload, Sparkles, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { chatWithAI, type ChatMessage } from '../lib/api'
import { rfpSystemPrompt } from '../data/mockData'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = ['IT Hardware', 'Cloud Services', 'Civil Works', 'Consulting']

export default function CreateTender() {
  const nav = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome! I'm your AI procurement assistant. I'll help you create a **GeM-compliant tender document** through a simple conversation.\n\n**What do you need to procure?** Describe your requirement in plain language.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [rfpGenerated, setRfpGenerated] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiMessages: ChatMessage[] = [
        { role: 'system', content: rfpSystemPrompt },
        ...newMessages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ]
      const response = await chatWithAI(apiMessages)
      setMessages([...newMessages, { role: 'assistant', content: response }])
      if (response.includes('Scoring Matrix') || response.includes('scoring matrix') || response.includes('Tender ID') || response.includes('Scope of Work')) {
        setRfpGenerated(true)
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'I apologize, there was an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleSuggestion(s: string) {
    setInput(`We need to procure ${s} for our ministry. Please help draft the tender.`)
  }

  function renderMarkdown(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-semibold text-gray-900 mt-3 mb-1">{line.replace('### ', '').replace(/[📋🏛️📊]/g, '')}</h3>
      if (line.startsWith('#### ')) return <h4 key={i} className="text-xs font-semibold text-brand-600 mt-2 mb-1 uppercase tracking-wide">{line.replace('#### ', '')}</h4>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-xs font-semibold text-gray-800 mt-1">{line.replace(/\*\*/g, '')}</p>
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-xs text-gray-600 ml-4 list-disc">{renderInline(line.slice(2))}</li>
      if (line.startsWith('| ')) {
        const cells = line.split('|').filter(Boolean).map(c => c.trim())
        if (cells.every(c => c.match(/^[-:]+$/))) return null
        return (
          <div key={i} className="grid text-[11px]" style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}>
            {cells.map((c, j) => (
              <div key={j} className={`px-2 py-1 border-b border-gray-100 ${j === 0 ? 'text-gray-700' : 'text-gray-500 text-right'}`}>
                {renderInline(c)}
              </div>
            ))}
          </div>
        )
      }
      if (line === '---') return <hr key={i} className="my-2 border-gray-200" />
      if (line.trim() === '') return <div key={i} className="h-1" />
      return <p key={i} className="text-xs text-gray-600 leading-relaxed">{renderInline(line)}</p>
    })
  }

  function renderInline(text: string) {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((p, i) => {
      if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="font-semibold text-gray-800">{p.slice(2, -2)}</strong>
      return p
    })
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => nav('/dashboard')} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Create new tender</h1>
          <p className="text-xs text-gray-500">AI-assisted RFP generation · GeM format</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 card min-h-[600px]">
        {/* Chat panel */}
        <div className="flex flex-col border-r border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-dot" />
            <span className="text-sm font-medium text-gray-700">AI procurement assistant</span>
            <span className="badge badge-active text-[10px] ml-auto">Powered by Llama 4</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`animate-slide-up flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                }`}>
                  {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-slide-up">
                <div className="bg-gray-100 rounded-xl rounded-bl-sm px-4 py-3">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your procurement need..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-brand-700 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex flex-col bg-gray-50/50">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={16} />
              Live RFP preview
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs py-1.5 px-3">
                <Download size={12} /> PDF
              </button>
              <button className="btn-primary text-xs py-1.5 px-3" disabled={!rfpGenerated}>
                <Upload size={12} /> Publish
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {rfpGenerated ? (
              <div className="bg-white rounded-lg border border-gray-200 p-5 animate-slide-up">
                <div className="text-center mb-4">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Government of India</div>
                  <div className="text-[10px] text-gray-400">Ministry of Defence</div>
                </div>
                <div className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  Request for proposal
                  <span className="badge badge-done text-[9px]">GeM compliant</span>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    ['Tender ID', `GEM/2026/B/DRAFT-${Math.floor(4000 + Math.random() * 999)}`],
                    ['Category', 'IT Hardware — Desktops'],
                    ['Estimated value', '₹4.25 Crore'],
                    ['EMD required', '₹8,50,000 (2%)'],
                    ['Bid deadline', '30 days from publish'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 text-xs">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-[11px] font-bold text-brand-600 uppercase tracking-wide mt-4 mb-2">Scope of work</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Supply, delivery, and installation of 500 desktop computer systems to Ministry offices across Delhi NCR. 
                  Each unit: Intel Core i5 (12th gen+) or AMD equivalent, 16GB DDR4 RAM, 512GB NVMe SSD, with 3-year on-site comprehensive warranty.
                </p>

                <h4 className="text-[11px] font-bold text-brand-600 uppercase tracking-wide mt-4 mb-2">Scoring matrix</h4>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-500">
                      <th className="px-2 py-1.5 font-normal">Criteria</th>
                      <th className="px-2 py-1.5 font-normal text-right">Weight</th>
                      <th className="px-2 py-1.5 font-normal text-right">Max</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t border-gray-100"><td className="px-2 py-1.5">Technical spec compliance</td><td className="px-2 py-1.5 text-right">30%</td><td className="px-2 py-1.5 text-right">30</td></tr>
                    <tr className="border-t border-gray-100"><td className="px-2 py-1.5">Past experience (3+ similar)</td><td className="px-2 py-1.5 text-right">15%</td><td className="px-2 py-1.5 text-right">15</td></tr>
                    <tr className="border-t border-gray-100"><td className="px-2 py-1.5">Warranty & support</td><td className="px-2 py-1.5 text-right">15%</td><td className="px-2 py-1.5 text-right">15</td></tr>
                    <tr className="border-t border-gray-100"><td className="px-2 py-1.5">Delivery commitment</td><td className="px-2 py-1.5 text-right">10%</td><td className="px-2 py-1.5 text-right">10</td></tr>
                    <tr className="border-t border-gray-100 font-medium text-brand-600"><td className="px-2 py-1.5">Financial bid (L1 method)</td><td className="px-2 py-1.5 text-right">30%</td><td className="px-2 py-1.5 text-right">30</td></tr>
                  </tbody>
                </table>

                <h4 className="text-[11px] font-bold text-brand-600 uppercase tracking-wide mt-4 mb-2">MSME preferences</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  25% of total procurement value reserved for MSME vendors per MSME Order 2018. 
                  Purchase preference of up to 20% price advantage for Class 1 local suppliers under Make-in-India (DPIIT Order).
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Sparkles size={40} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">RFP preview will appear here</p>
                <p className="text-xs text-gray-400 mt-1">Start chatting to generate your tender document</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
