import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <Nav />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Zeno Rocha</h1>
        <div className="space-y-2">
          <p className="text-lg">
            Founder & CEO at{" "}
            <a
              href="https://resend.com"
              className="underline hover:text-gray-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </a>
          </p>
          <p className="text-gray-400">Obsessed with developer experience</p>
        </div>
        <div className="text-sm text-gray-400 mt-8">
          Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> +{" "}
          <kbd className="px-2 py-1 bg-gray-800 rounded">K</kbd> to start →
        </div>
      </div>
      <Footer />
    </main>
  )
}

