interface TimelineProps {
  children: React.ReactNode
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 transform -translate-x-1/2" />
      {/* Content */}
      <div className="space-y-16">
        {children}
      </div>
    </div>
  )
}

