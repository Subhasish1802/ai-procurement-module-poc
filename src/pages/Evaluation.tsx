import { useState } from 'react'
import { ArrowLeft, Play, Eye, FileText, CheckCircle2, XCircle, Clock, Shield, Download, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { bidders } from '../data/mockData'

const tabs = ['Pre-qual', 'Technical', 'Financial', 'Compliance', 'Report']
const pipeSteps = [
  { label: 'Pre-qualification', status: 'done', detail: '8/8 passed' },
  { label: 'Document AI', status: 'done', detail: 'All verified' },
  { label: 'Technical eval', status: 'active', detail: '6/8 scored' },
  { label: 'Financial eval', status: 'pending', detail: 'Pending' },
  { label: 'Compliance', status: 'pending', detail: 'Pending' },
]

export default function Evaluation() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState(1)
  const [expanded, setExpanded] = useState<string | null>('B001')
  const [running, setRunning] = useState(false)

  function runEvaluation() {
    setRunning(true)
    setTimeout(() => setRunning(false), 2000)
  }

  const rankColors = ['bg-emerald-50 text-emerald-700', 'bg-blue-50 text-blue-700', 'bg-amber-50 text-amber-700']

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => nav('/dashboard')} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">Evaluation — IT Hardware · 500 Desktops</h1>
          <p className="text-xs text-gray-500">GEM/2026/B/4521 · 8 bids received · Started 2 hours ago</p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="flex gap-0 mb-5 rounded-lg overflow-hidden">
        {pipeSteps.map((s, i) => (
          <div
            key={i}
            className={`flex-1 px-3 py-2.5 text-center text-xs ${
              s.status === 'done'
                ? 'bg-emerald-50 text-emerald-700'
                : s.status === 'active'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <div className="font-medium flex items-center justify-center gap-1">
              {s.status === 'done' && <CheckCircle2 size={12} />}
              {s.status === 'active' && <Clock size={12} />}
              {s.label}
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">{s.detail}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-5">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-xs border-b-2 transition-colors ${
              activeTab === i
                ? 'text-brand-600 border-brand-600 font-medium'
                : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            {t}
            {t === 'Technical' && <span className="ml-1.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px]">6/8</span>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 1 && (
        <>
          {/* Leaderboard */}
          <div className="card mb-5">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-sm font-semibold text-gray-800">Technical leaderboard</h2>
              <button onClick={runEvaluation} className="btn-primary text-xs py-1.5 px-3" disabled={running}>
                {running ? (
                  <><Clock size={12} className="animate-spin" /> Processing...</>
                ) : (
                  <><Play size={12} /> Run remaining</>
                )}
              </button>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-[40px_1.2fr_1fr_1fr_1fr_80px_60px] px-4 py-2 bg-gray-50 text-[11px] text-gray-500 border-b border-gray-100">
              <div>#</div>
              <div>Bidder</div>
              <div>Spec match /30</div>
              <div>Experience /15</div>
              <div>Warranty /15</div>
              <div>Total /70</div>
              <div></div>
            </div>

            {/* Bidder rows */}
            {bidders.map((b, i) => (
              <div key={b.id}>
                <div
                  className={`grid grid-cols-[40px_1.2fr_1fr_1fr_1fr_80px_60px] px-4 py-3 items-center text-sm border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer ${expanded === b.id ? 'bg-blue-50/30' : ''}`}
                  onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                >
                  <div>
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${rankColors[i] || 'bg-gray-100 text-gray-500'}`}>
                      {b.rank}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{b.name}</div>
                    <div className={`text-[10px] mt-0.5 ${b.msme ? 'text-blue-600' : 'text-gray-400'}`}>
                      {b.type} · {b.localClass}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium" style={{ color: b.scores.specMatch >= 26 ? '#16a34a' : b.scores.specMatch >= 22 ? '#f59e0b' : '#dc2626' }}>
                      {b.scores.specMatch}/30
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 w-16">
                      <div className="h-full rounded-full" style={{ width: `${(b.scores.specMatch / 30) * 100}%`, backgroundColor: b.scores.specMatch >= 26 ? '#16a34a' : '#f59e0b' }} />
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium">{b.scores.experience}/15</div>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 w-16">
                      <div className="h-full rounded-full bg-blue-400" style={{ width: `${(b.scores.experience / 15) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm font-medium">{b.scores.warranty}/15</div>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 w-16">
                      <div className="h-full rounded-full bg-blue-400" style={{ width: `${(b.scores.warranty / 15) * 100}%` }} />
                    </div>
                  </div>
                  <div className="font-mono text-sm font-semibold text-gray-900">{b.scores.total}/70</div>
                  <div>
                    {expanded === b.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>

                {/* Expanded evidence */}
                {expanded === b.id && b.evidence.length > 0 && (
                  <div className="px-4 py-4 bg-gray-50/50 border-b border-gray-100 animate-slide-up">
                    <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Eye size={14} className="text-brand-600" />
                      Criteria breakdown — {b.name}
                    </div>
                    <div className="space-y-0">
                      {b.evidence.map((e, j) => (
                        <div key={j} className="grid grid-cols-[1.5fr_60px_60px_1fr_60px] gap-2 py-2 border-b border-gray-200/50 items-center text-xs">
                          <div className="text-gray-700">{e.criterion}</div>
                          <div className="font-mono font-medium text-emerald-600">{e.score}</div>
                          <div className="flex items-center gap-1">
                            {e.status === 'pass' ? (
                              <><CheckCircle2 size={12} className="text-emerald-500" /><span className="text-emerald-600 font-medium">Pass</span></>
                            ) : (
                              <><XCircle size={12} className="text-red-500" /><span className="text-red-600 font-medium">Fail</span></>
                            )}
                          </div>
                          <div className="text-gray-400 italic text-[11px] leading-snug">
                            {e.evidence} <span className="text-blue-500 not-italic cursor-pointer">{e.page}</span>
                          </div>
                          <div>
                            <button className="px-2 py-1 rounded border border-gray-200 text-[10px] text-blue-600 hover:bg-blue-50 flex items-center gap-1">
                              <FileText size={10} /> Doc
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* L1 highlight */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
              <CheckCircle2 size={18} />
              Technical L1 recommendation
            </div>
            <div className="text-lg font-semibold text-emerald-700">HP India Pvt Ltd · 62/70</div>
          </div>

          {/* Approval bar */}
          <div className="card px-5 py-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield size={14} />
              AI recommends only. Officer approval required per GFR 2017 Rule 170.
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2">
              <Shield size={14} /> Approve & generate report
            </button>
          </div>
        </>
      )}

      {activeTab === 2 && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4">Financial evaluation — L1 determination</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-3 py-2 font-normal">Rank</th>
                <th className="px-3 py-2 font-normal">Bidder</th>
                <th className="px-3 py-2 font-normal">Total bid amount</th>
                <th className="px-3 py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...bidders].sort((a, b) => parseFloat(a.amount.replace(/[₹ Cr]/g, '')) - parseFloat(b.amount.replace(/[₹ Cr]/g, ''))).map((b, i) => (
                <tr key={b.id} className={`border-t border-gray-100 ${i === 0 ? 'bg-emerald-50/50' : ''}`}>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${i === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{i + 1}</span>
                  </td>
                  <td className="px-3 py-2.5 font-medium">{b.name}</td>
                  <td className="px-3 py-2.5 font-mono">{b.amount}</td>
                  <td className="px-3 py-2.5">
                    {i === 0 ? (
                      <span className="badge badge-done">L1 Bidder</span>
                    ) : i === 3 ? (
                      <span className="badge bg-amber-50 text-amber-600 flex items-center gap-1"><AlertTriangle size={10} /> Low outlier</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 3 && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4">GFR 2017 compliance checks</h3>
          <div className="space-y-2">
            {[
              { rule: 'Rule 144 — Procurement method selection', status: 'pass' },
              { rule: 'Rule 153 — Minimum bid submission period (21 days)', status: 'pass' },
              { rule: 'Rule 161 — EMD within prescribed limits (2-5%)', status: 'pass' },
              { rule: 'Rule 170 — Award to L1 unless justified', status: 'pass' },
              { rule: 'MSME Order 2018 — 25% reservation', status: 'pass' },
              { rule: 'DPIIT Make-in-India — Local content preference', status: 'pass' },
              { rule: 'CVC Guidelines — Tender committee constituted', status: 'pass' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1">{c.rule}</span>
                <span className="badge badge-done text-[10px]">Pass</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 4 && (
        <div className="card p-5 text-center">
          <Download size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Evaluation report</h3>
          <p className="text-xs text-gray-500 mb-4">RTI-ready, CVC-defensible report with full audit trail</p>
          <button className="btn-primary mx-auto">
            <Download size={14} /> Generate PDF report
          </button>
        </div>
      )}

      {activeTab === 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-4">Pre-qualification checklist</h3>
          <div className="space-y-2">
            {bidders.map((b) => (
              <div key={b.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-100">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{b.name}</div>
                  <div className="text-[10px] text-gray-400">{b.type} · {b.localClass}</div>
                </div>
                <div className="flex gap-1">
                  {['EMD', 'Fee', 'Docs', 'GST', 'PAN'].map((d) => (
                    <span key={d} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-medium">{d} ✓</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
