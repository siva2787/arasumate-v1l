export default function FloatingShapes({ variant = 'default' }) {
  if (variant === 'dark') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 right-16 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-accent animate-float-delay" />
      </div>
    )
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-16 right-[8%] w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-70 animate-float shadow-soft" />
      <div className="absolute top-1/3 left-[4%] w-8 h-8 rounded-full bg-secondary/40 animate-float-delay" />
      <div className="absolute bottom-24 right-[20%] w-20 h-20 rounded-full border-8 border-accent/40 animate-float-slow" />
      <div className="absolute bottom-10 left-[12%] w-6 h-6 rounded-md bg-primary/60 animate-float" />
    </div>
  )
}
