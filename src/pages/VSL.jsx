import { useState, useEffect } from 'react';
import { PlayCircle, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VSL() {
  const [showOffer, setShowOffer] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Timed delay script for CTA and bottom section
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 10000); // 10 seconds for testing - adjust as needed for the real video
    
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      question: "What exactly is The Well-Being Visit?",
      answer: "It's a comprehensive, personalized session where we identify the root causes of your symptoms and create a clear, actionable roadmap for your recovery. No guesswork, just results."
    },
    {
      question: "How quickly will I see results?",
      answer: "While every body is different, many of our clients begin experiencing noticeable relief in their energy levels, digestion, or clarity within the first 14 to 30 days of implementing their custom protocol."
    },
    {
      question: "Is this for me if I've already tried other practitioners?",
      answer: "Yes. The reason most approaches fail is that they treat symptoms, not the system. Our functional approach dives deeper to find what others have missed."
    },
    {
      question: "Do I have to commit to a long-term package?",
      answer: "No. The Well-Being Visit is designed to give you immense standalone value. At the end, if you want further support, we can discuss options, but there is absolutely zero pressure."
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-therapyRed/20">
      
      {/* HEADER SECTION (Hook) */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-therapyRed font-bold tracking-widest uppercase text-sm mb-4">
            A Special Message
          </p>
          <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-deepBlack leading-tight mb-8">
            Stop guessing with your health. <br className="hidden md:block"/>
            <span className="text-therapyRed">Find the root cause and reclaim your vitality in 30 days.</span>
          </h1>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Video Placeholder */}
          <div className="w-full aspect-video bg-deepBlack/5 rounded-2xl border border-charcoal/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:shadow-[0_20px_50px_rgba(232,72,85,0.15)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-cream/40 to-transparent z-0"></div>
            <PlayCircle className="w-20 h-20 text-therapyRed/80 group-hover:text-therapyRed group-hover:scale-110 transition-all duration-300 z-10" />
            <p className="mt-4 font-sans text-softText text-sm tracking-wide z-10">VSL Video Placeholder</p>
          </div>
        </div>
      </section>

      {/* DELAYED CONTENT (Revealed after X seconds) */}
      <AnimatePresence>
        {showOffer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* CTA SECTION */}
            <section className="px-6 pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <a 
                  href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-therapyRed text-cream px-10 py-5 rounded-md font-sans text-lg tracking-wide font-bold transition-all duration-300 hover:bg-[#D43B47] hover:-translate-y-1 shadow-[0_10px_30px_rgba(232,72,85,0.3)] hover:shadow-[0_15px_40px_rgba(232,72,85,0.4)] w-full sm:w-auto"
                >
                  Yes, I Want To Reclaim My Health Now
                </a>
                <p className="mt-4 text-sm text-softText flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-therapyRed" /> Secure, encrypted checkout.
                </p>
                
                {/* Guarantee */}
                <div className="mt-8 p-6 bg-white/50 border border-charcoal/5 rounded-xl inline-block max-w-xl mx-auto">
                  <h3 className="font-serif italic text-xl text-deepBlack mb-2 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-therapyRed" /> 
                    Our Unconditional Guarantee
                  </h3>
                  <p className="text-sm text-softText">
                    If you don't feel completely confident in your personalized roadmap after our session, let us know within 30 days and we'll refund your investment in full. No questions asked.
                  </p>
                </div>
              </div>
            </section>

            {/* RAW TESTIMONIALS */}
            <section className="bg-sand/30 py-20 px-6 border-y border-charcoal/5">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-serif italic text-3xl text-center text-deepBlack mb-12">
                  Real Results from Real People
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Testimonial 1 */}
                  <div className="bg-cream p-6 rounded-xl shadow-sm border border-charcoal/5 relative">
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-therapyRed/20" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-therapyRed/10 flex items-center justify-center text-therapyRed font-bold">
                        S
                      </div>
                      <div>
                        <p className="font-bold text-sm text-deepBlack">Sarah M.</p>
                        <p className="text-xs text-softText">Verified Client</p>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      "I honestly didn't think I'd ever feel 'normal' again. The Well-Being Visit changed everything. We found issues my regular doctor completely missed."
                    </p>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="bg-cream p-6 rounded-xl shadow-sm border border-charcoal/5 relative">
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-therapyRed/20" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-therapyRed/10 flex items-center justify-center text-therapyRed font-bold">
                        D
                      </div>
                      <div>
                        <p className="font-bold text-sm text-deepBlack">David T.</p>
                        <p className="text-xs text-softText">Verified Client</p>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      "Straight to the point, incredibly thorough, and I finally have my energy back. Worth every single penny and more."
                    </p>
                  </div>
                  {/* Testimonial 3 */}
                  <div className="bg-cream p-6 rounded-xl shadow-sm border border-charcoal/5 relative md:col-span-2 lg:col-span-1">
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-therapyRed/20" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-therapyRed/10 flex items-center justify-center text-therapyRed font-bold">
                        E
                      </div>
                      <div>
                        <p className="font-bold text-sm text-deepBlack">Elena R.</p>
                        <p className="text-xs text-softText">Verified Client</p>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal/80 leading-relaxed">
                      "No fluff. The protocol was intense but exactly what I needed. I'm sleeping through the night for the first time in years."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif italic text-3xl text-center text-deepBlack mb-12">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index}
                      className="border border-charcoal/10 rounded-lg overflow-hidden transition-all duration-300 bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-sand/30 transition-colors"
                      >
                        <span className="font-bold text-charcoal pr-4">{faq.question}</span>
                        {openFaqIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-therapyRed flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-softText flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-5 text-sm text-softText leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* BOTTOM CTA */}
            <section className="pb-24 px-6 text-center">
               <a 
                  href="https://my.practicebetter.io/#/6a060b207f0211c5a9119095/forms?f=6a0610b41d3c13bde41aefb9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-therapyRed text-cream px-10 py-5 rounded-md font-sans text-lg tracking-wide font-bold transition-all duration-300 hover:bg-[#D43B47] hover:-translate-y-1 shadow-[0_10px_30px_rgba(232,72,85,0.3)] w-full sm:w-auto"
                >
                  Yes, I Want To Reclaim My Health Now
                </a>
            </section>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
