import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to StreamZen
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your ultimate destination for streaming movies and TV shows in stunning quality
          </p>
          <Link 
            href="/browse" 
            className="btn-primary text-lg px-8 py-3"
          >
            Start Watching
          </Link>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Featured content cards will be dynamically populated */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card">
                <div className="aspect-video bg-gray-800" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Featured Title {item}</h3>
                  <p className="text-gray-400">Genre • Year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 