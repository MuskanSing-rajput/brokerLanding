"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play, Activity, BarChart2, LineChart, MessageSquare, Crosshair, Zap, Shield, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ value, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setCount(parseInt(value, 10));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const end = parseInt(value, 10);

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const AnalyticsPreview = () => (
  <div className="w-full h-full relative flex items-center justify-center p-4 md:p-8 bg-black/40 overflow-hidden group/analytics">
    {/* Grid Background Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

    {/* Ambient Glows */}
    <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-[#A4FE46]/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-[#10B981]/15 rounded-full blur-[120px] pointer-events-none"></div>

    {/* The Main Image Wrapper */}
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl flex items-center justify-center transition-all duration-500 group-hover/analytics:border-[#10B981]/30">
      <Image
        src="/analytic.png"
        alt="Analytics Dashboard"
        fill
        sizes="(max-width: 1250px) 100vw, 1250px"
        className="object-cover opacity-95 group-hover/analytics:opacity-100 transition-all duration-700 ease-out"
        priority
        unoptimized
      />

      {/* Dark Vignette Overlay to blend the image edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30 pointer-events-none transition-opacity duration-500 group-hover/analytics:opacity-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none transition-opacity duration-500 group-hover/analytics:opacity-0"></div>

      {/* Futuristic Floating Badges/Cards on top of the image */}
      <div className="absolute top-6 left-6 flex flex-col space-y-2 z-20">
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
          <Activity className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white/90">LIVE REPORT</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">Feed: Connected</span>
        </div>
      </div>

      {/* Floating Stat Card */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-black/75 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-20 max-w-sm hover:border-[#10B981]/40 transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-bold tracking-widest text-[#10B981] uppercase">Portfolio Analysis</div>
          <span className="text-[11px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded">+18.4%</span>
        </div>
        <h4 className="text-lg font-bold text-white mb-1 tracking-tight">AI Predictive Modeling</h4>
        <p className="text-white/60 text-xs leading-relaxed">
          Real-time algorithmic trading suggestions based on deep learning pattern recognition.
        </p>
      </div>

      {/* Quick Action Button overlay */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center z-20">
        <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/25 border border-white/20 hover:border-white/40 text-white backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.03]">
          <span>Enlarge Report</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);



const MonitoringChart = () => (
  <div className="w-full h-full relative flex items-center justify-center p-4 md:p-8 bg-black/40 overflow-hidden group/monitoring">
    {/* Grid Background Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

    {/* Ambient Glows */}
    <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover/monitoring:bg-[#10B981]/25"></div>
    <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-[#A4FE46]/15 rounded-full blur-[120px] pointer-events-none transition-all duration-700 group-hover/monitoring:bg-[#A4FE46]/35"></div>

    {/* The Main Image Wrapper */}
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl flex items-center justify-center transition-all duration-500 group-hover/monitoring:border-white/20">
      <Image
        src="/monitoring.jpeg"
        alt="Live Monitoring Statistics"
        fill
        sizes="(max-width: 1250px) 100vw, 1250px"
        className="object-cover opacity-95 group-hover/monitoring:opacity-100 transition-all duration-700 ease-out"
        priority
        unoptimized
      />

      {/* Dark Vignette Overlay to blend the image edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30 pointer-events-none transition-opacity duration-500 group-hover/monitoring:opacity-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none transition-opacity duration-500 group-hover/monitoring:opacity-0"></div>

      {/* Floating Badges/Cards */}
      <div className="absolute top-6 left-6 flex flex-col space-y-2 z-20">
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
          <Activity className="w-3.5 h-3.5 text-[#A4FE46] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white/90">LIVE INFRASTRUCTURE</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl shadow-lg flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-ping"></span>
          <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Floating Stat Card */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-black/75 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-20 max-w-sm hover:border-[#A4FE46]/40 transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-bold tracking-widest text-[#A4FE46] uppercase">Network Latency</div>
          <span className="text-[11px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded">Healthy</span>
        </div>
        <h4 className="text-lg font-bold text-white mb-1 tracking-tight">Real-Time Core Load</h4>
        <p className="text-white/60 text-xs leading-relaxed">
          Tick-by-tick monitoring of active routing nodes, memory load configurations, and server latency profiles.
        </p>
      </div>
    </div>
  </div>
);

const PerformanceMetrics = () => (
  <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between">
    <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-white">Performance Overview</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 overflow-hidden flex-grow pb-1">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors group h-28">
        <h4 className="text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors">Server Uptime</h4>
        <div className="text-3xl md:text-4xl font-bold text-white mt-1 tracking-tight">99.99<span className="text-xl text-white/50 font-normal">%</span></div>
        <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-green-500 w-[99%] shadow-[0_0_10px_rgba(34,197,94,0.8)] relative">
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors group h-28">
        <h4 className="text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors">Average Latency</h4>
        <div className="text-3xl md:text-4xl font-bold text-white mt-1 tracking-tight">24<span className="text-xl text-white/50 font-normal">ms</span></div>
        <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-[#10B981] w-[24%] shadow-[0_0_10px_rgba(16, 185, 129,0.8)]"></div>
        </div>
      </div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 md:col-span-2 flex flex-col justify-between h-48">
        <h4 className="text-white/60 text-sm font-medium mb-3">Throughput Over Time</h4>
        <div className="flex items-end h-24 md:h-28 space-x-1 md:space-x-2">
          {Array.from({ length: 40 }).map((_, i) => {
            const height = Math.max(20, Math.random() * 100);
            const isOrange = i % 4 === 0 || i % 7 === 0;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t-sm transition-all cursor-pointer ${isOrange
                  ? 'bg-gradient-to-t from-[#A4FE46] to-[#10B981] shadow-[0_0_15px_rgba(164, 254, 70,0.3)] hover:shadow-[0_0_20px_rgba(164, 254, 70,0.8)]'
                  : 'bg-white/10 hover:bg-[#A4FE46] hover:shadow-[0_0_10px_rgba(164, 254, 70,0.8)]'
                  }`}
                style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const FeedbackForm = () => (
  <div className="w-full h-full p-6 md:p-8 flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <MessageSquare className="w-8 h-8 text-white/80" />
    </div>
    <h3 className="text-3xl font-bold mb-3 tracking-tight text-white">We value your input</h3>
    <p className="text-white/50 mb-10 max-w-md">Help us improve the Youflow experience. Your feedback directly shapes our product roadmap.</p>

    <div className="w-full max-w-lg flex flex-col space-y-4 text-left">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] focus:bg-white/10 transition-all shadow-inner" />
        <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] focus:bg-white/10 transition-all shadow-inner" />
      </div>
      <textarea placeholder="Tell us what you think..." className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] focus:bg-white/10 transition-all h-32 resize-none shadow-inner"></textarea>
      <button className="bg-gradient-to-r from-[#A4FE46] to-[#10B981] text-white rounded-xl py-4 font-bold shadow-[0_0_20px_rgba(16, 185, 129,0.3)] hover:shadow-[0_0_30px_rgba(16, 185, 129,0.5)] hover:scale-[1.02] transition-all tracking-wide">
        Submit Feedback
      </button>
    </div>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("Analytics");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [psDropdownOpen, setPsDropdownOpen] = useState(false);
  const stackingSectionRef = useRef<HTMLDivElement>(null);
  const psDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (psDropdownRef.current && !psDropdownRef.current.contains(e.target as Node)) {
        setPsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          if (href === "#") {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          } else {
            const targetId = href.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Force GSAP ScrollTrigger refresh after initial load to correct pin-spacer height calculations
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined" || !stackingSectionRef.current) return;

    const cards = gsap.utils.toArray(".gsap-card");
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet: Pin and stack cards
    mm.add("(min-width: 768px)", () => {
      // Initialize position and opacity of cards 2, 3, 4 offscreen immediately to prevent layout flashes
      gsap.set(cards.slice(1), { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackingSectionRef.current,
          start: "top top",
          end: "+=2000", // Reduced scroll distance for faster progression
          scrub: 0.5, // Reduced scrub delay for highly responsive, snappy feel
          pin: true,
          anticipatePin: 1,
        }
      });

      cards.forEach((card: any, index: number) => {
        if (index === 0) return;

        // Bring next card in by sliding up and fading in from bottom
        tl.fromTo(
          card,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "power2.out" },
          index - 1
        );

        // Shift previous cards up, shrink, and dim them - delayed to only start when the next card is 60% of the way up
        for (let i = 0; i < index; i++) {
          const prevCard = cards[i] as HTMLElement;
          const diff = index - i;
          const targetScale = 1 - diff * 0.035;
          const targetY = -diff * 30; // Shift upwards by 30px per stacked level
          const targetBrightness = 1 - diff * 0.06; // Subtly dim (from 1 to 0.94, 0.88, 0.82) so it remains clearly visible!

          tl.to(
            prevCard,
            {
              scale: targetScale,
              y: targetY,
              filter: `brightness(${targetBrightness})`,
              ease: "power2.out",
              duration: 0.4, // Complete this animation in the last 40% of the slide step
            },
            (index - 1) + 0.6 // Starts when the incoming card has slid up 60%
          );
        }
      });

      // Add a timeline hold buffer at the end of the sequence to allow Card 4 to stay fully static on screen
      tl.to({}, { duration: 0.8 });
    });

    // Mobile: Clean up and lay out naturally
    mm.add("(max-width: 767px)", () => {
      gsap.set(cards, { clearProps: "all" });
    });

    return () => mm.revert();
  }, { scope: stackingSectionRef });

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Analytics":
        return <AnalyticsPreview />;
      case "Monitoring":
        return <MonitoringChart />;
      case "Performance":
        return <PerformanceMetrics />;
      case "Feedback":
        return <FeedbackForm />;
      default:
        return <AnalyticsPreview />;
    }
  };

  const getTabClass = (tabName: string) => {
    const isActive = activeTab === tabName;
    if (isActive) {
      return "flex items-center space-x-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#A4FE46] to-[#10B981] shadow-[0_0_20px_rgba(164, 254, 70,0.3)] cursor-pointer scale-105 transform border border-[#A4FE46]/50 transition-all z-10 text-white";
    }
    return "flex items-center space-x-2.5 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer text-white/60 hover:text-white/90";
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">

      {/* Top Section Wrapper (Header + Hero + Dashboard + Partners) with Background Video */}
      <div className="relative w-full z-10 flex flex-col gpu-accelerated overflow-hidden pb-16">
        {/* Background Video (now absolute instead of fixed, bound to this container only) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-[center_30%] w-full h-full opacity-75 mix-blend-screen"
          >
            <source src="/vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#10B981]/5 via-black/30 to-black/65"></div>
        </div>

        {/* Navbar */}
        <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6 max-w-[1200px] w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#059669] to-[#A4FE46] rounded-xl flex items-center justify-center transform -rotate-12 shadow-[0_0_20px_rgba(16, 185, 129,0.4)] group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
              <div className="flex items-end space-x-[2px] h-5">
                <div className="w-1.5 h-2 bg-white/80 rounded-sm"></div>
                <div className="w-1.5 h-3.5 bg-white/90 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact us</a>
            
            {/* P's Dropdown Button */}
            <div className="relative" ref={psDropdownRef}>
              <button
                onClick={() => setPsDropdownOpen(!psDropdownOpen)}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#A4FE46]/10 to-[#10B981]/15 border border-[#10B981]/30 hover:border-[#A4FE46]/60 hover:from-[#A4FE46]/20 hover:to-[#10B981]/25 text-[#A4FE46] font-semibold text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(164,254,70,0.1)] hover:shadow-[0_0_20px_rgba(164,254,70,0.25)] scale-100 hover:scale-[1.03] active:scale-95 group"
              >
                <span>P&apos;s</span>
                <svg className={`w-3.5 h-3.5 text-[#A4FE46]/80 group-hover:text-white transition-transform duration-300 ${psDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {psDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-44 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(164,254,70,0.15)] z-50 animate-[fadeInUp_0.25s_ease-out]">
                  <div className="py-2 px-1 flex flex-col space-y-0.5">
                    <a href="#features" onClick={() => setPsDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-black hover:bg-[#A4FE46] transition-all duration-200">
                      <span>Platform</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                    </a>
                    <a href="#features" onClick={() => setPsDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-black hover:bg-[#A4FE46] transition-all duration-200">
                      <span>Promotion</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A4FE46]"></span>
                    </a>
                    <a href="#about" onClick={() => setPsDropdownOpen(false)} className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-black hover:bg-[#A4FE46] transition-all duration-200">
                      <span>Partners</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>
 
           {/* Right Action buttons */}
           <div className="flex items-center space-x-4">
             <Link href="#" className="hidden sm:inline-block bg-white text-black px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               Login
             </Link>
             {/* Hamburger Button */}
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
             <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Home</a>
             <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">About</a>
             <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Features</a>
             <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Dashboard</a>
             <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">Contact us</a>
             
             {/* Mobile P's Submenu */}
             <div className="flex flex-col space-y-2 py-2 border-b border-white/5">
               <span className="text-xs font-semibold uppercase tracking-wider text-[#A4FE46]">P&apos;s Options</span>
               <div className="grid grid-cols-3 gap-2 pt-1">
                 <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 px-3 rounded-lg bg-white/5 text-sm font-semibold text-white/70 hover:text-[#A4FE46] hover:bg-white/10 transition-all">Platform</a>
                 <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 px-3 rounded-lg bg-white/5 text-sm font-semibold text-white/70 hover:text-[#A4FE46] hover:bg-white/10 transition-all">Promotion</a>
                 <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 px-3 rounded-lg bg-white/5 text-sm font-semibold text-white/70 hover:text-[#A4FE46] hover:bg-white/10 transition-all">Partners</a>
               </div>
             </div>

             <Link href="#" onClick={() => setMobileMenuOpen(false)} className="bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
               Login
             </Link>
           </div>
         )}

        {/* Main Hero Section */}
        <main className="relative z-10 flex-grow flex flex-col items-center pt-[55px] px-4 w-full max-w-[1200px] mx-auto">

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold text-center tracking-tight leading-[1.1] mb-[15px]">
            Next-Gen Forex Execution & <br className="hidden md:block" />
            Live Trading Intelligence
          </h1>

          <p className="text-white/50 text-center max-w-2xl text-base md:text-lg mb-8 leading-relaxed">
            Monitor your live open positions, track total asset growth, and leverage 
            exclusive Welcome Bonuses for new traders under our unified premium workspace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 w-full sm:w-auto">
            <button className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:scale-105 transition-all w-full sm:w-auto min-w-[180px]">
              <span>Start Trading Now</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#A4FE46] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_25px_rgba(164, 254, 70,0.4)] hover:scale-105 transition-all w-full sm:w-auto min-w-[180px]">
              <Play className="w-5 h-5 fill-current" />
              <span>Claim Welcome Bonus</span>
            </button>
          </div>

          {/* Tools Navigation */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 relative z-20">
            <div className={getTabClass("Monitoring")} onClick={() => setActiveTab("Monitoring")}>
              <Activity className="w-4 h-4 text-inherit" />
              <span className="text-sm font-medium text-inherit">Monitoring</span>
            </div>
            <div className={getTabClass("Analytics")} onClick={() => setActiveTab("Analytics")}>
              <BarChart2 className="w-4 h-4 text-inherit" />
              <span className="text-sm font-medium text-inherit">Analytics</span>
            </div>
            <div className={getTabClass("Performance")} onClick={() => setActiveTab("Performance")}>
              <LineChart className="w-4 h-4 text-inherit" />
              <span className="text-sm font-medium text-inherit">Performance</span>
            </div>
            <div className={getTabClass("Feedback")} onClick={() => setActiveTab("Feedback")}>
              <MessageSquare className="w-4 h-4 text-inherit" />
              <span className="text-sm font-medium text-inherit">Feedback</span>
            </div>
          </div>

          {/* Dashboard Preview / Widget Container */}
          <div className="w-full max-w-[1240px] rounded-2xl md:rounded-3xl border border-white/20 bg-[#0c0c0e]/95 overflow-hidden shadow-[0_20px_70px_rgba(164, 254, 70,0.2)] mb-14 relative group ring-1 ring-white/10 transition-all duration-500">

            {/* Glass reflection top highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-20 pointer-events-none"></div>

            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-20 mix-blend-overlay"></div>

            {/* Window Controls (Fake macOS style) */}
            <div className="flex items-center px-3 sm:px-5 py-4 border-b border-white/10 bg-white/[0.03] relative z-20 shadow-sm">
              <div className="hidden sm:flex space-x-2 absolute left-5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]"></div>
              </div>
              <div className="mx-auto flex items-center space-x-4">
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/10 shadow-inner">
                  <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs text-white/50 font-medium hover:text-white/90 cursor-pointer transition-colors">{activeTab} Details</div>
                  <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs text-white bg-white/10 rounded-md font-medium shadow-sm border border-white/10 cursor-pointer">Live View</div>
                  <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs text-white/50 font-medium hover:text-white/90 cursor-pointer transition-colors">Settings</div>
                </div>
              </div>
              <div className="absolute right-5 hidden md:flex items-center space-x-3">
                <button className="bg-red-500/20 text-red-500 border border-red-500/40 px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-red-500/30 transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]">Publish</button>
              </div>
            </div>

            {/* Widget Area */}
            <div className={`w-full h-[520px] sm:h-[550px] relative z-10 bg-black/20 opacity-95 hover:opacity-100 transition-opacity duration-700 ${activeTab !== 'Analytics' ? 'overflow-y-auto' : ''}`}>
              {renderActiveTab()}
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="w-full text-center pb-12 border-t border-white/5 pt-12">
            <p className="text-sm text-white/40 mb-8 font-medium tracking-widest uppercase">Trusted by 240+ Companies</p>
            <div className="marquee-container opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="marquee-content">
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current transform rotate-45"></div>
                  <span>Sisyphus</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 rounded-full border-[3px] border-current border-t-transparent"></div>
                  <span>Epicurious</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                  <span>FeatherDev</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 bg-current rounded-sm transform rotate-12"></div>
                  <span>Nietzsche</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  <span>Luminous</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current rounded-full"></div>
                  <span>Acrux</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 22h20L12 2z" /></svg>
                  <span>Stratum</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current transform -rotate-12"></div>
                  <span>Aether</span>
                </div>
              </div>
              {/* Duplicate set for infinite loop */}
              <div className="marquee-content" aria-hidden="true">
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current transform rotate-45"></div>
                  <span>Sisyphus</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 rounded-full border-[3px] border-current border-t-transparent"></div>
                  <span>Epicurious</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                  <span>FeatherDev</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 bg-current rounded-sm transform rotate-12"></div>
                  <span>Nietzsche</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  <span>Luminous</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current rounded-full"></div>
                  <span>Acrux</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 22h20L12 2z" /></svg>
                  <span>Stratum</span>
                </div>
                <div className="text-xl md:text-2xl font-bold flex items-center space-x-3 tracking-tight">
                  <div className="w-7 h-7 border-[3px] border-current transform -rotate-12"></div>
                  <span>Aether</span>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div> {/* End of Top Section Wrapper */}

      {/* About Us Section (Completely separate with no video background, sitting on solid black) */}
      <section id="about" className="w-full bg-black border-t border-white/5 relative z-20">
        <div className="max-w-[1240px] mx-auto pt-10 md:pt-20 pb-10 md:pb-16 px-4 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(16, 185, 129,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 relative z-10 items-center">
            {/* Left Content */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-[1px] w-12 bg-[#10B981]"></div>
                <span className="text-[#10B981] font-semibold tracking-widest uppercase text-sm">About Pippulse FX</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                Institutional-Grade <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#A4FE46]">Forex Execution</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Pippulse FX provides high-speed routing for modern digital asset and Forex trading. With instant access to major currency pairs, indices, and crypto-wallets, we deliver a unified execution hub built for retail and professional traders globally.
              </p>
              <div className="flex items-center space-x-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value="120" suffix="B+" />
                  </span>
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">Monthly Volume</span>
                </div>
                <div className="h-12 w-[1px] bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value="150" suffix="+" />
                  </span>
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">Tradable Assets</span>
                </div>
              </div>
            </div>

            {/* Right Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bento Item 1 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors group relative overflow-hidden sm:col-span-2 md:col-span-1 lg:col-span-2 shadow-sm">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#A4FE46]/10 rounded-full blur-[50px] group-hover:bg-[#A4FE46]/20 transition-all duration-700"></div>
                <Crosshair className="w-8 h-8 text-[#10B981] mb-6 drop-shadow-[0_0_8px_rgba(16, 185, 129,0.5)]" />
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Precision Order Execution</h3>
                <p className="text-white/50 leading-relaxed text-sm md:text-base max-w-md">Our real-time data pipelines are engineered to deliver tick-level accuracy with zero compromises, giving you a definitive edge when milliseconds matter.</p>
              </div>

              {/* Bento Item 2 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors group relative overflow-hidden shadow-sm">
                <Zap className="w-8 h-8 text-[#10B981] mb-6 drop-shadow-[0_0_8px_rgba(16, 185, 129,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">High-Frequency Engine Speed</h3>
                <p className="text-white/50 leading-relaxed text-sm">Experience latency-free interactions, optimized to scale effortlessly.</p>
              </div>

              {/* Bento Item 3 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors group relative overflow-hidden shadow-sm">
                <Shield className="w-8 h-8 text-[#10B981] mb-6 drop-shadow-[0_0_8px_rgba(16, 185, 129,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Institutional Custody Security</h3>
                <p className="text-white/50 leading-relaxed text-sm">Your data and strategies are protected by advanced end-to-end encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classy Bento Grid Dashboard Section below About Section */}
      <section id="dashboard" className="w-full bg-black border-t border-white/5 pt-10 md:pt-24 pb-10 md:pb-16 px-4 relative z-20">
        <div className="max-w-[1240px] mx-auto relative">

          {/* Header / Title */}
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.15] text-white">
              Our Powerful Dashboard Empowers <br />
              over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#A4FE46]">234,000 Analytics</span> Everyday
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-6">

            {/* Card 1: Real-time Market Insight (cols-span-3) */}
            <div className="md:col-span-3 lg:col-span-3 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "100ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Real-time Market Insight</h3>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  At Youflow, we ensure fast, reliable payouts with robust models and verified proof on blockchain and social media.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard1.png"
                  alt="Real-time Market Insight"
                  fill
                  className="object-cover object-top opacity-90 group-hover/bento:opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10"></div>
              </div>
            </div>

            {/* Card 2: Advanced Account Analysis (cols-span-2) */}
            <div className="md:col-span-3 lg:col-span-2 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "200ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Advanced Account Analysis</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Customize your business journey effortlessly with Youflow's advanced analytics pipeline.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard2_v2.png"
                  alt="Advanced Account Analysis"
                  fill
                  className="object-cover object-left opacity-90 group-hover/bento:opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10"></div>
              </div>
            </div>

            {/* Card 3: Portfolio Management (cols-span-2) */}
            <div className="md:col-span-3 lg:col-span-2 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "300ms" }}>
              <div className="bento-card-glow" />
              {/* Classy Top-Left Gradient Glow Overlay */}
              <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_left,rgba(16, 185, 129,0.18),transparent_65%)] pointer-events-none z-0 transition-opacity duration-500 group-hover/bento:opacity-130"></div>

              <div className="mb-8 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Portfolio Management</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Easily tweak your business journey with Youflow's comprehensive portfolio interface.
                </p>
              </div>

              {/* Custom Stock Cards Mockup matching the image */}
              <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#10B981]/20 hover:scale-[1.03] transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-xs">A</div>
                    <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded">+41.3%</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/90 leading-tight">Aspire Biopharm</div>
                    <div className="text-sm font-extrabold text-white mt-1">2.56 <span className="text-[10px] text-white/50 font-normal">USD</span></div>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#10B981]/20 hover:scale-[1.03] transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">U</div>
                    <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded">+58.4%</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/90 leading-tight">Universal Group</div>
                    <div className="text-sm font-extrabold text-white mt-1">155.44 <span className="text-[10px] text-white/50 font-normal">USD</span></div>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#10B981]/20 hover:scale-[1.03] transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold text-xs">N</div>
                    <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">-1.60%</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/90 leading-tight">Nuburu Inc</div>
                    <div className="text-sm font-extrabold text-white mt-1">4.44 <span className="text-[10px] text-white/50 font-normal">USD</span></div>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.04] hover:border-[#10B981]/20 hover:scale-[1.03] transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 font-bold text-xs">M</div>
                    <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded">+51.2%</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white/90 leading-tight">Mobile Health</div>
                    <div className="text-sm font-extrabold text-white mt-1">111.75 <span className="text-[10px] text-white/50 font-normal">USD</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Advanced Charting Tools (cols-span-3) */}
            <div className="md:col-span-3 lg:col-span-3 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "400ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Advanced Charting Tools</h3>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  Access tick-level charts, watchlist indicators, and real-time bid-ask book spreads directly on our dashboard.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard3_v2.png"
                  alt="Advanced Charting Tools"
                  fill
                  className="object-cover object-top opacity-90 group-hover/bento:opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Overlapping Stacking Cards Section */}
      <section ref={stackingSectionRef} id="features" className="w-full bg-black relative z-20 md:h-screen md:flex md:flex-col md:justify-between md:overflow-hidden py-12 md:py-0">
        <div className="max-w-[1240px] mx-auto w-full pt-16 px-4 relative z-30 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.15] text-white">
              Advanced Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#A4FE46]">Ecosystem Suite</span>
            </h2>
          </div>
        </div>

        {/* Cards Deck Container */}
        <div className="relative w-full max-w-[1140px] mx-auto h-auto md:h-[550px] lg:h-[500px] mb-12 md:mb-24 px-4 flex flex-col gap-8 md:block">
          
          {/* Card 1: Welcome Bonus */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-10 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                Welcome Bonus
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Welcome Bonus for <br />New Forex Traders
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Start your journey with extra margin, optimized STP execution feeds, and deeper trading opportunities. Enhance your starting equity instantly upon successful registration.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Extra trading margin applied instantly</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Applicable to Standard & Premium Accounts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Zero restrictions on initial withdrawal profit volumes</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Claim Welcome Bonus</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>
            
            <div className="flex-1 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Promotions & Bonus Offers</span>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded font-bold">Active</span>
              </div>
              
              {/* Bonus Tier 1 */}
              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl mb-3 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#059669] to-pink-500 flex items-center justify-center text-white font-extrabold text-xs">ST</div>
                  <div>
                    <div className="text-xs font-bold text-white">Standard STP Bonus</div>
                    <div className="text-[10px] text-white/40">Minimum Deposit $10</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-green-400">+$50 USD</div>
                  <div className="text-[10px] text-white/40">Equity Boost</div>
                </div>
              </div>
              {/* Bonus Tier 2 */}
              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl mb-3 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-extrabold text-xs">EC</div>
                  <div>
                    <div className="text-xs font-bold text-white">Premium Welcome Tier</div>
                    <div className="text-[10px] text-white/40">Minimum Deposit $100</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-green-400">+$250 USD</div>
                  <div className="text-[10px] text-white/40">Equity Boost</div>
                </div>
              </div>
              {/* Bonus Tier 3 */}
              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-xs">VIP</div>
                  <div>
                    <div className="text-xs font-bold text-white">Pro VIP Leverage</div>
                    <div className="text-[10px] text-white/40">Minimum Deposit $500</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-green-400">+$1,000 USD</div>
                  <div className="text-[10px] text-white/40">Equity Boost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: MetaTrader 5 */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-20 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-grow lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                MT5 Terminal
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Seamless MetaTrader 5 <br />Integration
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Connect your existing MetaTrader accounts effortlessly. Execute orders, track analytics, and manage multi-asset positions with MT5’s institutional-level execution engine under our unified UI wrapper.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Sub-millisecond trade execution latency</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Support for Expert Advisors (EAs) & bots</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Over 80+ indicator overlays and charting tools</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Connect Account</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>
            
            <div className="flex-grow lg:w-1/2 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">MT5 Live Chart Feed</span>
                <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded font-bold">EUR/USD</span>
              </div>
              
              {/* SVG Live Chart Mockup */}
              <div className="w-full h-36 flex items-end justify-between px-2 gap-2 relative">
                <div className="absolute inset-x-0 top-1/4 h-[1px] bg-white/5"></div>
                <div className="absolute inset-x-0 top-2/4 h-[1px] bg-white/5"></div>
                <div className="absolute inset-x-0 top-3/4 h-[1px] bg-white/5"></div>
                
                {/* Candlestick 1 */}
                <div className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-1.5 h-14 bg-green-500 relative flex justify-center">
                    <div className="absolute w-[1px] h-20 -top-3 bg-green-500"></div>
                  </div>
                </div>
                {/* Candlestick 2 */}
                <div className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-1.5 h-8 bg-green-500 relative flex justify-center">
                    <div className="absolute w-[1px] h-12 -top-2 bg-green-500"></div>
                  </div>
                </div>
                {/* Candlestick 3 */}
                <div className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-1.5 h-16 bg-red-500 relative flex justify-center">
                    <div className="absolute w-[1px] h-24 -top-4 bg-red-500"></div>
                  </div>
                </div>
                {/* Candlestick 4 */}
                <div className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-1.5 h-10 bg-green-500 relative flex justify-center">
                    <div className="absolute w-[1px] h-16 -top-2 bg-green-500"></div>
                  </div>
                </div>
                {/* Candlestick 5 */}
                <div className="flex-1 flex flex-col items-center h-full justify-end">
                  <div className="w-1.5 h-20 bg-green-500 relative flex justify-center">
                    <div className="absolute w-[1px] h-28 -top-3 bg-green-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-[11px] text-white/50">
                <span>Bid: 1.0842</span>
                <span>Ask: 1.0844</span>
              </div>
            </div>
          </div>

          {/* Card 3: Crypto Wallet */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-30 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-grow lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                Crypto Wallet
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Secure Wallet Hub & <br />Multi-Chain Support
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Store, swap, and manage assets across multiple blockchains instantly. Benefit from cold-storage Grade-A security, lightning-fast cross-chain swaps, and instant fiat-to-crypto portals.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Support for BTC, ETH, SOL, USDC & 200+ tokens</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Zero-fee swaps inside the ecosystem</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Advanced biometrics and MPC custody security</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Open Wallet Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>
            
            <div className="flex-grow lg:w-1/2 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Your Balance</span>
                <span className="text-[11px] text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded font-extrabold">+$124.50 today</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Total Asset Balance</div>
                  <div className="text-3xl font-black text-white mt-1">$45,280.95<span className="text-sm font-normal text-white/55 ml-2">USD</span></div>
                </div>
                
                <div className="space-y-2">
                  {/* Coin Row 1 */}
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 text-xs font-extrabold">₿</div>
                      <div>
                        <div className="text-xs font-bold text-white">Bitcoin</div>
                        <div className="text-[9px] text-white/40">BTC</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">0.654 BTC</div>
                      <div className="text-[9px] text-white/40">$38,204.50</div>
                    </div>
                  </div>
                  {/* Coin Row 2 */}
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-extrabold">Ξ</div>
                      <div>
                        <div className="text-xs font-bold text-white">Ethereum</div>
                        <div className="text-[9px] text-white/40">ETH</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">2.14 ETH</div>
                      <div className="text-[9px] text-white/40">$7,076.45</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Live Open Positions & Trade Tracker */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-40 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-grow lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                Live Tracking
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Live Open Positions & <br />Trade Tracker
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Monitor active market exposures tick-by-tick. View consolidated volumes, entry prices, live exchange updates, and real-time P&L payouts on a single unified terminal panel.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Tick-level synchronization for live open trades</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Unified view of Standard and Premium account balances</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Instant close, partial profit, and margin limit settings</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Open Live Tracker</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>
            
            <div className="flex-grow lg:w-1/2 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Live Open Trades</span>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded font-bold">1 Active Position</span>
              </div>
              
              {/* Live Positions Table Mockup */}
              <div className="flex-grow flex flex-col justify-center space-y-4">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
                    <span>Symbol</span>
                    <span>Type</span>
                    <span>Volume</span>
                    <span>P&L</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-xs">
                    <span className="text-white">USDJPY</span>
                    <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded text-[10px]">SELL</span>
                    <span className="text-white/80">0.01</span>
                    <span className="text-green-400">+$121.50</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-[11px] text-white/50 bg-white/[0.01] border border-white/5 rounded-xl p-3">
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase">Open Price</span>
                    <span className="font-mono text-white/90">161.67150</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/30 uppercase">Current Price</span>
                    <span className="font-mono text-white/90">161.40850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-black py-10 md:py-24 relative z-20 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Trusted by India's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#A4FE46]">Elite Traders</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base mt-4 max-w-xl">
              See how Pippulse FX is empowering day traders and fund managers across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center space-x-1 text-[#10B981] mb-6">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                "The user interface is incredibly clean and intuitive. It simplifies complex multi-asset trading, allowing me to execute trades and analyze market structures easily without getting overwhelmed by data. A truly premium experience."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-red-500 flex items-center justify-center text-white font-black text-sm">AM</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Aarav Mehta</h4>
                  <p className="text-[11px] text-white/40">Full-Time Trader, Mumbai</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center space-x-1 text-[#10B981] mb-6">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                "Pippulse FX has completely modernized my live portfolio tracking. I can monitor my open positions, swap assets instantly, and track my welcome bonuses seamlessly on this beautiful and responsive interface."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-black text-sm">PS</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Priyanka Sharma</h4>
                  <p className="text-[11px] text-white/40">Futures & Options Trader, Bengaluru</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center space-x-1 text-[#10B981] mb-6">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                "The trading experience is incredibly smooth and fast. The account setup and KYC verification took less than an hour. Coupled with the distraction-free premium UI, trading on this platform is an absolute breeze."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">VI</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Vikram Iyer</h4>
                  <p className="text-[11px] text-white/40">Algorithmic Trader, Chennai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-black py-10 md:py-16 relative z-20 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: FAQ Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-80 h-80 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl group hover:border-[#10B981]/30 transition-all duration-500">
                <Image
                  src="/faq.webp"
                  alt="Frequently Asked Questions"
                  fill
                  sizes="(max-width: 320px) 100vw, 320px"
                  className="object-cover opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
              </div>
            </div>

            {/* Right Side: Accordion Questions */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  q: "What is Pippulse FX?",
                  a: "Pippulse FX is a premium Forex broker platform providing unified dashboard statistics, multi-asset accounts, Welcome Bonuses, crypto-wallet support, and high-speed execution feeds."
                },
                {
                  q: "How does the Welcome Bonus work?",
                  a: "New traders automatically receive extra trading margin added directly to their account balance upon depositing. Standard STP accounts start with a bonus at just a $10 minimum deposit."
                },
                {
                  q: "Can I manage multi-asset trading accounts?",
                  a: "Yes, our dashboard allows you to link and track multiple active accounts simultaneously, showing consolidated asset balances, open trades, real-time margins, and historical P&L."
                },
                {
                  q: "Does the platform support cryptocurrency withdrawals?",
                  a: "Yes, Pippulse FX supports integrated multi-chain wallets allowing secure deposits, swaps, and withdrawals in Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and major stablecoins natively."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="border-b border-white/5 pb-4 transition-all duration-300"
                  >
                    <button
                      className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span className="text-base md:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                        {faq.q}
                      </span>
                      <span className="text-lg md:text-xl text-white/50 ml-4 font-light">
                        {isOpen ? "—" : "+"}
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-sm text-white/50 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning & Connect / Footer Wrapper */}
      <section id="contact" className="w-full bg-[#050507] py-10 md:py-24 relative z-20 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Side: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest mb-4">
                  Contact
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Get in Touch <br />With Our Team
                </h2>
                <p className="text-white/50 text-sm md:text-base mt-4">
                  Have questions about custom API configs, broker pipelines, or enterprise liquidity? Drop us a line.
                </p>
              </div>

              <div className="space-y-4 text-sm text-white/70">
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#10B981]">✉</span>
                  <span>support@youflow.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#10B981]">📍</span>
                  <span>Bandra Kurla Complex, Mumbai, MH, India</span>
                </div>
              </div>
            </div>

            {/* Right Side: Simple Contact Form */}
            <div className="lg:col-span-7 bg-[#0c0c0e]/80 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] transition-all shadow-inner" />
                  <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] transition-all shadow-inner" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] transition-all shadow-inner" />
                <textarea placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#10B981] transition-all h-32 resize-none shadow-inner"></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-[#A4FE46] to-[#10B981] text-white rounded-xl py-4 text-sm font-bold shadow-[0_0_20px_rgba(16, 185, 129,0.3)] hover:shadow-[0_0_30px_rgba(16, 185, 129,0.5)] transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Legal / Disclaimers Footer Area */}
          <div className="border-t border-white/5 pt-12 space-y-8 text-xs text-white/35 leading-relaxed">
            <div>
              <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Risk Warning</h4>
              <p>
                Trading derivatives carries significant risks. It is not suitable for all investors and if you are a professional client, you could lose substantially more than your initial investment. When acquiring our derivative products, you have no entitlement, right or obligation to the underlying financial assets. Past performance is no indication of future performance and tax laws are subject to change. The information on this website is general in nature and doesn't take into account your personal objectives, financial circumstances, or needs. Accordingly, before acting on the advice, you should consider whether the advice is suitable for you having regard to your objectives, financial situation and needs. We encourage you to seek independent advice if necessary. Please read our legal documents and ensure that you fully understand the risks before you make any trading decisions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Regional Restrictions</h4>
              <p>
                We do not offer our services to residents of certain jurisdictions, including India, Canada, China, Singapore, the United States, or any jurisdictions listed on the FATF "blacklist" or subject to US/EU/UN sanctions. For more information please refer to our FAQ page. The information on this site and the products and services offered are not intended for distribution to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. While the Authority has granted a securities or derivatives investment business licence to the Licensee, the Authority does not endorse or vouch for the merits of the products offered by the Licensee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Space below the last section */}
      <div className="w-full h-12 bg-black"></div>

      {/* Footer */}
      <footer className="w-full bg-[#030305] border-t border-white/5 py-12 relative z-20">
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
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Pippulse FX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
