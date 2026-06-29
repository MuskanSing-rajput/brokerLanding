import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* Footer Disclaimer Wrap */}
      <section className="w-full bg-[#050507] py-12 border-t border-white/5 relative z-10">
        <div className="max-w-[1240px] mx-auto px-4 text-xs text-white/35 leading-relaxed space-y-6">
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Risk Warning</h4>
            <p className="space-y-4">
              <span>An investment in derivatives may mean investors may lose an amount even greater than their original investment. Anyone wishing to invest in any of the products mentioned in https://investminfx.net/ should seek their own financial or professional advice. Trading of securities, forex, stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to invest in the markets. Don&apos;t invest and trade with money which you can&apos;t afford to lose. Forex Trading are not allowed in some countries, before investing your money, make sure whether your country is allowing this or not.</span>
              <br/><br/>
              <span>You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of investminFx or any of its affiliates, directors, officers or employees.</span>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Regional Restrictions</h4>
            <p>
              Restricted Regions: investminFx Limited does not provide services for citizens/residents of the United States, Cuba, Iraq, Myanmar, North Korea, Sudan, United Arab Emirates and India. The services of investminFx Limited are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/60 mb-2 uppercase tracking-wider text-[10px]">Company Information</h4>
            <div className="space-y-1 flex flex-col">
              <span className="font-semibold text-white/50">INVESTMINFX LIMITED</span>
              <span>Sterling Technology Hub, Unit 1, Station 07, La Place Creole Building, Rodney Village, Rodney Bay, Gros Islet</span>
              <span>Registration number: 2025-00895</span>
              <span>Corporate email: info@investminfx.net</span>
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
            <Link href="/about" className="hover:text-white transition-colors">about us</Link>
            <Link href="/promotions" className="hover:text-white transition-colors">promotion</Link>
            <Link href="/partners" className="hover:text-white transition-colors">partners</Link>
            <Link href="/trading" className="hover:text-white transition-colors">trading</Link>
            <Link href="/legal" className="hover:text-white transition-colors">legal & risk</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Pippulse FX. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
