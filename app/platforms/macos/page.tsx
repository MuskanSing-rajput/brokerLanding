"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Monitor, Smartphone, Cpu, Activity, Layers, Play, ArrowUpRight, Menu, X } from "lucide-react";

export default function MT5MacOS() {
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
      q: "What is MetaTrader 5, and why should I use it for trading?",
      a: "MetaTrader 5 is a trading platform that offers advanced features, including enhanced charting tools, multiple order types, powerful automated trading capabilities, and more. Whether you are an experienced trader or just starting out, MT5 delivers a superior trading experience with its wide array of technical analysis tools and support for multiple asset classes."
    },
    {
      q: "What markets can I trade on MetaTrader 5?",
      a: "MetaTrader 5 allows you to trade a broad range of markets, including CFDs on Forex, stocks, commodities, indices, crypto assets, and more. With its multi-asset capability, MT5 gives you the freedom to diversify your portfolio and take advantage of market opportunities across different asset classes—all on one platform."
    },
    {
      q: "Can I use automated trading strategies on MetaTrader 5?",
      a: "Yes! MetaTrader 5 offers powerful algorithmic trading features via Expert Advisors (EAs). You can automate your trading strategies based on specific conditions and market signals. MT5 also supports simultaneous multi-currency back testing and allows for faster strategy optimization, helping you fine-tune your automated systems for better performance."
    },
    {
      q: "Is MetaTrader 5 available on mobile devices?",
      a: "MetaTrader 5 is available as a mobile app for both iOS and Android devices, enabling you to trade anytime, anywhere. The app offers real-time quotes, advanced charting, trade execution, and account management features, ensuring you have full control over your trading while on the move."
    },
    {
      q: "What tools are available for technical analysis on MetaTrader 5?",
      a: "MetaTrader 5 is equipped with a wide variety of technical analysis tools, including 38 built-in indicators, 22 analytical tools, and 46 graphical objects. These tools allow you to perform detailed market analysis, identify trends, and make informed trading decisions. MT5 also provides 21 timeframes and supports up to 100 charts simultaneously, giving you the ability to monitor multiple markets with precision."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#A4FE46]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

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
      <section className="relative pt-16 pb-16 md:pt-32 md:pb-28 text-center z-10 overflow-hidden min-h-[450px] flex flex-col justify-center border-b border-white/5">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/mt5.jpeg" 
            alt="MT5 Background" 
            fill 
            className="object-cover opacity-40" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/70 via-[#050507]/30 to-[#050507]"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg text-white">
            MT5 for macOS<br />Key Features, Easy Download, and Simple Installation
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
            Unlock comprehensive market analysis, automated trading capabilities, and real-time data on your Mac with MetaTrader 5.
          </p>
          <div>
            <Link 
              href="#" 
              className="inline-flex items-center space-x-2.5 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <span>Download MT5 for macOS</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#050507] border-t border-b border-white/5 pt-[70px] pb-16 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Professional Trading Tools for Apple Users
            </h2>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold">
              Efficient, Reliable, and Secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enhanced Speed</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                An efficient platform that provides ultra-fast order execution on a 64-bit operating system. React quickly to market changes and secure optimal order entry and exit points.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Indicators & Analytics</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Access a total of 38 built-in indicators, 22 analytical tools, and 46 graphical objects. Analyze price trends, identify patterns, and forecast market movements with greater precision.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Back Testing</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Experience enhanced trading strategy testing capabilities with simultaneous multi-currency back testing. Fine-tune your trading ideas before applying them in real markets.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-8 hover:border-[#10B981]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#A4FE46] mb-6">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Market Depth</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                View the full range of buy and sell orders at various price levels for the assets you trade. Understand market trends, plan your strategies and manage risks more effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Start Section */}
      <section className="py-20 max-w-[1240px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Mockup Image */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[500px] w-[90%] md:w-full rounded-2xl mx-auto border border-white/5 shadow-2xl bg-black/50 p-2">
              <Image
                src="/mt5img_new.png"
                alt="MT5 Pippulse FX Client Mockup"
                width={800}
                height={600}
                className="w-full h-auto rounded-xl object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Side: Setup List */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-3">How to start trading with MT5 for macOS</h2>
              <p className="text-white/55 text-sm">To start trading with MT5 for macOS, follow these steps:</p>
            </div>

            <div className="space-y-6">
              {[
                { step: "01", title: "Download MT5", desc: "Use the link above to download the MetaTrader 5 (MT5) installation file for macOS." },
                { step: "02", title: "Install MT5", desc: "Once the file is downloaded, open it and follow the installation prompts to complete the setup process." },
                { step: "03", title: "Launch MT5", desc: "After installation, launch MT5, log in with your Pippulse FX account credentials, and you're ready to start trading." }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-lg font-bold text-[#A4FE46]">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#050507] border-t border-white/5 py-20 relative z-10">
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
                <div className="w-1 h-1.5 bg-white/85 rounded-sm"></div>
                <div className="w-1 h-2.5 bg-white/95 rounded-sm"></div>
                <div className="w-1 h-3.5 bg-white rounded-sm"></div>
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
