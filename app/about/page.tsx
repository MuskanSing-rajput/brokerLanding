"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Monitor, Smartphone, Menu, X, Globe, Shield, Zap, Users, ArrowUpRight, Target, Award, Coins, Bitcoin, Droplet, Activity } from "lucide-react";

function Counter({ end, suffix = "", prefix = "", decimals = 0 }: { end: number, suffix?: string, prefix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeOut * end);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end]);

  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const platformDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#A4FE46]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#A4FE46]/3 rounded-full blur-[130px] pointer-events-none z-0"></div>

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
          <Link href="/about" className="text-[#A4FE46] hover:text-white transition-colors">About</Link>
          
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
        <div className="md:hidden fixed inset-x-0 top-[100px] bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-8 z-50 flex flex-col space-y-5 animate-[fadeInUp_0.3s_ease-out]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#A4FE46] hover:text-white py-2 border-b border-white/5">About</Link>
          
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

          <Link href="/promotions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Promotion</Link>
          <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Partners</Link>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Trading</Link>
          
          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-40 overflow-hidden z-10 flex flex-col items-center">
        {/* Background Dashboard Image */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/dashboard1.webp" 
            alt="Dashboard Background" 
            layout="fill" 
            objectFit="cover" 
            objectPosition="center top"
            className="[mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"
          />
          {/* Gradient Overlay for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-20 max-w-[1000px] mx-auto px-6 flex flex-col items-center text-center mt-4 md:mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-8 drop-shadow-2xl">
            Redefining the standards <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A4FE46] to-[#10B981] filter drop-shadow-[0_0_10px_rgba(164,254,70,0.3)]">of global trading</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mb-16 drop-shadow-lg font-medium">
            At Pippulse FX, we believe in democratizing access to financial markets. We combine cutting-edge technology with uncompromised security to give traders the edge they deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-20 pt-10 border-t border-white/10 w-full max-w-4xl relative">
            {/* Glowing line for border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#A4FE46]/50 to-transparent"></div>

            <div className="flex flex-col space-y-3 items-center">
              <span className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(164,254,70,0.2)]">
                <Counter end={1} suffix="M+" />
              </span>
              <span className="text-sm font-bold text-[#A4FE46] uppercase tracking-[0.2em]">Active Traders</span>
            </div>
            <div className="hidden sm:block w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="flex flex-col space-y-3 items-center">
              <span className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(164,254,70,0.2)]">
                <Counter end={150} suffix="+" />
              </span>
              <span className="text-sm font-bold text-[#A4FE46] uppercase tracking-[0.2em]">Countries</span>
            </div>
            <div className="hidden sm:block w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="flex flex-col space-y-3 items-center">
              <span className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(164,254,70,0.2)]">
                <Counter end={50} prefix="$" suffix="B" />
              </span>
              <span className="text-sm font-bold text-[#A4FE46] uppercase tracking-[0.2em]">Monthly Vol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leverage Section */}
      <section className="py-24 bg-black relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Trade with 1:5000 Leverage</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose the asset class that fits your portfolio and trade seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="flex justify-between text-white/50 text-xs font-semibold uppercase tracking-wider px-2">
                <span>Instrument</span>
                <span>Spread From</span>
              </div>
              <div className="space-y-4">
                {[
                  { symbol: "XAUUSD", spread: "18", icon: <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center"><Coins className="w-4 h-4"/></div> },
                  { symbol: "BTCUSD", spread: "156", icon: <div className="w-8 h-8 rounded-full bg-[#F7931A]/20 text-[#F7931A] flex items-center justify-center"><Bitcoin className="w-4 h-4"/></div> },
                  { symbol: "GBPUSD", spread: "0.2", icon: <div className="w-8 h-8 rounded-full bg-transparent text-2xl flex items-center justify-center">🇬🇧</div> }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/20 transition-colors px-2">
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span className="text-white font-medium group-hover:text-[#A4FE46] transition-colors">{item.symbol}</span>
                    </div>
                    <span className="text-white/90 font-medium">{item.spread}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="flex justify-between text-white/50 text-xs font-semibold uppercase tracking-wider px-2">
                <span>Instrument</span>
                <span>Spread From</span>
              </div>
              <div className="space-y-4">
                {[
                  { symbol: "EURUSD", spread: "0.1", icon: <div className="w-8 h-8 rounded-full bg-transparent text-2xl flex items-center justify-center">🇪🇺</div> },
                  { symbol: "USDJPY", spread: "0.2", icon: <div className="w-8 h-8 rounded-full bg-transparent text-2xl flex items-center justify-center">🇺🇸</div> },
                  { symbol: "US30", spread: "2", icon: <div className="w-8 h-8 rounded-full bg-transparent text-2xl flex items-center justify-center">🇺🇸</div> }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/20 transition-colors px-2">
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span className="text-white font-medium group-hover:text-[#A4FE46] transition-colors">{item.symbol}</span>
                    </div>
                    <span className="text-white/90 font-medium">{item.spread}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <div className="flex justify-between text-white/50 text-xs font-semibold uppercase tracking-wider px-2">
                <span>Instrument</span>
                <span>Spread From</span>
              </div>
              <div className="space-y-4">
                {[
                  { symbol: "USOil", spread: "0.4", icon: <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center"><Droplet className="w-4 h-4"/></div> },
                  { symbol: "#NVDA", spread: "6", icon: <div className="w-8 h-8 rounded-full bg-[#76B900]/20 text-[#76B900] flex items-center justify-center"><Activity className="w-4 h-4"/></div> },
                  { symbol: "GTI12", spread: "273", icon: <div className="w-8 h-8 text-white/60 flex items-center justify-center text-[10px] font-bold border border-white/20 rounded-md">GTI12</div> }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/20 transition-colors px-2">
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span className="text-white font-medium group-hover:text-[#A4FE46] transition-colors">{item.symbol}</span>
                    </div>
                    <span className="text-white/90 font-medium">{item.spread}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-[#050507] border-y border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Built on strong foundations</h2>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold max-w-2xl mx-auto">
              Our Core Values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromised Security",
                desc: "We utilize banking-standard encryption and segregated client accounts to ensure your funds are always protected."
              },
              {
                icon: Zap,
                title: "Ultra-Fast Execution",
                desc: "Our servers are located in prime financial hubs to deliver millisecond execution with minimal slippage."
              },
              {
                icon: Globe,
                title: "Global Accessibility",
                desc: "Trade from anywhere in the world on our multi-platform solutions, localized for your region."
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                desc: "Our award-winning 24/7 multilingual support team is always ready to assist you on your trading journey."
              },
              {
                icon: Award,
                title: "Regulatory Excellence",
                desc: "We adhere to the strictest global regulatory standards, promoting transparency and fair trading practices."
              },
              {
                icon: Target,
                title: "Continuous Innovation",
                desc: "We constantly upgrade our technology stack and trading tools to keep you ahead of the market curve."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#0c0c0e]/80 border border-white/5 hover:border-white/20 rounded-2xl p-8 transition-all group">
                <div className="w-12 h-12 bg-white/5 group-hover:bg-[#10B981]/20 rounded-xl flex items-center justify-center text-white/50 group-hover:text-[#A4FE46] transition-colors mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Showcase Section */}
      <section className="py-8 relative z-10 overflow-hidden bg-[#81E962]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 max-w-lg mx-auto lg:max-w-none">
               <Image 
                src="/about2_v2.png" 
                alt="Pippulse FX Mobile App" 
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-tight">
                Data-driven performance
              </h2>
              <p className="text-lg text-black/80 leading-relaxed font-medium">
                We equip our traders with advanced analytical tools, comprehensive market insights, and real-time data to make informed decisions in fast-moving markets.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Deep liquidity pools from tier-1 banks",
                  "Over 500+ tradable instruments",
                  "Advanced charting and indicator tools",
                  "Automated trading API access"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-black">
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </div>
                    <span className="font-bold">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 flex flex-wrap gap-4">
                <Link 
                  href="/platforms/android" 
                  className="inline-flex items-center justify-center space-x-3 bg-black text-white px-7 py-3 rounded-xl font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:bg-black/80"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12l-10.183 10.186c-.159-.082-.303-.189-.427-.318C2.551 21.238 2.5 20.443 2.5 19.608V4.392c0-.835.051-1.63.682-2.26.124-.129.268-.236.427-.318zm11.196 11.196l3.376 3.375-11.895 6.811L14.805 13.01zm1.01-1.01l4.032-4.031c.749-.75.749-1.968 0-2.718l-4.032-4.031-4.385 4.385 4.385 4.395zm-1.01-1.01L6.286.811 18.18 7.622 14.805 11.001z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70 uppercase tracking-widest">Get it on</span>
                    <span className="text-base font-bold leading-tight">Google Play</span>
                  </div>
                </Link>
                <Link 
                  href="/platforms/ios" 
                  className="inline-flex items-center justify-center space-x-3 bg-black text-white px-7 py-3 rounded-xl font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:bg-black/80"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.76.12 3.01.81 3.91 1.94-3.4 1.83-2.82 6.42.53 7.82-.77 1.82-1.74 3.3-3.11 4.17zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.36 2.37-1.89 4.34-3.74 4.25z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70 uppercase tracking-widest">Download on the</span>
                    <span className="text-base font-bold leading-tight">App Store</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Main Footer */}
            <footer className="w-full bg-[#030305] border-t border-white/5 py-12 relative z-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col gap-8 text-sm text-white/40">
          
          {/* Top Row: Brand, Navigation & Legal link */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {/* Left Brand info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-lg flex items-center justify-center transform -rotate-12 shadow-[0_0_15px_rgba(16, 185, 129,0.3)]">
                  <div className="flex items-end space-x-[2px] h-3.5">
                    <div className="w-1 h-1.5 bg-white/85 rounded-sm"></div>
                    <div className="w-1 h-2.5 bg-white/95 rounded-sm"></div>
                    <div className="w-1 h-3.5 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="font-bold text-white tracking-wide">Pippulse FX</span>
              </div>
              <div className="text-xs text-white/50 space-y-1">
                <div className="font-bold text-white mb-1">INVESTMINFX LIMITED</div>
                <div>Sterling Technology Hub, Unit 1, Station 07, La Place Creole Building, Rodney Village, Rodney Bay, Gros Islet</div>
                <div>Registration number: 2025-00895</div>
                <div>Corporate email: <a href="mailto:info@investminfx.net" className="hover:text-white transition-colors">info@investminfx.net</a></div>
              </div>
            </div>

            {/* Right side navigation */}
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex flex-wrap gap-6 text-xs md:text-sm">
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="/#dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
              <Link href="/legal" className="text-white hover:text-[#10B981] font-semibold transition-colors">
                Legal & Risk
              </Link>
            </div>
          </div>

          <div className="h-px bg-white/5"></div>

          {/* Bottom Row: Detailed legal and copyrights */}
          <div className="space-y-4 text-xs text-white/30 leading-relaxed">
            <p>
              <span className="font-bold text-white/50">Risk Warning:</span> Trading financial products involves risk. You may lose part or all of your capital. Past performance is not indicative of future results.
            </p>
            <p>
              <span className="font-bold text-white/50">Disclaimer:</span> INVESTMINFX LIMITED does not offer services in jurisdictions where such activities are prohibited by local law or regulation. Services are not offered to residents of any jurisdiction where providing them would be unlawful. It is your responsibility to ensure that you are eligible to use our services.
            </p>
            <p>
              We do not represent that we are regulated in any specific jurisdiction. Do not rely on branding or images as an indication of regulatory status.
            </p>
            <div className="pt-2 text-white/20">
              &copy; {new Date().getFullYear()} Pippulse FX / INVESTMINFX LIMITED. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
