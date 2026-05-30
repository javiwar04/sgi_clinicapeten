"use client"

import { cn } from "@/lib/utils"

type StatusType =
  | "programada"
  | "en_espera"
  | "en_consulta"
  | "finalizada"
  | "cancelada"
  | "pendiente"
  | "en_proceso"
  | "completada"
  | "pagado"
  | "anulado"
  | "activo"
  | "inactivo"
  | "disponible"
  | "bajo_stock"
  | "agotado"
  | "normal"
  | "urgente"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  programada: {
    label: "Programada",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  en_espera: {
    label: "En espera",
    className: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  en_consulta: {
    label: "En consulta",
    className: "bg-info/10 text-info border-info/20",
  },
  finalizada: {
    label: "Finalizada",
    className: "bg-success/10 text-success border-success/20",
  },
  cancelada: {
    label: "Cancelada",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  en_proceso: {
    label: "En proceso",
    className: "bg-info/10 text-info border-info/20",
  },
  completada: {
    label: "Completada",
    className: "bg-success/10 text-success border-success/20",
  },
  pagado: {
    label: "Pagado",
    className: "bg-success/10 text-success border-success/20",
  },
  anulado: {
    label: "Anulado",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  activo: {
    label: "Activo",
    className: "bg-success/10 text-success border-success/20",
  },
  inactivo: {
    label: "Inactivo",
    className: "bg-muted text-muted-foreground border-muted-foreground/20",
  },
  disponible: {
    label: "Disponible",
    className: "bg-success/10 text-success border-success/20",
  },
  bajo_stock: {
    label: "Bajo stock",
    className: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  agotado: {
    label: "Agotado",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  normal: {
    label: "Normal",
    className: "bg-muted text-muted-foreground border-muted-foreground/20",
  },
  urgente: {
    label: "Urgente",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
