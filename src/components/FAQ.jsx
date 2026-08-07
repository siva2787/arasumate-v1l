import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import faqIllustration from '../assets/faq-illustration.png'

const faqs = [
  { q: 'Is ARASUMATE free to use?', a: 'Yes, ARASUMATE is completely free for all students to download and use.' },
  { q: 'Is my data safe with ARASUMATE?', a: 'Yes, your data is stored securely and never shared with third parties.' },
  { q: 'Can I use ARASUMATE offline?', a: 'Yes, ARASUMATE runs fully offline on your device once installed.' },
  { q: 'Do I need to register to use the app?', a: 'No lengthy sign-up is required, you can get started in just a few taps.' },
  { q: 'What Android version is required?', a: 'ARASUMATE requires Android 9 and above for the best experience.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-pad bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="font-display font-bold text-4xl mb-4">
            Frequently Asked <span className="text-gradient">Questions.</span>
          </h2>
          <motion.img
            src={faqIllustration}
            alt="FAQ illustration"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="mt-8 w-full max-w-xs rounded-3xl shadow-glass"
          />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-sm md:text-base">{f.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} className="text-primary shrink-0 ml-4">
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <p className="px-6 pb-5 text-sm text-ink/60 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}