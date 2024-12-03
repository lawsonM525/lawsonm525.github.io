interface TimelineItemProps {
  children: React.ReactNode
  date: string
}

export function TimelineItem({ children, date }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Date marker */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gray-900 text-gray-400 px-4 py-1 rounded-full border border-gray-800 text-sm">
          {date}
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 gap-8 pt-8">
        {children}
      </div>
    </div>
  )
}

