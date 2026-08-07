import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const details = [
    { icon: Mail, label: 'Email Us', value: 'sivaai2787@gmail.com' },
    { icon: Phone, label: 'Call Us', value: '+91 84895 90056' },
    { icon: MapPin, label: 'Location', value: 'Kumbakonam, Tamil Nadu' },
  ]

  const inputClass =
    'bg-white border border-ink/15 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors'

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Contact Us</p>
          <h2 className="font-display font-bold text-4xl mb-6">
            We'd love to <span className="text-gradient">hear from you!</span>
          </h2>
          <p className="text-ink/60 mb-10 max-w-sm leading-relaxed">
            Have questions, suggestions or need support? Reach out to us anytime.
          </p>
          <div className="space-y-5">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-ink/40">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="bg-primary/5 border border-primary/10 rounded-3xl p-8 shadow-glass relative"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input required placeholder="Your Name" className={inputClass} />
            <input required type="email" placeholder="Email Address" className={inputClass} />
          </div>
          <input required placeholder="How can we help you?" className={`w-full mb-4 ${inputClass}`} />
          <textarea required rows={4} placeholder="Type your message here..." className={`w-full mb-5 resize-none ${inputClass}`} />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex items-center gap-2 bg-grad-primary text-white px-7 py-3.5 rounded-full font-semibold shadow-soft"
          >
            <Send size={16} /> {sent ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}