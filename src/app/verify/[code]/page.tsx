"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SEEDED_CERTIFICATES } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Lock,
  QrCode,
} from "lucide-react";

export default function CertificateVerificationPage() {
  const params = useParams();
  const code = (params?.code as string) || "CERT-CC-84920";

  const cert =
    SEEDED_CERTIFICATES.find(
      (c) => c.verificationCode.toLowerCase() === code.toLowerCase()
    ) || SEEDED_CERTIFICATES[0];

  return (
    <div className="min-h-screen bg-[#05060a] text-neutral-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-16 border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
            </span>
            <span className="text-[10px] text-neutral-400">Cryptographic Credential Verification</span>
          </div>
        </Link>

        <Link
          href="/login"
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
        >
          Enter Platform
        </Link>
      </header>

      {/* Main Certificate Verification View */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-3xl space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 py-2 rounded-2xl">
            <ShieldCheck className="h-4 w-4" />
            <span>Cryptographically Verified & Authentic Enterprise Credential</span>
          </div>

          {/* Certificate Frame */}
          <div className="relative rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-[#0e111a] via-[#090b14] to-[#090b14] p-8 md:p-12 shadow-2xl space-y-8 text-center overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
              <Award className="w-96 h-96 text-amber-400" />
            </div>

            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="h-8 w-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block font-bold">
                Capacity Connect Enterprise Academy
              </span>
              <h1 className="text-xl sm:text-2xl font-serif tracking-tight text-white">
                Certificate of Professional Competency
              </h1>
            </div>

            {/* Recipient */}
            <div className="space-y-2 py-4 border-y border-white/10">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                This credential is proud to certify that
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white">
                {cert.recipientName}
              </h2>
              <span className="text-xs text-neutral-300 block max-w-lg mx-auto">
                has successfully passed all formal assessments, practical lab simulations, and competency benchmarks for:
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-amber-300 pt-1">
                {cert.pathTitle}
              </h3>
            </div>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-left bg-black/40 p-4 rounded-2xl border border-white/5">
              <div>
                <span className="text-neutral-500 text-[10px] block">Verification ID</span>
                <span className="text-white font-bold">{cert.verificationCode}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] block">Date Issued</span>
                <span className="text-white font-bold">{cert.issuedAt}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] block">Assessment Score</span>
                <span className="text-emerald-400 font-bold">{cert.score}% (Honors)</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] block">Issuing Authority</span>
                <span className="text-cyan-300 font-bold truncate">CLO Enterprise</span>
              </div>
            </div>

            {/* Security Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400 pt-2">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>SHA-256 Ledger Hash: 8f92a...c041</span>
              </div>

              <span className="text-[11px] text-neutral-500">
                Official Digital Credential · Capacity Connect
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-neutral-500 border-t border-white/5">
        <p>CAPACITY CONNECT · Public Certificate Verification Service · Verifiable via REST API / Open Badges Standard</p>
      </footer>
    </div>
  );
}
