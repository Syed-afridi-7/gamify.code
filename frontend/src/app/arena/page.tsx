export default function Arena() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-accent drop-shadow-[0_0_15px_rgba(255,71,87,0.5)]">Clash Arena</h1>
      <p className="text-xl text-foreground/70 max-w-lg mb-12">Matchmaking in progress. Get ready to prove your skills.</p>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-foreground/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
        <span className="text-2xl font-bold text-accent animate-pulse">VS</span>
      </div>
    </div>
  )
}
