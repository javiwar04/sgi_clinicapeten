"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Stethoscope } from "lucide-react"

interface BrandLogoProps {
  variant?: "full" | "icon"
  className?: string
  imgClassName?: string
  alt?: string
}

export function BrandLogo({
  variant = "full",
  className,
  imgClassName,
  alt = "SGI Clinica de Peten",
}: BrandLogoProps) {
  const [hasImageError, setHasImageError] = useState(false)

  if (variant === "icon") {
    return hasImageError ? (
      <div className={cn("w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center", className)}>
        <Stethoscope className="w-5 h-5 text-sidebar-primary-foreground" />
      </div>
    ) : (
      <img
        src="/logoempresa.png"
        alt={alt}
        className={cn("w-10 h-10 object-contain", className, imgClassName)}
        onError={() => setHasImageError(true)}
      />
    )
  }

  return hasImageError ? (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
        <Stethoscope className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <p className="text-base font-bold text-foreground leading-tight">SGI Clinica de Peten</p>
        <p className="text-xs text-muted-foreground">Sistema de Gestion Integrado</p>
      </div>
    </div>
  ) : (
    <img
      src="/logoempresa.png"
      alt={alt}
      className={cn("h-16 w-auto object-contain", className, imgClassName)}
      onError={() => setHasImageError(true)}
    />
  )
}
