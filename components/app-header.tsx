"use client"

import { useAuth, roleLabels } from "@/lib/auth-context"
import { BrandLogo } from "@/components/brand-logo"
import { Bell, Search, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title }: AppHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4 min-w-0">
        <div className="hidden lg:block">
          <BrandLogo variant="full" className="h-14" />
        </div>
        {title && (
          <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar pacientes, citas..."
            className="w-64 pl-9 h-9 bg-muted/50"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Notificaciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b border-border">
              <h3 className="font-semibold text-sm">Notificaciones</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Laboratorio</Badge>
                  <span className="text-xs text-muted-foreground">Hace 5 min</span>
                </div>
                <p className="text-sm">Nuevos resultados disponibles para María García</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-warning/20 text-warning-foreground">Farmacia</Badge>
                  <span className="text-xs text-muted-foreground">Hace 15 min</span>
                </div>
                <p className="text-sm">Stock bajo de Omeprazol (25 unidades)</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-info/20 text-info-foreground">Citas</Badge>
                  <span className="text-xs text-muted-foreground">Hace 30 min</span>
                </div>
                <p className="text-sm">Nueva cita programada para las 11:00 AM</p>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-primary">
                Ver todas las notificaciones
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User info */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role && roleLabels[user.role]}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
