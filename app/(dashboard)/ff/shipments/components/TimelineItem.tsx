"use client"

interface TimelineItemProps {
  title: string
  time: string
  active?: boolean
  hasAction?: boolean
  isLast?: boolean
  onActionClick?: () => void
}

export function TimelineItem({
  title,
  time,
  active = false,
  hasAction = false,
  isLast = false,
  onActionClick,
}: TimelineItemProps) {
  return (
    <div className={`flex gap-4 pb-8 ${isLast ? "" : ""}`}>
      <div className="relative">
        <div
          className={`w-6 h-6 rounded-full ${
            active ? "bg-[#8bc5e3]" : "bg-[#e1e5ea]"
          } flex items-center justify-center z-10 relative`}
        >
          {active && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[#1e1e1e] font-medium text-sm">{title}</div>
        <div className="text-[#969ba0] text-xs">{time}</div>
        {hasAction && (
          <div className="mt-2">
            <button className="text-[#2d9cdb] text-xs hover:underline" onClick={onActionClick}>
              View Quote Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
