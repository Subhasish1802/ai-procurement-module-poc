import { useNavigate } from 'react-router-dom'
import { FileText, Clock, CheckCircle2, Zap, Plus, Eye, Download, Edit, ArrowUpRight } from 'lucide-react'
import { tenders, activities, stats } from '../data/mockData'

const iconMap: Record<string, any> = { file: FileText, clock: Clock, check: CheckCircle2, zap: Zap }
const statusMap: Record<string, { class: string; label: string }> = {
  active: { class: 'badge-active', label: 'Bids open' },
  evaluating: { class: 'badge-eval', label: 'Evaluating' },
  completed: { class: 'badge-done', label: 'Completed' },
  draft: { class: 'badge-draft', label: 'Draft' },
}
const dotColor: Record<string, string> = { success: 'bg-emerald-500', info: 'bg-blue-500', warning: 'bg-amber-500', purple: 'bg-purple-500' }

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Overview of your procurement activity</p>
        </div>
        <button onClick={() => nav('/tenders/new')} className="btn-primary">
          <Plus size={16} /> New tender
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = iconMap[s.icon]
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <Icon size={14} className={s.color} />
                {s.label}
              </div>
              <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Tenders table */}
      <div className="card mb-6">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Active tenders</h2>
          <span className="text-xs text-gray-400">{tenders.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-4 py-2.5 font-normal">Tender</th>
                <th className="px-4 py-2.5 font-normal">Status</th>
                <th className="px-4 py-2.5 font-normal">Bids</th>
                <th className="px-4 py-2.5 font-normal">Evaluation</th>
                <th className="px-4 py-2.5 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((t) => {
                const st = statusMap[t.status]
                return (
                  <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{t.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{t.id} · {t.estimatedValue}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${st.class}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{t.bidsReceived || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="w-full max-w-[120px]">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${t.evalProgress}%`,
                              backgroundColor: t.evalProgress === 100 ? '#16a34a' : t.evalProgress > 0 ? '#f59e0b' : '#e5e7eb',
                            }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">
                          {t.status === 'completed' && t.l1Bidder
                            ? `L1: ${t.l1Bidder} · ${t.l1Amount}`
                            : t.evalProgress > 0
                            ? `Technical: ${t.evalProgress}%`
                            : t.status === 'active'
                            ? 'Awaiting bid close'
                            : 'RFP in progress'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {t.status === 'evaluating' && (
                          <button
                            onClick={() => nav(`/evaluate/${t.id}`)}
                            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-300 transition-colors"
                            title="View evaluation"
                          >
                            <Eye size={14} />
                          </button>
                        )}
                        {t.status === 'completed' && (
                          <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors" title="Download report">
                            <Download size={14} />
                          </button>
                        )}
                        {t.status === 'draft' && (
                          <button
                            onClick={() => nav('/tenders/new')}
                            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-600 transition-colors"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Recent activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {activities.map((a, i) => (
            <div key={i} className="px-4 py-3 flex gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor[a.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{a.text}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
              </div>
              <ArrowUpRight size={14} className="text-gray-300 mt-1 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
