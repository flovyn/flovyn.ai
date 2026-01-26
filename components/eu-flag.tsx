interface EUFlagProps {
  className?: string
}

export function EUFlag({ className = "h-5 w-7" }: EUFlagProps) {
  // Official EU flag: 12 gold stars on blue background
  const stars = []
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180)
    const cx = 21 + 14 * Math.cos(angle)
    const cy = 15 + 14 * Math.sin(angle)
    stars.push(
      <polygon
        key={i}
        fill="#FFCC00"
        points={`${cx},${cy - 3} ${cx + 0.9},${cy - 0.9} ${cx + 3},${cy - 0.9} ${cx + 1.2},${cy + 0.6} ${cx + 1.8},${cy + 3} ${cx},${cy + 1.5} ${cx - 1.8},${cy + 3} ${cx - 1.2},${cy + 0.6} ${cx - 3},${cy - 0.9} ${cx - 0.9},${cy - 0.9}`}
      />
    )
  }

  return (
    <svg className={className} viewBox="0 0 42 30" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#003399" width="42" height="30" rx="2" />
      {stars}
    </svg>
  )
}
