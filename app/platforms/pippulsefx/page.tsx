"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Monitor,
  Smartphone,
  CheckCircle,
  ArrowUpRight,
  Menu,
  X,
  Shield,
  Activity,
  Clock,
  Download,
  Check,
  Zap,
  Lock,
  Layers,
  HeartHandshake
} from "lucide-react";

export default function PippulsefxAppPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const platformDropdownRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0); // 0 = pipapp.png, 1 = mob.png

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000); // Transitions every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-[#A4FE46]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6 max-w-[1200px] w-full mx-auto">
        <div className="flex items-center group cursor-pointer">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-xl flex items-center justify-center transform -rotate-12 shadow-[0_0_20px_rgba(16, 185, 129,0.4)] group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
              <div className="flex items-end space-x-[2px] h-5">
                <div className="w-1.5 h-2 bg-white/80 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-white/90 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="font-bold text-white text-lg tracking-wide group-hover:text-[#A4FE46] transition-colors">Pippulse FX</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>

          {/* Platform Dropdown */}
          <div className="relative" ref={platformDropdownRef}>
            <button
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <span className="text-[#A4FE46] font-semibold">Platform</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#A4FE46] transition-transform duration-300 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {platformDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/3 mt-4 w-[420px] bg-[#0c0c0e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(16,185,129,0.15)] z-50 flex gap-6 animate-[fadeInUp_0.25s_ease-out]">
                <div className="flex-[1.2] space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pippulsefx Platforms</h4>
                  <div className="flex flex-col space-y-1">
                    <Link href="/platforms/pippulsefx" onClick={() => setPlatformDropdownOpen(false)} className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/5 transition-all group text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#A4FE46] transition-colors">Pippulsefx App</span>
                        <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                      </div>
                      <span className="text-[11px] text-white/60 transition-colors">Our proprietary mobile and desktop platform.</span>
                    </Link>
                  </div>
                </div>
                <div className="w-[1px] bg-white/10 self-stretch"></div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">MT5 Platforms</h4>
                  <div className="flex flex-col space-y-1">
                    {[
                      { os: "Windows", desc: "Desktop installer for PC", path: "/platforms/windows", icon: Monitor },
                      { os: "MacOS", desc: "Apple package", path: "/platforms/macos", icon: Monitor },
                      { os: "Android", desc: "Play Store app", path: "/platforms/android", icon: Smartphone },
                      { os: "iOS", desc: "App Store app", path: "/platforms/ios", icon: Smartphone }
                    ].map(({ os, desc, path, icon: Icon }) => (
                      <Link
                        key={os}
                        href={path}
                        onClick={() => setPlatformDropdownOpen(false)}
                        className="flex items-start space-x-2.5 p-2 rounded-lg hover:bg-white/[0.04] transition-all group text-left"
                      >
                        <Icon className="w-4 h-4 text-white/45 group-hover:text-[#A4FE46] mt-0.5 transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{os}</span>
                          <span className="text-[10px] text-white/40 group-hover:text-white/50 transition-colors">{desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/promotions" className="hover:text-white transition-colors">Promotion</Link>
          <Link href="/partners" className="hover:text-white transition-colors">Partners</Link>
          <Link href="/trading" className="hover:text-white transition-colors">Trading</Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          <Link href="#" className="hidden sm:inline-block bg-white text-black px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Login
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-8 z-50 flex flex-col space-y-5 animate-[fadeInUp_0.3s_ease-out]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">About</Link>

          {/* Mobile Platform Submenu */}
          <div className="flex flex-col space-y-2 py-2 border-b border-white/5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46]">Pippulsefx Platforms</span>
            <div className="flex flex-col space-y-2 pl-2">
              <Link href="/platforms/pippulsefx" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-[#A4FE46] font-semibold">
                <span>Pippulsefx App</span>
                <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider mr-2">Popular</span>
              </Link>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46] mt-2">MT5 Platforms</span>
            <div className="grid grid-cols-2 gap-2 pl-2 pt-1">
              {[
                { name: "Windows", path: "/platforms/windows" },
                { name: "macOS", path: "/platforms/macos" },
                { name: "Android", path: "/platforms/android" },
                { name: "iOS", path: "/platforms/ios" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-white/70 hover:text-white py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/promotions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Promotion</Link>
          <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Partners</Link>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Trading</Link>

          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      )}

      {/* SECTION 1: HERO (Image Left, Text Right) */}
      <section className="relative pt-10 pb-12 max-w-[1240px] mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Hand holding Smartphone Mockup */}
          <div className="lg:col-span-7 flex justify-start relative">
            <div className="relative w-full max-w-[calc(100%-20px)] h-[350px] md:h-[500px] overflow-hidden">
              <div className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === 0 ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src="/pipapp.png"
                  alt="Pippulsefx App Hand Mockup"
                  fill
                  className="object-contain object-left scale-[1.0]"
                  priority
                />
              </div>
              <div className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === 1 ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src="/mob.png"
                  alt="Pippulsefx App Phone Mockup"
                  fill
                  className="object-contain object-left scale-[1.0]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title & Downloads */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] text-white">
                Pippulsefx App<br />
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Trade Anywhere, Anytime.</span>
              </h1>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                Experience ultimate trading freedom on a mobile app with lightning-fast execution, broad market access, and intuitive interface.
              </p>
            </div>

            {/* QR Code and App Download Buttons Container */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 max-w-xl shadow-[0_20px_50px_rgba(16,185,129,0.05)]">
              {/* Fake High-Quality Vector QR Code */}
              <div className="bg-white p-3 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg">
                <svg className="w-24 h-24 text-black" viewBox="0 0 100 100">
                  <path fill="currentColor" d="M10 10h30v30H10zm6 6v18h18V16zm6 6h6v6h-6zm18 18h10v10H40zm10-10h10v10H50zm10 10h10v10H60zm10-10h20v20H70zm6 6v8h8v-8zM10 60h30v30H10zm6 6v18h18V66zm6 6h6v6h-6zm48 12h10v10H70zm10-10h10v10H80zm-20 0h10v10H60zm-10 0h10v10H50zm0-10h10v10H50zm10 0h10v10H60zm-20 0h10v10H40zm-10 10h10v10H30zM46 16h8v8h-8zm0 16h8v8h-8zM82 16h8v8h-8zM60 46h8v8h-8zm-14 4h8v8h-8z" />
                </svg>
              </div>

              {/* Stacked Download Buttons */}
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="#"
                  className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all text-left"
                >
                  <svg className="w-5 h-5 text-white/80 fill-current" viewBox="0 0 24 24">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  <div>
                    <span className="block text-[8px] font-bold text-white/40 uppercase tracking-widest leading-none mb-0.5">Get it on</span>
                    <span className="text-xs font-bold text-white tracking-wide">Google Play</span>
                  </div>
                </Link>

                <Link
                  href="#"
                  className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all text-left"
                >
                  <svg className="w-5 h-5 text-white/80 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.52-.64.74-1.2 1.88-1.05 2.99 1.11.09 2.27-.57 3-1.45z" />
                  </svg>
                  <div>
                    <span className="block text-[8px] font-bold text-white/40 uppercase tracking-widest leading-none mb-0.5">Download on the</span>
                    <span className="text-xs font-bold text-white tracking-wide">App Store</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: GRID FEATURES (Fast, Secure, Friendly) */}
      <section className="bg-[#050507] border-t border-b border-white/5 pt-[80px] pb-24 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12">

          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Fast, secure, and friendly
            </h2>
            <p className="text-white/40 text-sm md:text-base font-medium max-w-xl mx-auto">
              Enjoy trading on the GO with a powerful Mobile App
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

            {/* Feature 1 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Effortless trading</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Trade with features designed to enhance your market precision and speed, including One-Click Trading, Auto-Close orders, Close All orders, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intuitive interface</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Built for simplicity, made for every trader. Whether you're a beginner or already a pro, you'll find everything right where you need it.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fast execution</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Never miss a trade with our app's ultra-fast performance. Stay ahead with real-time updates, low latency, and order execution down to milliseconds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Top-level Security and Privacy</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Your data and trading information are protected by industry-leading security measures, including end-to-end encryption.
              </p>
            </div>

          </div>

          {/* Center CTA button */}
          <div className="text-center">
            <Link
              href="#"
              className="inline-flex items-center space-x-2 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <span>Download Now</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 3: PERSONAL TRADING ASSISTANT (Image Left, Text Right) */}
      <section className="py-24 max-w-[1240px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: App Screen Close-up */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px] h-[500px] overflow-hidden">
              <Image
                src="/hand.png"
                alt="Pippulsefx App Hand Mockup"
                fill
                className="object-contain object-center scale-[1.15]"
                priority
              />
            </div>
          </div>

          {/* Right Side: Assistant bullet points */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Discover your personal trading assistant
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Trade across 500+ markets with an app that assists you with:
              </p>
            </div>

            <div className="space-y-6">

              {/* Feature Bullet 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Smart Auto Close:</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">
                    Automatically secure profits or limit losses at your chosen P/L target for all your positions.
                  </p>
                </div>
              </div>

              {/* Feature Bullet 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Multi-Account Management:</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">
                    Manage multiple accounts with ease, switching between them in just a few taps.
                  </p>
                </div>
              </div>

              {/* Feature Bullet 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">24/7 Support:</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">
                    Stay connected with round-the-clock expert support from a friendly team.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Footer Disclaimer Wrap */}
      <section className="w-full bg-[#050507] py-12 border-t border-white/5 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 text-xs text-white/35 leading-relaxed space-y-6">
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Risk Warning</h4>
            <p>
              Trading derivatives carries significant risks. It is not suitable for all investors and if you are a professional client, you could lose substantially more than your initial investment. When acquiring our derivative products, you have no entitlement, right or obligation to the underlying financial assets. Past performance is no indication of future performance and tax laws are subject to change. The information on this website is general in nature and doesn't take into account your personal objectives, financial circumstances, or needs. Accordingly, before acting on the advice, you should consider whether the advice is suitable for you having regard to your objectives, financial situation and needs. We encourage you to seek independent advice if necessary. Please read our legal documents and ensure that you fully understand the risks before you make any trading decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Regional Restrictions</h4>
            <p>
              We do not offer our services to residents of certain jurisdictions, including India, Canada, China, Singapore, the United States, or any jurisdictions listed on the FATF &quot;blacklist&quot; or subject to US/EU/UN sanctions. For more information please refer to our FAQ page. The information on this site and the products and services offered are not intended for distribution to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. While the Authority has granted a securities or derivatives investment business licence to the Licensee, the Authority does not endorse or vouch for the merits of the products offered by the Licensee.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-white/30 text-xs relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 space-y-4">
          <p>© 2026 Pippulse FX. All rights reserved.</p>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Trading financial instruments involves high risks including risk of losing the entire invested capital. Please read our Risk Disclosure Statement carefully before executing any transactions.
          </p>
        </div>
      </footer>
    </div>
  );
}
