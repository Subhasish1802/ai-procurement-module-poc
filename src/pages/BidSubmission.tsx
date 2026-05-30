import { useState } from 'react'
import { ArrowLeft, Upload, CheckCircle2, FileText, Building2, CreditCard, Send, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const steps = ['Company details', 'Documents', 'Technical proposal', 'Bill of quantities', 'EMD & fees', 'Review & submit']

export default function BidSubmission() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    company: 'TechVision Solutions Pvt Ltd',
    pan: 'AABCT1234A',
    gst: '29AABCT1234A1Z5',
    msme: true,
    msmeReg: 'KA-19-0012345',
    msmeCategory: 'Micro',
    address: '42 Rajaji Nagar, Bengaluru 560010',
    contact: 'Priya Sharma',
    email: 'priya@techvision.in',
    phone: '+91 98765 43210',
  })

  const [uploads, setUploads] = useState({
    gstCert: true,
    panCard: true,
    msmeCert: true,
    incorporationCert: true,
    turnoverCert: false,
    technicalProposal: false,
    boq: false,
    emdReceipt: false,
    tenderFee: false,
  })

  function toggleUpload(key: string) {
    setUploads(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center animate-slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Bid submitted successfully</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your bid for IT Hardware — 500 Desktops has been locked and submitted.
          You will receive a confirmation email at {form.email}.
        </p>
        <div className="card p-4 text-left mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Submission ID</span><span className="font-mono font-medium">BID-2026-04521-006</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tender</span><span className="font-medium">GEM/2026/B/4521</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Company</span><span className="font-medium">{form.company}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Timestamp</span><span className="font-mono text-xs">{new Date().toISOString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="badge badge-done">Locked & submitted</span></div>
          </div>
        </div>
        <button onClick={() => nav('/dashboard')} className="btn-primary mx-auto">
          Back to dashboard
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => nav('/dashboard')} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Submit bid — IT Hardware · 500 Desktops</h1>
          <p className="text-xs text-gray-500">GEM/2026/B/4521 · Deadline: 30 Jun 2026</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex gap-1 mb-6">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex-1 py-2 text-center text-[11px] rounded-md transition-colors ${
              i === step
                ? 'bg-brand-600 text-white font-medium'
                : i < step
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i < step && <CheckCircle2 size={10} className="inline mr-1" />}
            {s}
          </button>
        ))}
      </div>

      <div className="card p-5">
        {/* Step 0: Company details */}
        {step === 0 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 size={16} className="text-brand-600" /> Company details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Company name *</label>
                <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">PAN number *</label>
                <input type="text" value={form.pan} onChange={e => setForm({...form, pan: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">GST number *</label>
                <input type="text" value={form.gst} onChange={e => setForm({...form, gst: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Contact person *</label>
                <input type="text" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Registered address *</label>
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.msme} onChange={e => setForm({...form, msme: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-sm text-gray-700">MSME registered vendor</span>
                </label>
                {form.msme && (
                  <div className="grid grid-cols-2 gap-3 mt-3 pl-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">MSME registration no.</label>
                      <input type="text" value={form.msmeReg} onChange={e => setForm({...form, msmeReg: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Category</label>
                      <select value={form.msmeCategory} onChange={e => setForm({...form, msmeCategory: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30">
                        <option>Micro</option>
                        <option>Small</option>
                        <option>Medium</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Documents */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-brand-600" /> Document uploads
            </h3>
            <div className="space-y-3">
              {[
                { key: 'gstCert', label: 'GST registration certificate', required: true },
                { key: 'panCard', label: 'PAN card copy', required: true },
                { key: 'msmeCert', label: 'MSME / Udyam registration', required: form.msme },
                { key: 'incorporationCert', label: 'Certificate of incorporation', required: true },
                { key: 'turnoverCert', label: 'Audited financials (last 3 years)', required: true },
              ].map(doc => (
                <div
                  key={doc.key}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    uploads[doc.key as keyof typeof uploads]
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => toggleUpload(doc.key)}
                >
                  {uploads[doc.key as keyof typeof uploads] ? (
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Upload size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">{doc.label}</div>
                    {uploads[doc.key as keyof typeof uploads] && (
                      <div className="text-[10px] text-emerald-600 mt-0.5">✓ document_uploaded.pdf — 2.4 MB</div>
                    )}
                  </div>
                  {doc.required && <span className="text-[10px] text-red-400">Required</span>}
                  <button className={`px-3 py-1 rounded text-xs ${uploads[doc.key as keyof typeof uploads] ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {uploads[doc.key as keyof typeof uploads] ? 'Uploaded' : 'Upload'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Technical proposal */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-brand-600" /> Technical proposal
            </h3>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                uploads.technicalProposal ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-200 hover:border-brand-300'
              }`}
              onClick={() => toggleUpload('technicalProposal')}
            >
              {uploads.technicalProposal ? (
                <>
                  <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-medium text-emerald-700">Technical_Proposal_HP_India.pdf uploaded</p>
                  <p className="text-xs text-emerald-600 mt-1">24 pages · 8.2 MB · Click to replace</p>
                </>
              ) : (
                <>
                  <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Drop your technical proposal PDF here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse · Max 50MB · PDF only</p>
                </>
              )}
            </div>
            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Key specifications (auto-extracted or fill manually)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Processor</label>
                  <input type="text" defaultValue="Intel Core i5-13400, 10 cores" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">RAM</label>
                  <input type="text" defaultValue="16GB DDR4-3200MHz" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Storage</label>
                  <input type="text" defaultValue="512GB PCIe NVMe M.2 SSD" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Warranty</label>
                  <input type="text" defaultValue="3-year on-site comprehensive" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: BoQ */}
        {step === 3 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-brand-600" /> Bill of quantities
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-gray-500">
                    <th className="px-3 py-2 font-normal">#</th>
                    <th className="px-3 py-2 font-normal">Item description</th>
                    <th className="px-3 py-2 font-normal">Qty</th>
                    <th className="px-3 py-2 font-normal">Unit price</th>
                    <th className="px-3 py-2 font-normal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-3 py-2">1</td>
                    <td className="px-3 py-2">Desktop PC (i5, 16GB, 512GB SSD)</td>
                    <td className="px-3 py-2">500</td>
                    <td className="px-3 py-2"><input type="text" defaultValue="₹68,400" className="w-24 px-2 py-1 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></td>
                    <td className="px-3 py-2 font-mono font-medium">₹3,42,00,000</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-3 py-2">2</td>
                    <td className="px-3 py-2">Keyboard + Mouse combo</td>
                    <td className="px-3 py-2">500</td>
                    <td className="px-3 py-2"><input type="text" defaultValue="₹1,200" className="w-24 px-2 py-1 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></td>
                    <td className="px-3 py-2 font-mono font-medium">₹6,00,000</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-3 py-2">3</td>
                    <td className="px-3 py-2">Installation & setup (per unit)</td>
                    <td className="px-3 py-2">500</td>
                    <td className="px-3 py-2"><input type="text" defaultValue="₹800" className="w-24 px-2 py-1 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" /></td>
                    <td className="px-3 py-2 font-mono font-medium">₹4,00,000</td>
                  </tr>
                  <tr className="border-t-2 border-gray-300 font-semibold">
                    <td className="px-3 py-2" colSpan={4}>Grand total (excl. GST)</td>
                    <td className="px-3 py-2 font-mono text-brand-600">₹3,52,00,000</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-3 py-2 text-gray-500" colSpan={4}>GST @ 18%</td>
                    <td className="px-3 py-2 font-mono text-gray-500">₹63,36,000</td>
                  </tr>
                  <tr className="border-t border-gray-100 font-bold text-brand-600">
                    <td className="px-3 py-2" colSpan={4}>Total bid amount (incl. GST)</td>
                    <td className="px-3 py-2 font-mono">₹4,15,36,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step 4: EMD & Fees */}
        {step === 4 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-brand-600" /> EMD & tender fee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Earnest money deposit (EMD)</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">₹8,50,000</div>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${uploads.emdReceipt ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-200'}`}
                  onClick={() => toggleUpload('emdReceipt')}
                >
                  {uploads.emdReceipt ? (
                    <><CheckCircle2 size={20} className="mx-auto text-emerald-500 mb-1" /><p className="text-xs text-emerald-600">EMD receipt uploaded</p></>
                  ) : (
                    <><Upload size={20} className="mx-auto text-gray-300 mb-1" /><p className="text-xs text-gray-500">Upload EMD payment proof</p></>
                  )}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Tender fee</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">₹5,000</div>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${uploads.tenderFee ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-200'}`}
                  onClick={() => toggleUpload('tenderFee')}
                >
                  {uploads.tenderFee ? (
                    <><CheckCircle2 size={20} className="mx-auto text-emerald-500 mb-1" /><p className="text-xs text-emerald-600">Tender fee receipt uploaded</p></>
                  ) : (
                    <><Upload size={20} className="mx-auto text-gray-300 mb-1" /><p className="text-xs text-gray-500">Upload tender fee receipt</p></>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div className="animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Send size={16} className="text-brand-600" /> Review & submit
            </h3>
            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Company</div>
                <div className="text-sm font-medium">{form.company}</div>
                <div className="text-xs text-gray-400 mt-0.5">PAN: {form.pan} · GST: {form.gst} {form.msme && `· MSME: ${form.msmeReg}`}</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Documents uploaded</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {Object.entries(uploads).map(([k, v]) => (
                    <span key={k} className={`px-2 py-0.5 rounded text-[10px] font-medium ${v ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                      {k.replace(/([A-Z])/g, ' $1').trim()} {v ? '✓' : '✗'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Total bid amount</div>
                <div className="text-lg font-semibold text-brand-600 font-mono">₹4,15,36,000</div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 mb-4">
              <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700 leading-relaxed">
                Once submitted, your bid will be <strong>locked</strong> and cannot be modified. 
                Ensure all documents are correct before proceeding. The bid will be opened only after the submission deadline.
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
              <Send size={16} /> Submit & lock bid
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-secondary disabled:opacity-40"
          >
            Previous
          </button>
          {step < 5 && (
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              className="btn-primary"
            >
              Next step
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
