"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Monitor, Smartphone, Check, ArrowUpRight, Menu, X, Gift, Award, Coins, MapPin, Zap, Layers, Trophy } from "lucide-react";

export default function PromotionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const platformDropdownRef = useRef<HTMLDivElement>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const faqs = [
    {
      q: "What are the requirements for the bonus program?",
      a: "To participate, you must open a verified live trading account with Pippulse FX. Milestone and Loyalty bonuses are unlocked by trading a specified volume of qualified GTLots (QGTLots) and making subsequent deposits as outlined in the program rules."
    },
    {
      q: "Is there a limit for the bonus amount?",
      a: "Yes, the maximum aggregate bonus limit under the current progress-based program is $10,000 USD per trading account. Specific promotions may also have individual caps as described in their terms."
    },
    {
      q: "What happens to the lots I already traded?",
      a: "All closed trades with a duration of more than 3 minutes are tracked as lifetime traded lots. They automatically count toward your Milestone and Loyalty tiers from the moment your account is active."
    },
    {
      q: "What is a GTLot?",
      a: "A GTLot is a standard unit used to measure trading volume. One GTLot is equivalent to 100,000 units of the base currency traded."
    },
    {
      q: "What is a qualified GTLot (QGTLot)?",
      a: "A qualified GTLot (QGTLot) is a closed round-turn transaction of at least 1 standard lot where the position was held open for a minimum of 180 seconds (3 minutes) and completed without arbitrage or violation of trading guidelines."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#A4FE46]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#A4FE46]/3 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Localized Banner Alert */}
      <div className="relative z-30 w-full bg-gradient-to-r from-[#0d3b2b] via-[#091a13] to-[#0c0c0e] border-b border-[#10B981]/20 py-3 px-4 text-center">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 text-xs md:text-sm text-white/90">
          <MapPin className="w-4 h-4 text-[#A4FE46] animate-bounce" />
          <span className="font-medium">
            Stay tuned for upcoming exclusive promotions and events tailored for your region!
          </span>
        </div>
      </div>

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
              <span>Platform</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform duration-300 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {platformDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/3 mt-4 w-[90vw] sm:w-[420px] bg-[#0c0c0e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(16,185,129,0.15)] z-50 flex gap-6 animate-[fadeInUp_0.25s_ease-out]">
                <div className="flex-[1.2] space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pippulsefx Platforms</h4>
                  <div className="flex flex-col space-y-1">
                    <Link href="/platforms/pippulsefx" onClick={() => setPlatformDropdownOpen(false)} className="flex flex-col p-3 rounded-xl hover:bg-white/[0.04] transition-all group text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#A4FE46] transition-colors">Pippulsefx App</span>
                        <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                      </div>
                      <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">Our proprietary mobile and desktop platform.</span>
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

          <Link href="/promotions" className="text-[#A4FE46] hover:text-white font-semibold transition-colors">Promotion</Link>
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
        <div className="md:hidden fixed inset-x-0 top-[130px] bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-8 z-50 flex flex-col space-y-5 animate-[fadeInUp_0.3s_ease-out]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">About</Link>
          
          <div className="flex flex-col space-y-2 py-2 border-b border-white/5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46]">Pippulsefx Platforms</span>
            <div className="flex flex-col space-y-2 pl-2">
              <Link href="/platforms/pippulsefx" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-white/70 hover:text-[#A4FE46]">
                <span>Pippulsefx App</span>
                <span className="text-[8px] font-bold text-white bg-[#006a60] px-2 py-0.5 rounded-full uppercase tracking-wider mr-2">Popular</span>
              </Link>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46] mt-2">MT5 Platforms</span>
            <div className="grid grid-cols-2 gap-2 pl-2 pt-1">
              {[
                { name: "Windows", path: "/platforms/windows" },
                { name: "MacOS", path: "/platforms/macos" },
                { name: "Android", path: "/platforms/android" },
                { name: "iOS", path: "/platforms/ios" }
              ].map((os) => (
                <Link key={os.name} href={os.path} onClick={() => setMobileMenuOpen(false)} className="py-1.5 px-3 rounded-lg bg-white/5 text-sm font-semibold text-white/70 hover:text-[#A4FE46] hover:bg-white/10 transition-all text-center">
                  {os.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/promotions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#A4FE46] hover:text-white py-2 border-b border-white/5">Promotion</Link>
          <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Partners</Link>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Trading</Link>
          
          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden z-10 flex flex-col items-center min-h-[600px] justify-center">
        {/* Background Bonus Image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/bonus.avif" 
            alt="Bonus Background" 
            fill
            className="object-cover object-center [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
            priority
          />
          {/* Gradient Overlay for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05] mb-4 max-w-5xl mx-auto">
            A bonus program that<br />evolves with your trading
          </h1>
        <p className="text-white/40 text-base md:text-lg font-medium tracking-widest uppercase mb-4">
          Up to
        </p>
        
        {/* Styled 3D Gold Number Display */}
        <div className="relative inline-block mb-4">
          <div className="text-7xl md:text-9xl lg:text-[130px] font-black tracking-tight bg-gradient-to-b from-[#FFE4A0] via-[#F3C048] to-[#996C00] bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(243,192,72,0.35)]">
            $10,000
          </div>
        </div>

        <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
          Bonuses earned as you progress. Start building your capital today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="#" 
            className="inline-flex items-center justify-center space-x-2.5 bg-[#10B981] hover:bg-[#059669] text-white px-10 py-5 rounded-xl text-base md:text-lg font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] w-full sm:w-auto"
          >
            <span>Open an Account</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link 
            href="#" 
            className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all w-full sm:w-auto"
          >
            Deposit & Earn
          </Link>
        </div>
        </div>
      </section>

      {/* Core Bonus Programs Grid */}
      <section className="bg-[#050507] border-t border-b border-white/5 py-24 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Select your reward structure</h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
              Earn matches on your initial investments, unlock milestone rewards, and move up tiers with loyalty volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: 1st & 2nd Deposit Bonus */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A4FE46] transition-colors">Deposit Match Bonus</h3>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Instant capital boost</p>
                <div className="space-y-3 text-white/60 text-sm mb-8">
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span><strong>1st Deposit:</strong> Get up to 50% Match Bonus</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span><strong>2nd Deposit:</strong> Get up to 30% Match Bonus</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Instant credit to your equity balance</span>
                  </div>
                </div>
              </div>
              <Link href="#" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A4FE46] border-t border-white/5 pt-4 group-hover:text-white transition-colors">
                <span>Make deposit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Milestone Bonus */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A4FE46] transition-colors">30% Milestone Bonus</h3>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Where it all grows</p>
                <div className="space-y-3 text-white/60 text-sm mb-8">
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Achieve 3 qualified GTLots</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Receive 30% bonus on next deposit</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Evolves with your target volume</span>
                  </div>
                </div>
              </div>
              <Link href="#" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A4FE46] border-t border-white/5 pt-4 group-hover:text-white transition-colors">
                <span>Start trading</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Loyalty Bonus */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A4FE46] transition-colors">Loyalty Bonus</h3>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Where the path continues</p>
                <div className="space-y-3 text-white/60 text-sm mb-8">
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Multi-tiered trading rank system</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Achieve lifetime qualified GTLots</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#A4FE46] flex-shrink-0" />
                    <span>Upgrade tier for larger bonus credit caps</span>
                  </div>
                </div>
              </div>
              <Link href="#" className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A4FE46] border-t border-white/5 pt-4 group-hover:text-white transition-colors">
                <span>Start trading</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* How to be part of the bonus program */}
      <section className="py-24 max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">How to be part of the bonus program</h2>
          <p className="text-white/40 text-sm uppercase tracking-widest font-semibold">Simple Steps to Qualify</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Milestone Step Card */}
          <div className="bg-[#0c0c0e]/60 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all relative">
            <span className="absolute top-6 right-8 text-xs font-bold text-[#F3C047] bg-[#F3C047]/10 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Step 01
            </span>
            <div className="w-16 h-16 rounded-full border border-[#F3C047]/20 flex items-center justify-center text-xl font-bold bg-[#F3C047]/5 text-[#F3C047] mb-8 mt-2">
              30%
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Milestone Bonus</h3>
            <p className="text-white/60 text-sm mb-6">Achieve target trading volume to unlock next deposit boosts:</p>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Trade and achieve 3 lifetime qualified GTLots</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Make your next qualifying deposit</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Receive the 30% bonus credited to your trading equity</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link href="#" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#F3C047] hover:text-white transition-colors">
                <span>Make deposit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Loyalty Step Card */}
          <div className="bg-[#0c0c0e]/60 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all relative">
            <span className="absolute top-6 right-8 text-xs font-bold text-[#F3C047] bg-[#F3C047]/10 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Step 02
            </span>
            <div className="w-16 h-16 rounded-full border border-[#F3C047]/20 flex flex-col items-center justify-center text-[10px] font-bold uppercase leading-tight bg-[#F3C047]/5 text-[#F3C047] mb-8 mt-2 text-center">
              <span>3</span>
              <span>Tiers</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Loyalty Bonus</h3>
            <p className="text-white/60 text-sm mb-6">Achieve higher trading ranks to receive expanded benefits:</p>
            <ul className="space-y-4 text-white/50 text-sm">
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Trade more consistently to accumulate lots</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Achieve at least 6 lifetime qualified GTLots</span>
              </li>
              <li className="flex items-start space-x-3">
                <ArrowUpRight className="w-4 h-4 text-[#F3C047] mt-0.5 flex-shrink-0" />
                <span>Step up into the next higher tier and claim larger caps</span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link href="#" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#F3C047] hover:text-white transition-colors">
                <span>Start trading</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        <div className="text-center mt-14">
          <Link
            href="#"
            className="inline-flex items-center space-x-2.5 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
          >
            <span>Deposit and Earn</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Bonus Examples Section */}
      <section className="bg-[#050507] border-t border-b border-white/5 py-24 relative z-10">
        <div className="max-w-[1040px] mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Bonus Calculation Examples</h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
              Here is how trading volume and deposit values translate into your active trading equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Example 1 */}
            <div className="space-y-6 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3C048]/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#F3C048]/10 rounded-xl flex items-center justify-center text-[#F3C048]">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-xl">Example Milestone Bonus</h4>
              </div>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Trade and achieve 3 QGTLots" },
                  { step: "2", text: "Make your next deposit: 150 USD" },
                  { step: "3", text: "Get 30% of your deposit = 45 USD" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center space-x-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#F3C048] text-black font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example 2 */}
            <div className="space-y-6 bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46]">
                  <Trophy className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-xl">Example Loyalty Bonus</h4>
              </div>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Trade and achieve 20 QGTLots" },
                  { step: "2", text: "Earn up to 3,000 USD cumulative credit bonus" },
                  { step: "3", text: "Move to the next rank tier automatically" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center space-x-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#10B981] text-black font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <Link
              href="#"
              className="inline-flex items-center space-x-2 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <span>Deposit and earn</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1040px] mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 rounded-2xl overflow-hidden bg-[#0c0c0e]/80 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-white hover:bg-white/[0.02] transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/55 transition-transform duration-300 ${openFaq === index ? "rotate-180 text-[#A4FE46]" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 border-t border-white/5 text-sm text-white/60 leading-relaxed animate-[fadeInUp_0.2s_ease-out]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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

      {/* Main Footer */}
      <footer className="w-full bg-[#030305] border-t border-white/5 py-12 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-lg flex items-center justify-center transform -rotate-12 shadow-[0_0_15px_rgba(16, 185, 129,0.3)]">
              <div className="flex items-end space-x-[2px] h-3.5">
                <div className="w-1.5 h-1.5 bg-white/85 rounded-sm"></div>
                <div className="w-1.5 h-2.5 bg-white/95 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="font-bold text-white tracking-wide">Pippulse FX</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/#about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Pippulse FX. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
