import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  const socialLinks = [
    { href: "mailto:example@email.com", icon: Mail, label: "Email" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center space-x-6">
      {socialLinks.map((link) => {
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={link.label}
          >
            <Icon className="w-5 h-5" />
          </Link>
        )
      })}
    </footer>
  )
}

