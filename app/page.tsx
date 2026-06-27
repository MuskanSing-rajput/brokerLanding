"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play, Crosshair, Zap, Shield, Menu, X, ChevronDown, Monitor, Smartphone, Users, Repeat } from "lucide-react";
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



export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [typedGlobeTitle, setTypedGlobeTitle] = useState("");
  const stackingSectionRef = useRef<HTMLDivElement>(null);
  const platformDropdownRef = useRef<HTMLDivElement>(null);
  const firstHeroRef = useRef<HTMLDivElement>(null);
  const secondHeroRef = useRef<HTMLDivElement>(null);

  // Typing effect for the Globe Section
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const globeTitleFull = isMobile 
      ? "Global Markets\nat\nYour Fingertips."
      : "Global Markets at\nYour Fingertips.";
    let i = 0;
    const interval = setInterval(() => {
      setTypedGlobeTitle(globeTitleFull.slice(0, i));
      i++;
      if (i > globeTitleFull.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformDropdownRef.current && !platformDropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
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
          end: "+=4000", // Increased scroll distance for smoother, longer progression
          scrub: 1.5, // Increased scrub for a very smooth, fluid feel
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

  // GSAP Stacking Effect for First & Second Hero
  useGSAP(() => {
    if (typeof window === "undefined" || !firstHeroRef.current || !secondHeroRef.current) return;
    
    // We pin the first hero so that the second hero naturally scrolls OVER it.
    ScrollTrigger.create({
      trigger: firstHeroRef.current,
      start: "top top",
      // Pin until the second hero has fully scrolled over it (1 viewport height)
      end: () => `+=${window.innerHeight}`,
      pin: true,
      pinSpacing: false, // This is the magic that lets the next section overlay it
    });
  });


  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#10B981]/30">

      {/* Global Fixed Navbar and Mobile Menu Container */}
      <div className="fixed top-0 inset-x-0 z-[100] pointer-events-none">
        <div className="pointer-events-auto bg-black/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Global Fixed Navbar */}
          <header className="flex items-center justify-between px-6 md:px-12 py-6 max-w-[1200px] w-full mx-auto bg-transparent transition-all">
            {/* Logo */}
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
            <a href="#" className="hover:text-white transition-colors">Home</a>
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
                  {/* Column 1 */}
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

                  {/* Divider */}
                  <div className="w-[1px] bg-white/10 self-stretch"></div>

                  {/* Column 2 */}
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
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/5">About</Link>

            {/* Mobile Platform Submenu */}
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
        </div>
      </div>

      {/* Top Section Wrapper (Hero + Dashboard + Partners) with Background Video */}
      <div ref={firstHeroRef} className="relative w-full z-10 flex flex-col gpu-accelerated overflow-hidden pb-[300px]">
        {/* Background Video (now absolute instead of fixed, bound to this container only) */}
        <div className="absolute top-[150px] inset-x-0 bottom-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-[center_45%] w-full h-full opacity-100 mix-blend-screen"
          >
            <source src="/vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#10B981]/10 via-black/20 to-black/50"></div>

          {/* Scroll Down Button to hide video logo */}
          <button
            onClick={() => secondHeroRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-[-4px] right-[96px] md:bottom-[12px] md:right-[112px] z-20 pointer-events-auto group flex items-center justify-center bg-black/90 backdrop-blur-xl border border-[#10B981]/30 text-white/90 hover:text-white w-14 h-14 md:w-16 md:h-16 rounded-full hover:bg-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            aria-label="Scroll Down"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-y-1 transition-transform text-[#10B981]" />
          </button>
        </div>

        {/* Main Hero Section */}
        <main className="relative z-10 flex-grow flex flex-col items-center pt-[140px] px-4 w-full max-w-[1200px] mx-auto">

          {/* Headlines */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-center tracking-tight leading-[1.1] mb-[15px]">
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

        </main>
      </div> {/* End of Top Section Wrapper */}

      {/* Globe Video Section (Second Hero) */}
      <section ref={secondHeroRef} className="relative w-full min-h-screen flex items-center bg-black border-t border-white/5 z-20 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
         {/* Background Video */}
         <div className="absolute inset-0 z-0">
            <video src="/globe.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
         </div>

         <div className="relative z-10 max-w-[1200px] mx-auto px-4 w-full pt-20 pb-20">
            {/* Title in left side */}
            <div className="text-left max-w-3xl">
               <h2 className="text-4xl sm:text-5xl md:text-[72px] font-bold tracking-tight leading-tight text-white mb-6 min-h-[160px] md:min-h-[180px] xl:min-h-0 whitespace-pre-line">
                 {typedGlobeTitle}<span className="animate-pulse text-[#A4FE46]">_</span>
               </h2>
               <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-10">
                 Join thousands of traders worldwide using our seamless, lightning-fast platform. No borders, no limits.
               </p>
               <button className="flex items-center justify-center space-x-2 bg-[#A4FE46] text-black w-full sm:w-auto px-8 py-4 rounded-xl font-bold hover:bg-[#8ee036] transition-all shadow-[0_0_25px_rgba(164,254,70,0.4)] hover:scale-105">
                 <span>Explore Global Markets</span>
                 <ArrowUpRight className="w-5 h-5" />
               </button>
            </div>
         </div>
         {/* Scroll Down Button for Second Hero */}
         <button
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-[94px] right-[23px] md:bottom-[118px] md:right-[97px] z-30 pointer-events-auto group flex items-center justify-center bg-black/90 backdrop-blur-xl border border-[#10B981]/30 text-white/90 hover:text-white w-14 h-14 md:w-16 md:h-16 rounded-full hover:bg-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            aria-label="Scroll Down"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-y-1 transition-transform text-[#10B981]" />
          </button>
      </section>

      {/* Trusted By Section */}
      <section className="w-full bg-black relative z-20 pt-[35px]">
        <div className="max-w-[1200px] mx-auto px-4">
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
        </div>
      </section>

      {/* About Us Section (Completely separate with no video background, sitting on solid black) */}
      <section id="about" className="w-full bg-black border-t border-white/5 relative z-20">
        <div className="max-w-[1240px] mx-auto pt-10 md:pt-20 pb-10 md:pb-16 px-4 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle,_rgba(16, 185, 129,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 relative z-10 items-center">
            {/* Left Content */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-[1px] w-12 bg-[#10B981]"></div>
                <span className="text-[#10B981] font-semibold tracking-widest uppercase text-sm">About Pippulse FX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
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
            <div className="md:col-span-3 lg:col-span-3 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[380px] md:min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "100ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Real-time Market Insight</h3>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  At Youflow, we ensure fast, reliable payouts with robust models and verified proof on blockchain and social media.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-transparent shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard1.webp"
                  alt="Real-time Market Insight"
                  fill
                  className="object-cover object-top opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
              </div>
            </div>

            {/* Card 2: Advanced Account Analysis (cols-span-2) */}
            <div className="md:col-span-3 lg:col-span-2 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[380px] md:min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "200ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Advanced Account Analysis</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Customize your business journey effortlessly with Youflow's advanced analytics pipeline.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-transparent shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard2_v2.webp"
                  alt="Advanced Account Analysis"
                  fill
                  className="object-cover object-left opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
              </div>
            </div>

            {/* Card 3: Portfolio Management (cols-span-2) */}
            <div className="md:col-span-3 lg:col-span-2 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[380px] md:min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "300ms" }}>
              <div className="bento-card-glow" />
              {/* Classy Top-Left Gradient Glow Overlay */}
              <div className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-[radial-gradient(circle_at_top_left,rgba(16, 185, 129,0.18),transparent_65%)] pointer-events-none z-0 transition-opacity duration-500 group-hover/bento:opacity-130"></div>

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
            <div className="md:col-span-3 lg:col-span-3 bg-[#0c0c0e]/95 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group/bento hover:border-[#10B981]/30 hover:-translate-y-1.5 transition-all duration-500 ease-out shadow-xl min-h-[380px] md:min-h-[460px] bento-card-animate bento-card" style={{ animationDelay: "400ms" }}>
              <div className="bento-card-glow" />

              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Advanced Charting Tools</h3>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  Access tick-level charts, watchlist indicators, and real-time bid-ask book spreads directly on our dashboard.
                </p>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-transparent shadow-inner mt-auto transition-transform duration-500 group-hover/bento:scale-[1.02] relative z-10">
                <Image
                  src="/dashboard3_v2.webp"
                  alt="Advanced Charting Tools"
                  fill
                  className="object-cover object-top opacity-100 transition-all duration-700 ease-out group-hover/bento:scale-105"
                />
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

          {/* Card 5: IB Broker */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-50 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-grow lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                IB Partnership
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Premium IB Broker <br />Program
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Build your trading business with our lucrative Introducing Broker program. Enjoy real-time commission payouts, multi-tier rebate structures, and advanced IB portal analytics.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Highest rebate rates in the industry</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Detailed sub-IB reporting and analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Instant commission withdrawals</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Become an IB</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>

            <div className="flex-grow lg:w-1/2 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">IB Dashboard Preview</span>
                <span className="text-[10px] text-[#10B981] border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-0.5 rounded font-bold">Level 3 IB</span>
              </div>

              <div className="flex-grow flex flex-col justify-center space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total Rebate</div>
                    <div className="text-xl font-extrabold text-white">$12,450.00</div>
                    <div className="text-[10px] text-green-400 mt-1">↑ 14% this month</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Active Clients</div>
                    <div className="text-xl font-extrabold text-white">142</div>
                    <div className="text-[10px] text-green-400 mt-1">↑ +12 this month</div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest">
                    <span>Recent Commissions</span>
                    <span>Lots</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      <span className="text-white/80">Client #8821</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-white/60">2.50</span>
                      <span className="text-green-400 font-bold">+$50.00</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      <span className="text-white/80">Client #7109</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-white/60">1.00</span>
                      <span className="text-green-400 font-bold">+$20.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Copy Trading */}
          <div className="gsap-card relative md:absolute md:inset-x-4 md:top-0 md:bottom-0 z-60 bg-[#0c0c0e]/98 border border-white/10 rounded-[32px] p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden w-full md:w-auto">
            <div className="flex-grow lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                Social Trading
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Advanced Copy <br />Trading Network
              </h3>
              <p className="text-white/60 text-xs sm:text-sm lg:text-base leading-relaxed">
                Connect with top performing traders globally. Mirror successful strategies in real-time or become a strategy provider to earn performance fees from your followers.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-white/80">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Zero-delay trade execution mirroring</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Flexible risk management and stop-loss controls</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
                  <span>Transparent strategy performance history</span>
                </li>
              </ul>
              <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-[10px] md:text-xs font-semibold text-white transition-all">
                <span>Start Copying</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            </div>

            <div className="flex-grow lg:w-1/2 w-full bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between min-h-[220px] lg:min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Top Strategy Providers</span>
                <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded font-bold">Live Data</span>
              </div>

              {/* Leaderboard Mockup */}
              <div className="flex-grow flex flex-col justify-center space-y-3">
                {/* Trader 1 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">AL</div>
                    <div>
                      <div className="text-xs font-bold text-white">Alex_FX</div>
                      <div className="text-[10px] text-white/40">Risk Level 3</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <div className="text-xs font-extrabold text-green-400">+340%</div>
                      <div className="text-[10px] text-white/40">12M ROI</div>
                    </div>
                    <button className="bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#10B981] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">Copy</button>
                  </div>
                </div>

                {/* Trader 2 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs">MR</div>
                    <div>
                      <div className="text-xs font-bold text-white">Macro_Pro</div>
                      <div className="text-[10px] text-white/40">Risk Level 4</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <div className="text-xs font-extrabold text-green-400">+215%</div>
                      <div className="text-[10px] text-white/40">12M ROI</div>
                    </div>
                    <button className="bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#10B981] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">Copy</button>
                  </div>
                </div>

                {/* Trader 3 */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors opacity-70">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">SJ</div>
                    <div>
                      <div className="text-xs font-bold text-white">Sniper_J</div>
                      <div className="text-[10px] text-white/40">Risk Level 2</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <div className="text-xs font-extrabold text-green-400">+180%</div>
                      <div className="text-[10px] text-white/40">12M ROI</div>
                    </div>
                    <button className="bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#10B981] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">Copy</button>
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
                  src="/faq_v2.jpg"
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
