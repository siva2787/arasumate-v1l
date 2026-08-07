import { useEffect, useState } from 'react'

const sections = ['home', 'features', 'about', 'how-it-works', 'notifications', 'faq', 'contact']

export default function SideNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              active === id ? 'bg-primary scale-125 ring-4 ring-primary/20' : 'bg-ink/20 group-hover:bg-primary/60'
            }`}
          />
          <span className="absolute left-6 whitespace-nowrap text-xs font-medium capitalize opacity-0 group-hover:opacity-100 transition-opacity glass px-2 py-1 rounded-md">
            {id.replace('-', ' ')}
          </span>
        </button>
      ))}
    </div>
  )
}
