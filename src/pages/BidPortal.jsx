import { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Building2, CreditCard, Shield, ChevronRight } from 'lucide-react';

const STEPS = ['Company details', 'Documents', 'Technical proposal', 'Bill of quantities', 'EMD & fees', 'Review & submit'];

export default function BidPortal() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    pan: '',
    gst: '',
    msmeStatus: '',
    contactEmail: '',
    contactPhone: '',
  });

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Bid submission portal</h2>
        <p className="text-xs text-gray-500 mt-0.5">IT Hardware — 500 Desktop Computers · GEM/2026/B/4521</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-0 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <button
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                i === step ? 'bg-blue-700 text-white' :
                i < step ? 'bg-green-50 text-green-700' : 'text-gray-400'
              }`}
            >
              {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">{i + 1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" /> Company details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Company name *</label>
                <input className="input-field" placeholder="e.g. HP India Pvt Ltd" value={formData.companyName} onChange={e => update('companyName', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">PAN number *</label>
                <input className="input-field" placeholder="AAACH1234A" value={formData.pan} onChange={e => update('pan', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">GST number *</label>
                <input className="input-field" placeholder="29AAACH1234A1Z5" value={formData.gst} onChange={e => update('gst', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">MSME status</label>
                <select className="input-field" value={formData.msmeStatus} onChange={e => update('msmeStatus', e.target.value)}>
                  <option value="">Not MSME</option>
                  <option value="micro">Micro Enterprise</option>
                  <option value="small">Small Enterprise</option>
                  <option value="medium">Medium Enterprise</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Contact email *</label>
                <input className="input-field" type="email" placeholder="contact@company.com" value={formData.contactEmail} onChange={e => update('contactEmail', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Contact phone *</label>
                <input className="input-field" type="tel" placeholder="+91 98765 43210" value={formData.contactPhone} onChange={e => update('contactPhone', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Required documents
            </h3>
            {[
              { name: 'Company registration certificate', required: true },
              { name: 'PAN card copy', required: true },
              { name: 'GST registration certificate', required: true },
              { name: 'MSME registration (Udyam)', required: false },
              { name: 'Past experience certificates', required: true },
              { name: 'Financial statements (last 3 years)', required: true },
            ].map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 border-dashed hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-700">{doc.name}</div>
                  <div className="text-[10px] text-gray-400">PDF, JPG, PNG · Max 10MB</div>
                </div>
                {doc.required && <span className="text-[10px] text-red-500 font-medium">Required</span>}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Technical proposal
            </h3>
            <div className="p-4 rounded-lg border-2 border-dashed border-gray-200 text-center hover:border-blue-300 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Upload your technical proposal</div>
              <div className="text-xs text-gray-400 mt-1">PDF format · Max 50MB</div>
            </div>
            <div className="space-y-3 mt-4">
              <h4 className="text-xs font-medium text-gray-700">Key specifications (auto-extracted by AI)</h4>
              {['CPU Model & Specifications', 'RAM Type & Capacity', 'SSD Type & Capacity', 'Warranty Terms', 'Delivery Timeline'].map(spec => (
                <div key={spec}>
                  <label className="text-xs text-gray-500 mb-1 block">{spec}</label>
                  <input className="input-field" placeholder={`Enter ${spec.toLowerCase()}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Bill of quantities
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2 text-xs text-gray-500 font-normal">Item</th>
                    <th className="text-center px-4 py-2 text-xs text-gray-500 font-normal">Qty</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500 font-normal">Unit rate (₹)</th>
                    <th className="text-right px-4 py-2 text-xs text-gray-500 font-normal">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'Desktop Computer (i5, 16GB, 512GB)', qty: 500, rate: '' },
                    { item: 'Monitor 21.5" FHD', qty: 500, rate: '' },
                    { item: 'Keyboard & Mouse combo', qty: 500, rate: '' },
                    { item: 'UPS 600VA', qty: 500, rate: '' },
                    { item: '3-Year On-site Warranty', qty: 500, rate: '' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-700">{row.item}</td>
                      <td className="px-4 py-2 text-center text-gray-600">{row.qty}</td>
                      <td className="px-4 py-2"><input className="input-field text-right !py-1" placeholder="0.00" /></td>
                      <td className="px-4 py-2 text-right text-gray-500">—</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t border-gray-200">
                    <td colSpan="3" className="px-4 py-2 text-sm font-medium text-gray-700 text-right">Grand total</td>
                    <td className="px-4 py-2 text-right font-semibold text-gray-900">₹ —</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" /> EMD & tender fee
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Earnest Money Deposit (EMD)</div>
                <div className="text-lg font-semibold text-gray-900">₹8,50,000</div>
                <div className="text-[10px] text-gray-400 mt-1">2% of estimated value</div>
                <div className="mt-3 p-3 rounded-lg border-2 border-dashed border-gray-200 text-center cursor-pointer hover:border-blue-300 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                  <div className="text-xs text-gray-500">Upload payment proof</div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Tender fee</div>
                <div className="text-lg font-semibold text-gray-900">₹5,000</div>
                <div className="text-[10px] text-gray-400 mt-1">Non-refundable</div>
                <div className="mt-3 p-3 rounded-lg border-2 border-dashed border-gray-200 text-center cursor-pointer hover:border-blue-300 transition-colors">
                  <Upload className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                  <div className="text-xs text-gray-500">Upload payment proof</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Review & submit
            </h3>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700">
                Once submitted, your bid will be <strong>locked</strong> and cannot be modified. Please review all documents and details carefully before proceeding.
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {['Company details', 'Documents uploaded', 'Technical proposal', 'Bill of quantities', 'EMD payment proof'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                  <span className="ml-auto text-xs text-green-600 font-medium">Complete</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn-secondary disabled:opacity-40"
        >
          Previous
        </button>
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Shield className="w-4 h-4" /> Submit bid
          </button>
        )}
      </div>
    </div>
  );
}
