"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Monitor, Smartphone, Menu, X, Settings, Wallet, BarChart2, HeadphonesIcon, SlidersHorizontal, Gift, Repeat, ThumbsUp, UserCheck, ShieldCheck, ArrowUpRight, Star, Users } from "lucide-react";

export default function PartnersPage() {
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A4FE46]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] left-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
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
              <div className="absolute top-full left-1/2 -translate-x-1/3 mt-4 w-[420px] bg-[#0c0c0e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(16,185,129,0.15)] z-50 flex gap-6 animate-[fadeInUp_0.25s_ease-out]">
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
          <Link href="/partners" className="text-[#A4FE46] hover:text-white transition-colors">Partners</Link>
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
          <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#A4FE46] hover:text-white py-2 border-b border-white/5">Partners</Link>
          <Link href="/trading" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Trading</Link>

          <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-40 md:pt-32 md:pb-64 overflow-hidden z-10 flex flex-col items-center">
        {/* Background Dashboard Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/handshake.png"
            alt="Dashboard Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="[mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"
            priority
          />
        </div>

        <div className="relative z-20 max-w-[1000px] mx-auto px-6 flex flex-col items-center text-center">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-6 drop-shadow-2xl">
            A partnership that pays off.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A4FE46] to-[#10B981] filter drop-shadow-[0_0_10px_rgba(164,254,70,0.3)]">Take your earning potential further.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mb-12 drop-shadow-lg font-medium">
            Our partners earn over $3.5 million every month. Start earning up to $24 per lot in industry-leading commissions.
          </p>

          <Link href="#" className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#006a60] to-[#10B981] text-white px-10 py-4 rounded-2xl font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02]">
            <span>Become A Partner</span>
          </Link>
        </div>
      </section>

      {/* Program Features Section */}
      <section className="pt-12 pb-24 bg-[#050507] border-y border-white/5 relative z-10 -mt-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">A partnership program built for your growth</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Access the tools, support, and financial rewards you need to grow your business, backed by best-in-market commission schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: SlidersHorizontal,
                title: "Customizable commissions",
                desc: "Earn commissions based on multi-tier plans that reward your expanding network."
              },
              {
                icon: Wallet,
                title: "Fast daily payouts",
                desc: "Get instant daily payments and flexible withdrawals through multiple methods."
              },
              {
                icon: BarChart2,
                title: "Powerful marketing tools",
                desc: "Boost conversions with our suite of marketing materials and real-time analytics."
              },
              {
                icon: HeadphonesIcon,
                title: "Dedicated, expert support",
                desc: "Receive personalized guidance from a dedicated account manager whenever you need it."
              },
              {
                icon: Settings,
                title: "Customized partnership plans",
                desc: "We work with you to create tailored solutions that fit your specific business model."
              },
              {
                icon: Users,
                title: "High-converting client offers",
                desc: "Attract more clients with our competitive trading conditions and generous bonuses."
              }
            ].map((feature, i) => (
              <div key={i} className="relative overflow-hidden bg-gradient-to-br from-[#0c0c0e] to-[#10B981]/5 border border-white/5 hover:border-white/20 rounded-3xl p-10 transition-all group text-center flex flex-col items-center shadow-lg">
                {/* Glowy greenish gradient top right */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(164,254,70,0.15),transparent_70%)] pointer-events-none group-hover:bg-[radial-gradient(circle_at_top_right,rgba(164,254,70,0.25),transparent_70%)] group-hover:scale-110 transition-all duration-500" />

                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#10B981]/10 to-[#A4FE46]/10 group-hover:from-[#10B981]/20 group-hover:to-[#A4FE46]/20 rounded-full flex items-center justify-center text-white/60 group-hover:text-[#A4FE46] transition-colors mb-6 shadow-inner">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="relative z-10 text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Methods Section */}
      <section className="py-24 relative z-10 overflow-hidden bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">One program, dozens of ways to earn</h2>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0c0c0e] to-[#050507] shadow-2xl p-12 lg:p-20">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none hidden lg:block">
              <Image
                src="/bonus.png"
                alt="Earnings Dashboard"
                layout="fill"
                objectFit="cover"
                className="[mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
              />
            </div>

            <div className="relative z-20 max-w-xl">
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-2 rounded-full bg-[#10B981]/10 text-[#A4FE46] text-xs font-bold uppercase tracking-wider border border-[#10B981]/20">Rebates & commissions</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-wider border border-white/10">Cost Per Acquisition (CPA)</span>
                <span className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-xs font-bold uppercase tracking-wider border border-white/10">Multi-level affiliate</span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-8">Rebates & commissions</h3>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                Thanks to our scalable rebate and commission structure, partners can make withdrawals <strong className="text-white">within just 24 hours</strong>, with a maximum commission of $24 per lot.
              </p>

              <Link href="#" className="inline-flex items-center justify-center space-x-2 bg-[#006a60] hover:bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all">
                <span>Become a Partner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Copy Trading Section */}
      <section className="py-24 bg-[#050507] border-t border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative w-full flex flex-col items-center justify-center space-y-6 mx-auto lg:px-4">
              {/* Decorative glow behind both */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[#10B981]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

              {/* First Image (copytrading.png) */}
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 bg-[#0a0a0c]">
                <Image
                  src="/copytrading.png"
                  alt="Copy Trading Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/20 to-transparent pointer-events-none mix-blend-overlay"></div>
              </div>

              {/* Second Image (copytrading2.webp) */}
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 bg-[#0a0a0c]">
                <Image
                  src="/copytrading2.webp"
                  alt="Copy Trading Features"
                  width={800}
                  height={600}
                  className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>

            <div className="space-y-10 order-1 lg:order-2">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Copy Trading</h2>
                <p className="text-xl text-white/70 leading-relaxed">
                  Mirror other traders or share your own strategies. Explore smarter trading for everyone.
                </p>
              </div>

              <ul className="space-y-8">
                {[
                  { title: "Real-time synchronization", desc: "Instantly mirror trades and strategies as they happen, with no delays.", icon: Repeat },
                  { title: "Beginner-friendly platform", desc: "Start trading with confidence, even if you’re new or short on time.", icon: ThumbsUp },
                  { title: "Flexible roles, maximum control", desc: "Switch between Copier and Strategy Provider or manage both. Tailor your trading journey.", icon: UserCheck },
                  { title: "Transparent performance tracking", desc: "Access detailed strategy histories and set risk controls for peace of mind.", icon: ShieldCheck }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-5 h-5 text-[#A4FE46]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24 relative z-10 overflow-hidden bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful tools designed to fuel your growth</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Leverage a whole host of tools and services that help you attract, convert, and retain clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "High-converting promotional materials",
                desc: "Access our extensive library of marketing assets designed to maximize your conversions."
              },
              {
                title: "Custom trading contests",
                desc: "Run tailored trading competitions to boost client engagement and attract new traders."
              },
              {
                title: "Event & seminar sponsorship",
                desc: "Build your community with our sponsorship and support for educational or social events."
              },
              {
                title: "On-demand support & materials",
                desc: "Receive custom-made assets and dedicated support to fit your unique strategy."
              }
            ].map((tool, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0c0c0e] border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#050507] border-y border-white/5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Hear from our global network of partners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Running smooth, good service, and most attractive is gain rebate.",
                author: "Awangku Mohammad Asri Bin Peng",
                role: "Introducing Broker (IB)"
              },
              {
                quote: "The daily payouts are game changer . FXGT’s platform and dedicated support make it easy to convert my network and build a reliable income stream. My Affiliate Manager is always available to help.",
                author: "Alejandro R.",
                role: "Introducing Broker (IB) 🇦🇷"
              },
              {
                quote: "As a marketer, I value data and tools. The partner dashboard provides all the real-time stats I need, and their marketing materials are top-notch. My campaigns have never been more profitable.",
                author: "Themba L.",
                role: "Digital Marketer"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#0c0c0e]/80 border border-white/5 rounded-3xl p-8 flex flex-col relative group hover:border-[#10B981]/30 transition-colors">
                <div className="flex text-[#A4FE46] mb-6">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/80 italic leading-relaxed flex-grow mb-8 text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold">{testimonial.author}</h4>
                  <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The App Section */}
      <section className="py-8 relative z-10 overflow-hidden bg-[#81E962]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-1 order-2 lg:order-1">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-tight">
                The Pippulse FX App
              </h2>
              <p className="text-lg text-black/80 leading-relaxed font-medium">
                It's where traditional and digital markets meet. Trade 800+ instruments across 9 asset classes on a fast, intuitive app that offers you:
              </p>

              <ul className="space-y-3">
                {[
                  { title: "An all-asset hub", desc: "Manage your accounts and wallets with full verification in-app, take control of your trades, and set market alerts to trade when you need to." },
                  { title: "Extra speed, no latency", desc: "Execute your trades in real time with low to zero latency, so you can seize every market opportunity." },
                  { title: "24/7 support", desc: "Get support for all your inquiries without leaving the app. It's available round the clock, in your language, and delivered in real time." }
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col text-black">
                    <span className="font-bold text-lg">{item.title}</span>
                    <span className="text-black/70 font-medium text-sm mt-0.5">{item.desc}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  href="/platforms/android"
                  className="inline-flex items-center justify-center space-x-3 bg-black text-white px-7 py-3 rounded-xl font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:scale-105"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12l-10.183 10.186c-.159-.082-.303-.189-.427-.318C2.551 21.238 2.5 20.443 2.5 19.608V4.392c0-.835.051-1.63.682-2.26.124-.129.268-.236.427-.318zm11.196 11.196l3.376 3.375-11.895 6.811L14.805 13.01zm1.01-1.01l4.032-4.031c.749-.75.749-1.968 0-2.718l-4.032-4.031-4.385 4.385 4.385 4.395zm-1.01-1.01L6.286.811 18.18 7.622 14.805 11.001z" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70 uppercase tracking-widest">Get it on</span>
                    <span className="text-base font-bold leading-tight">Google Play</span>
                  </div>
                </Link>
                <Link
                  href="/platforms/ios"
                  className="inline-flex items-center justify-center space-x-3 bg-black text-white px-7 py-3 rounded-xl font-medium tracking-wide transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:bg-black/80 hover:scale-105"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.76.12 3.01.81 3.91 1.94-3.4 1.83-2.82 6.42.53 7.82-.77 1.82-1.74 3.3-3.11 4.17zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.36 2.37-1.89 4.34-3.74 4.25z" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70 uppercase tracking-widest">Download on the</span>
                    <span className="text-base font-bold leading-tight">App Store</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden order-1 lg:order-2 max-w-[460px] mx-auto w-full scale-[1.05] translate-y-4">
              <Image
                src="/about2.png"
                alt="Pippulse FX Mobile App"
                width={540}
                height={900}
                className="w-full h-auto object-contain drop-shadow-2xl filter"
              />
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
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Legal Information</h4>
            <p>
              Pippulse FX is a registered trademark of Pippulse Group. The Pippulse Group comprises various entities authorized and regulated in their respective jurisdictions.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-white/5">
            <p>© 2026 Pippulse FX. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
