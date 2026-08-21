"use client";
// ACED — AdminDashboard
// Pending transcript verifications, image preview, Verify & Mint button, success modal

import { useState } from "react";
import { ShieldCheck, Eye, CheckCircle, X, Loader2, ExternalLink, AlertTriangle } from "lucide-react";

interface Submission {
  id: string;
  displayName: string;
  email: string;
  course: string;
  grade: string;
  submittedAt: string;
  imageUrl: string;
  status: "pending" | "verifying" | "verified" | "rejected";
  txHash?: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  { id: "VS001", displayName: "Scholar_X42", email: "s***@funaab.edu.ng", course: "CSC301", grade: "A",  submittedAt: "2 hours ago",  imageUrl: "https://via.placeholder.com/400x280?text=Transcript+Preview", status: "pending" },
  { id: "VS002", displayName: "ProTutor_77",  email: "p***@unilag.edu.ng", course: "MTH201", grade: "A",  submittedAt: "5 hours ago",  imageUrl: "https://via.placeholder.com/400x280?text=Transcript+Preview", status: "pending" },
  { id: "VS003", displayName: "AceIt_Chem",  email: "a***@ui.edu.ng",     course: "CHM201", grade: "A",  submittedAt: "1 day ago",    imageUrl: "https://via.placeholder.com/400x280?text=Transcript+Preview", status: "verified",  txHash: "c5d6e7f8a9b0c1d2e3f4" },
  { id: "VS004", displayName: "DevMaster_08", email: "d***@oau.edu.ng",    course: "CSC401", grade: "B", submittedAt: "2 days ago",   imageUrl: "https://via.placeholder.com/400x280?text=Transcript+Preview", status: "rejected" },
  { id: "VS005", displayName: "AlgoQueen_22", email: "a***@unn.edu.ng",    course: "MTH301", grade: "A",  submittedAt: "3 days ago",   imageUrl: "https://via.placeholder.com/400x280?text=Transcript+Preview", status: "pending" },
];

const STATUS_STYLE: Record<Submission["status"], string> = {
  pending:   "bg-aced-gold/10 text-aced-gold border-aced-gold/20",
  verifying: "bg-aced-blue/10 text-aced-blue border-aced-blue/20",
  verified:  "bg-aced-green/10 text-aced-green border-aced-green/20",
  rejected:  "bg-red-50 text-aced-red border-red-200",
};

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [preview, setPreview]         = useState<Submission | null>(null);
  const [mintSuccess, setMintSuccess] = useState<{ name: string; course: string; txHash: string } | null>(null);

  function handleVerify(id: string) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: "verifying" } : s));
    // Simulate XRPL mint — 2 seconds
    setTimeout(() => {
      const mockTx = `XRPL_NFT_${Math.random().toString(36).slice(2, 12).toUpperCase()}`;
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: "verified", txHash: mockTx } : s));
      const sub = submissions.find(s => s.id === id);
      if (sub) setMintSuccess({ name: sub.displayName, course: sub.course, txHash: mockTx });
    }, 2000);
  }

  function handleReject(id: string) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: "rejected" } : s));
  }

  const pending = submissions.filter(s => s.status === "pending" || s.status === "verifying");
  const done    = submissions.filter(s => s.status === "verified" || s.status === "rejected");

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-aced-text">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Transcript verifications · XRPL NFT minting</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 bg-aced-gold/10 rounded-[var(--radius-aced)] border border-aced-gold/20">
              <p className="text-xl font-heading font-bold text-aced-gold">{pending.length}</p>
              <p className="text-[10px] text-aced-gold uppercase tracking-wider">Pending</p>
            </div>
            <div className="text-center px-4 py-2 bg-aced-green/10 rounded-[var(--radius-aced)] border border-aced-green/20">
              <p className="text-xl font-heading font-bold text-aced-green">{submissions.filter(s => s.status === "verified").length}</p>
              <p className="text-[10px] text-aced-green uppercase tracking-wider">Verified</p>
            </div>
          </div>
        </div>

        {/* Pending table */}
        <div className="bg-white rounded-[var(--radius-aced-lg)] border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertTriangle size={16} className="text-aced-gold" />
            <h2 className="font-heading font-bold text-aced-text">Pending Verifications</h2>
            <span className="ml-auto text-xs font-bold bg-aced-gold/10 text-aced-gold px-2 py-0.5 rounded-full">{pending.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Tutor", "Email", "Course", "Grade", "Submitted", "Transcript", "Status", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {submissions.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-aced-royal to-aced-blue flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {s.displayName.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-aced-text">{s.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{s.email}</td>
                    <td className="px-4 py-3 font-mono font-bold text-aced-royal text-xs">{s.course}</td>
                    <td className="px-4 py-3 font-bold text-aced-green">{s.grade}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{s.submittedAt}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setPreview(s)}
                        className="flex items-center gap-1 text-xs text-aced-blue font-bold hover:underline"
                      >
                        <Eye size={12} /> Preview
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLE[s.status]}`}>
                        {s.status}
                      </span>
                      {s.txHash && (
                        <a href={`https://testnet.xrpl.org/transactions/${s.txHash}`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-[9px] text-aced-blue hover:underline mt-0.5">
                          Tx: {s.txHash.slice(0, 8)}… <ExternalLink size={8} />
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {(s.status === "pending" || s.status === "verifying") && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVerify(s.id)}
                            disabled={s.status === "verifying"}
                            className="flex items-center gap-1.5 text-xs font-bold bg-aced-green text-white px-3 py-1.5 rounded-lg hover:opacity-90 disabled:opacity-60 disabled:cursor-wait transition-opacity"
                          >
                            {s.status === "verifying"
                              ? <><Loader2 size={11} className="animate-spin" /> Minting…</>
                              : <><ShieldCheck size={11} /> Verify & Mint</>
                            }
                          </button>
                          {s.status === "pending" && (
                            <button
                              onClick={() => handleReject(s.id)}
                              className="text-xs font-bold text-aced-red border border-red-200 bg-red-50 px-2 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── TRANSCRIPT PREVIEW MODAL ── */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-[var(--radius-aced-lg)] shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-heading font-bold text-aced-text">{preview.displayName}</h3>
                <p className="text-xs text-gray-400">{preview.course} · Grade {preview.grade}</p>
              </div>
              <button onClick={() => setPreview(null)} className="p-1.5 rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Image placeholder */}
              <div className="bg-gray-50 rounded-[var(--radius-aced)] overflow-hidden border border-gray-200">
                <img src={preview.imageUrl} alt="Transcript" className="w-full object-contain max-h-64" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Tutor</p>
                  <p className="font-bold text-aced-text">{preview.displayName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Course</p>
                  <p className="font-bold text-aced-royal font-mono">{preview.course} — {preview.grade}</p>
                </div>
              </div>
              {(preview.status === "pending" || preview.status === "verifying") && (
                <div className="flex gap-3">
                  <button
                    onClick={() => { handleVerify(preview.id); setPreview(null); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-aced-green text-white font-bold rounded-[var(--radius-aced)] hover:opacity-90 transition-opacity"
                  >
                    <ShieldCheck size={16} /> Verify & Mint NFT
                  </button>
                  <button
                    onClick={() => { handleReject(preview.id); setPreview(null); }}
                    className="px-5 py-3 border border-red-200 bg-red-50 text-aced-red font-bold rounded-[var(--radius-aced)] hover:bg-red-100 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS MODAL ── */}
      {mintSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[var(--radius-aced-lg)] shadow-2xl w-full max-w-sm p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-aced-green/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-aced-green" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-aced-text">NFT Minted!</h3>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-bold text-aced-text">{mintSuccess.name}</span> is now verified for <span className="font-mono font-bold text-aced-royal">{mintSuccess.course}</span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-[var(--radius-aced)] p-3 font-mono text-xs text-gray-600 break-all">
              <p className="text-[10px] text-gray-400 mb-1">Transaction Hash</p>
              {mintSuccess.txHash}
            </div>
            <a
              href={`https://testnet.xrpl.org/transactions/${mintSuccess.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs text-aced-blue hover:underline"
            >
              View on XRPL Testnet <ExternalLink size={11} />
            </a>
            <button
              onClick={() => setMintSuccess(null)}
              className="w-full py-3 bg-aced-royal text-white font-bold rounded-[var(--radius-aced)] hover:bg-aced-blue transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}