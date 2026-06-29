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
