"use client";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, Building2, Info } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-lg flex items-center justify-center transform -rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <div className="flex items-end space-x-[2px] h-3.5">
                <div className="w-1 h-1.5 bg-white/85 rounded-sm" />
                <div className="w-1 h-2.5 bg-white/95 rounded-sm" />
                <div className="w-1 h-3.5 bg-white rounded-sm" />
              </div>
            </div>
            <span className="font-bold text-white tracking-wide">Pippulse FX</span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="relative z-10 max-w-[860px] mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Page Title */}
        <div className="mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Risk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Legal, Disclaimer &amp; Risk Warning
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
            Please read the following information carefully before using our platform or services.
          </p>
        </div>

        <div className="h-px bg-white/10 mb-14" />

        {/* Company Information */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-[#10B981]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Company Information</h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
              <span className="text-white/40 text-sm font-medium">Company name</span>
              <span className="text-white text-sm font-semibold">INVESTMINFX LIMITED</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
              <span className="text-white/40 text-sm font-medium">Registered address</span>
              <span className="text-white text-sm leading-relaxed">Sterling Technology Hub, Unit 1, Station 07, La Place Creole Building, Rodney Village, Rodney Bay, Gros Islet</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
              <span className="text-white/40 text-sm font-medium">Registration number</span>
              <span className="text-white text-sm font-semibold">2025-00895</span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4">
              <span className="text-white/40 text-sm font-medium">Corporate email</span>
              <a href="mailto:info@investminfx.net" className="text-[#10B981] text-sm font-semibold hover:text-[#A4FE46] transition-colors">info@investminfx.net</a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Disclaimer</h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-4">
            <p className="text-white/70 text-sm leading-relaxed">INVESTMINFX LIMITED does not offer services in jurisdictions where such services are prohibited by local law. It is your responsibility to ensure that you are eligible to use our services in your country of residence.</p>
            <p className="text-white/70 text-sm leading-relaxed">Nothing on this website should be construed as an offer or solicitation to buy or sell financial instruments where such offer or solicitation would be unlawful. Information on this site is provided for informational purposes only and does not constitute financial, legal or tax advice.</p>
          </div>
        </section>

        {/* Risk Warning */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Risk Warning</h2>
          </div>
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 md:p-8">
            <p className="text-white/70 text-sm leading-relaxed">Trading and investing in financial markets carries a high level of risk and may not be suitable for all investors. Before deciding to trade, you should carefully consider your investment objectives, level of experience and risk appetite. You may sustain a loss of some or all of your invested capital and therefore you should not speculate with capital that you cannot afford to lose.</p>
          </div>
        </section>

        {/* No Misleading Claims */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-[#10B981]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">No Misleading Claims</h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-4">
            <p className="text-white/70 text-sm leading-relaxed">This website does not represent or imply that the company is regulated in any particular jurisdiction. Images, branding or other material on the site do not indicate regulatory status.</p>
            <p className="text-white/70 text-sm leading-relaxed">Please contact us at <a href="mailto:info@investminfx.net" className="text-[#10B981] hover:text-[#A4FE46] transition-colors font-semibold">info@investminfx.net</a> for any questions about our legal status.</p>
          </div>
        </section>

        <div className="h-px bg-white/10 mb-10" />

        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all">
            <ArrowLeft className="w-4 h-4 text-[#10B981]" />
            <span>Back to Pippulse FX</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 relative z-10">
        <div className="max-w-[860px] mx-auto px-6 md:px-12 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Pippulse FX / INVESTMINFX LIMITED. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
