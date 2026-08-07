import { motion } from 'framer-motion'
import { Download, ShieldCheck, WifiOff, UserX } from 'lucide-react'
import FloatingShapes from './FloatingShapes'
import logo from '../assets/logo.png'

const APK_URL = '/arasumate-v1.apk'

export default function DownloadCTA() {
  return (
    <section id="download" className="relative section-pad bg-grad-primary text-white overflow-hidden">
      <FloatingShapes variant="dark" />
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-14 items-center relative z-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight text-white"
          >
            Ready to improve <br /> your academic life?
          </motion.h2>
          <div className="flex flex-wrap gap-3 mb-8 text-sm">
            {[[WifiOff, 'Offline First'], [ShieldCheck, 'Secure & Private'], [UserX, 'No Registration Hassle']].map(([Icon, label]) => (
              <span key={label} className="inline-flex items-center gap-1.5 bg-white/15 text-white px-3 py-1.5 rounded-full">
                <Icon size={14} /> {label}
              </span>
            ))}
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={APK_URL}
            download
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold shadow-2xl"
          >
            <Download size={18} /> Download APK
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-2xl text-ink"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="ARASUMATE" className="w-9 h-9 rounded-lg" />
            <div>
              <p className="font-semibold text-sm text-ink">ARASUMATE v1.0.0</p>
              <p className="text-xs text-ink/50">Latest Version</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs mb-5">
            <div className="bg-primary/5 rounded-xl p-3"><p className="text-ink/40">Android</p><p className="font-semibold text-ink">9.0+</p></div>
            <div className="bg-primary/5 rounded-xl p-3"><p className="text-ink/40">APK Size</p><p className="font-semibold text-ink">73 MB</p></div>
            <div className="bg-primary/5 rounded-xl p-3"><p className="text-ink/40">Version</p><p className="font-semibold text-ink">1.0.0</p></div>
            <div className="bg-primary/5 rounded-xl p-3"><p className="text-ink/40">Updated</p><p className="font-semibold text-ink">Aug 2026</p></div>
          </div>
          <div className="w-full aspect-square max-w-[130px] mx-auto bg-white border border-primary/10 rounded-2xl flex items-center justify-center p-2">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + APK_URL)}`}
              alt="Scan to download ARASUMATE APK"
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-xs text-ink/50 mt-2">Scan to Download</p>
        </motion.div>
      </div>
    </section>
  )
}