import Link from "next/link"

export function Nav() {
  const links = [
    { href: "/about", label: "ABOUT" },
    { href: "/articles", label: "ARTICLES" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/talks", label: "TALKS" },
    { href: "/podcasts", label: "PODCASTS" },
    { href: "/investing", label: "INVESTING" },
    { href: "/uses", label: "USES" },
    { href: "/reminder", label: "REMINDER" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
      <Link href="/" className="text-2xl font-bold">
        Z
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

