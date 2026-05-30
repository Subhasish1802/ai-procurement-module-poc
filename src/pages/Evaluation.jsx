import { useState } from 'react';
import { Play, Eye, FileText, CheckCircle2, Clock, AlertTriangle, Shield, Download, ChevronDown, ChevronRight, Award, Loader2, Sparkles, XCircle } from 'lucide-react';
import { sampleBidders, evaluationCriteria, complianceChecks } from '../lib/sampleData';
import { callAI, SYSTEM_PROMPTS } from '../lib/ai';

const TABS = ['Pre-qualification', 'Technical', 'Financial', 'Compliance', 'Report'];

const rankColors = {
  1: 'bg-green-50 text-green-700 border-green-200',
  2: 'bg-blue-50 text-blue-700 border-blue-200',
  3: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function Evaluation() {
  const [activeTab, setActiveTab] = useState(1);
  const [expandedBidder, setExpandedBidder] = useState(0);
  const [aiRunning, setAiRunning] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const runAIEvaluation = async () => {
    setAiRunning(true);
    setAiError(null);
    try {
      const prompt = `Evaluate this government procurement bid for "500 Desktop Computers" tender.

Bidder: HP India Pvt Ltd
Bid Details:
- Offering Intel Core i5-13400 processor, 10 cores, 16 threads
- 16GB DDR4-3200MHz RAM, expandable to 32GB  
- 512GB PCIe NVMe M.2 SSD
- 3-year on-site comprehensive warranty, 4-hour response SLA
- 5 completed government orders (MoD, DRDO, MHA) totaling ₹22 Cr in last 3 years
- Delivery commitment: 30 days from PO
- Total bid: ₹3.92 Crore for 500 units

Evaluation Criteria:
1. CPU Specification (must be i5 12th gen or higher) — Max 10 points
2. RAM (must be 16GB DDR4+) — Max 10 points  
3. SSD (must be 512GB NVMe) — Max 10 points
4. Past Experience (3+ similar govt orders) — Max 15 points
5. Warranty Terms (3-year on-site required) — Max 15 points
6. Delivery Timeline (within 45 days) — Max 10 points

Provide your evaluation as a detailed JSON object with this structure:
{
  "bidder": "HP India",
  "totalScore": 62,
  "maxScore": 70,
  "criteria": [
    {"name": "...", "score": 10, "maxScore": 10, "passFail": "Pass", "evidence": "...", "page": 4, "rationale": "..."}
  ],
  "overallAssessment": "...",
  "flags": []
}

Return ONLY valid JSON, no markdown or explanation.`;

      const response = await callAI({
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.evaluator },
          { role: 'user', content: prompt },
        ],
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        temperature: 0.3,
        max_tokens: 2048,
      });

      try {
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);
        setAiResult(parsed);
      } catch {
        setAiResult({ raw: response });
      }
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiRunning(false);
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">IT Hardware — 500 Desktop Computers</h2>
          <p className="text-xs text-gray-500 mt-0.5">GEM/2026/B/4521 · 8 bids received · Evaluation in progress</p>
        </div>
        <button onClick={runAIEvaluation} disabled={aiRunning} className="btn-primary !text-xs">
          {aiRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {aiRunning ? 'Running AI...' : 'Run AI evaluation'}
        </button>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-5 gap-0 card overflow-hidden">
        {[
          { label: 'Pre-qualification', status: 'done', detail: '8/8 passed' },
          { label: 'Document AI', status: 'done', detail: 'All verified' },
          { label: 'Technical eval', status: 'active', detail: '6/8 scored' },
          { label: 'Financial eval', status: 'pending', detail: 'Pending' },
          { label: 'Compliance', status: 'pending', detail: 'Pending' },
        ].map((step, i) => (
          <div
            key={i}
            className={`px-3 py-3 text-center text-xs ${
              step.status === 'done' ? 'bg-green-50 text-green-700' :
              step.status === 'active' ? 'bg-amber-50 text-amber-700' :
              'bg-gray-50 text-gray-400'
            }`}
          >
            <div className="font-medium flex items-center justify-center gap-1">
              {step.status === 'done' && <CheckCircle2 className="w-3 h-3" />}
              {step.status === 'active' && <Clock className="w-3 h-3" />}
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.label.split(' ')[0]}</span>
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">{step.detail}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeTab === i
                ? 'text-blue-700 border-blue-700'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
            {i === 1 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px]">6/8</span>}
          </button>
        ))}
      </div>

      {/* AI Result Banner */}
      {aiResult && (
        <div className="card p-4 border-blue-200 bg-blue-50/30">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-3">
            <Sparkles className="w-4 h-4" /> AI evaluation result — HP India Pvt Ltd
          </div>
          {aiResult.criteria ? (
            <div className="space-y-2">
              {aiResult.criteria.map((c, i) => (
                <div key={i} className="flex items-center gap-3 text-xs bg-white rounded-lg px-3 py-2 border border-blue-100">
                  <span className="flex-1 text-gray-700">{c.name}</span>
                  <span className="font-mono font-medium text-blue-700">{c.score}/{c.maxScore}</span>
                  <span className={`badge ${c.passFail === 'Pass' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {c.passFail}
                  </span>
                  <span className="text-gray-400 max-w-[200px] truncate" title={c.rationale}>{c.rationale}</span>
                </div>
              ))}
              <div className="text-right text-sm font-semibold text-blue-800 mt-2">
                Total: {aiResult.totalScore}/{aiResult.maxScore}
              </div>
              {aiResult.overallAssessment && (
                <p className="text-xs text-gray-600 mt-2 p-3 bg-white rounded-lg border border-blue-100">{aiResult.overallAssessment}</p>
              )}
            </div>
          ) : (
            <pre className="text-xs text-gray-600 whitespace-pre-wrap bg-white p-3 rounded-lg border border-blue-100 max-h-60 overflow-y-auto">
              {aiResult.raw || JSON.stringify(aiResult, null, 2)}
            </pre>
          )}
        </div>
      )}

      {aiError && (
        <div className="card p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-sm text-red-700">
            <XCircle className="w-4 h-4" />
            <span className="font-medium">AI error:</span> {aiError}
          </div>
          <p className="text-xs text-red-600 mt-1">
            Make sure GROQ_API_KEY is set in your Netlify environment variables. Get a free key at console.groq.com
          </p>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 1 && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50/80 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Technical leaderboard</h3>
            <div className="text-[10px] text-gray-400">Scoring: 70% technical weight</div>
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-[40px_1.3fr_1fr_1fr_1fr_80px_60px] gap-2 px-5 py-2.5 bg-gray-50/50 text-[11px] text-gray-500 border-b border-gray-100">
            <div>#</div>
            <div>Bidder</div>
            <div>Spec match /30</div>
            <div>Experience /15</div>
            <div>Warranty /15</div>
            <div>Total /70</div>
            <div></div>
          </div>

          {/* Bidder rows */}
          {sampleBidders.map((b, i) => (
            <div key={b.id}>
              <div
                className="grid grid-cols-[40px_1fr] md:grid-cols-[40px_1.3fr_1fr_1fr_1fr_80px_60px] gap-2 px-5 py-3.5 border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors items-center"
                onClick={() => setExpandedBidder(expandedBidder === i ? -1 : i)}
              >
                <div>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border ${rankColors[b.rank] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {b.rank}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-[13px]">{b.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {b.type} · {b.localClass}
                    {b.msme && <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px] font-medium">MSME</span>}
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="font-mono text-sm font-medium text-gray-800">{b.scores.specMatch}/30</div>
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-1">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${(b.scores.specMatch / 30) * 100}%` }} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="font-mono text-sm font-medium text-gray-800">{b.scores.experience}/15</div>
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-1">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(b.scores.experience / 15) * 100}%` }} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="font-mono text-sm font-medium text-gray-800">{b.scores.warranty}/15</div>
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-1">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${(b.scores.warranty / 15) * 100}%` }} />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className={`font-mono text-base font-semibold ${b.rank === 1 ? 'text-green-700' : 'text-gray-800'}`}>
                    {b.scores.total}/70
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  {expandedBidder === i ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Expanded evidence */}
              {expandedBidder === i && (
                <div className="px-5 py-4 bg-gray-50/80 border-b border-gray-100 animate-slide-up">
                  <div className="text-xs font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> Evidence & rationale — {b.name}
                  </div>
                  <div className="space-y-2">
                    {Object.entries(b.evidence).map(([key, ev]) => (
                      <div key={key} className="flex items-start gap-3 bg-white rounded-lg px-4 py-3 border border-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-xs text-gray-500 mt-1 italic">"{ev.quote}"</div>
                        </div>
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium flex-shrink-0">
                          pg. {ev.page}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Total bid amount: <span className="font-medium text-gray-700">{b.totalBid}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Compliance tab */}
      {activeTab === 3 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 bg-gray-50/80 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">GFR 2017 compliance checks</h3>
          </div>
          {complianceChecks.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0">
              {c.status === 'pass' ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-800">{c.rule}</div>
                <div className="text-[11px] text-gray-500">{c.description}</div>
              </div>
              <span className={`badge ${c.status === 'pass' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {c.status === 'pass' ? 'Pass' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* L1 Recommendation */}
      <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-sm font-semibold text-green-800">Technical L1 recommendation</div>
            <div className="text-xs text-green-600 mt-0.5">HP India Pvt Ltd · 62/70 · ₹3.92 Cr</div>
          </div>
        </div>
      </div>

      {/* Approve bar */}
      <div className="card px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Shield className="w-4 h-4" />
          AI recommends only. Officer approval required per GFR 2017 Rule 170.
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <CheckCircle2 className="w-4 h-4" /> Approve & generate report
        </button>
      </div>
    </div>
  );
}
