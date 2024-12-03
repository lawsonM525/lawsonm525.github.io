import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Posts() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-4">
      <Nav />
      <div className="space-y-4 max-w-2xl mx-auto mt-20">
        <h1 className="text-4xl font-bold">Posts</h1>
        <p className="text-gray-400">This is the Posts page content.</p>
      </div>
      <Footer />
    </main>
  )
}

