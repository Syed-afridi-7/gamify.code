export default function Dashboard() {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto border-t border-foreground/10">
      <h1 className="text-4xl font-bold mb-8 text-primary">Your Practice Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
          <h2 className="font-semibold text-lg text-foreground/80 mb-2">Current Streak</h2>
          <p className="text-4xl font-bold">12 Days 🔥</p>
        </div>
        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
          <h2 className="font-semibold text-lg text-foreground/80 mb-2">Total XP</h2>
          <p className="text-4xl font-bold text-secondary">4,520</p>
        </div>
        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
          <h2 className="font-semibold text-lg text-foreground/80 mb-2">Global Rank</h2>
          <p className="text-4xl font-bold text-accent">#1,432</p>
        </div>
      </div>
    </div>
  )
}
