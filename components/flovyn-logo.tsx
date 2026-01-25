"use client"

import { cn } from "@/lib/utils"

interface FlovynLogoProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
}

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
}

/**
 * Flow Nodes Logo - Connected nodes forming an "F" shape
 * Represents workflow orchestration and process connections
 */
export function FlovynLogo({
  size = "md",
  showText = false,
  className,
  ...props
}: FlovynLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={cn(sizeMap[size], className)}
        {...props}
      >
        {/* Connection lines */}
        <path
          d="M8 8 L8 16 M8 16 L20 16 M8 16 L8 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Nodes */}
        <circle cx="8" cy="8" r="3" fill="currentColor" />
        <circle cx="8" cy="16" r="3" fill="currentColor" />
        <circle cx="20" cy="16" r="3" fill="currentColor" />
        <circle cx="8" cy="24" r="3" fill="currentColor" />
      </svg>
      {showText && (
        <span className="font-semibold text-foreground">Flovyn</span>
      )}
    </div>
  )
}

/**
 * Logo icon wrapper with background styling
 * Used in headers and branded contexts
 */
export function FlovynLogoIcon({
  size = "md",
  className,
  ...props
}: Omit<FlovynLogoProps, "showText">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md bg-primary text-primary-foreground",
        size === "sm" && "h-7 w-7",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        size === "xl" && "h-12 w-12",
        className
      )}
    >
      <FlovynLogo size={size} {...props} />
    </div>
  )
}
