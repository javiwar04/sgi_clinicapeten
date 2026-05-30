"use client"

import { useAuth, roleLabels, type UserRole } from "@/lib/auth-context"
import { useNavigation, type PageType } from "@/app/page"
import { cn } from "@/lib/utils"
import {
  Activity,
  Calendar,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  FlaskConical,
  Home,
  LogOut,
  Pill,
  Settings,
  Shield,
  Stethoscope,
  Users,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  BarChart3,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  page: PageType
  icon: React.ComponentType<{ className?: string }>
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    page: "dashboard",
    icon: Home,
    roles: ["admin", "admision", "medico", "laboratorio", "farmacia", "caja", "gerencia"],
  },
  {
    title: "Usuarios",
    page: "usuarios",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Roles y Permisos",
    page: "roles",
    icon: Shield,
    roles: ["admin"],
  },
  {
    title: "Admision",
    page: "admision",
    icon: ClipboardList,
    roles: ["admin", "admision"],
  },
  {
    title: "Citas Medicas",
    page: "citas",
    icon: Calendar,
    roles: ["admin", "admision", "medico"],
  },
  {
    title: "Expedientes",
    page: "expedientes",
    icon: FileText,
    roles: ["admin", "admision", "medico"],
  },
  {
    title: "Consulta Medica",
    page: "consulta",
    icon: Stethoscope,
    roles: ["admin", "medico"],
  },
  {
    title: "Ordenes Medicas",
    page: "ordenes",
    icon: FileSearch,
    roles: ["admin", "medico", "laboratorio"],
  },
  {
    title: "Laboratorio",
    page: "laboratorio",
    icon: FlaskConical,
    roles: ["admin", "laboratorio", "medico"],
  },
  {
    title: "Farmacia",
    page: "farmacia",
    icon: Pill,
    roles: ["admin", "farmacia", "medico"],
  },
  {
    title: "Caja",
    page: "caja",
    icon: CreditCard,
    roles: ["admin", "caja"],
  },
  {
    title: "Reportes",
    page: "reportes",
    icon: BarChart3,
    roles: ["admin", "gerencia", "caja"],
  },
  {
    title: "Auditoria",
    page: "auditoria",
    icon: Activity,
    roles: ["admin", "gerencia"],
  },
  {
    title: "Configuracion",
    page: "configuracion",
    icon: Settings,
    roles: ["admin"],
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const { currentPage, setCurrentPage } = useNavigation()
  const [collapsed, setCollapsed] = useState(false)

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  )

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-bold text-sm truncate">SGI Clinica</h1>
              <p className="text-xs text-sidebar-foreground/60 truncate">Peten</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.page
            return (
              <li key={item.page}>
                <button
                  onClick={() => setCurrentPage(item.page)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse button */}
      <div className="px-2 py-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Colapsar</span>
            </>
          )}
        </Button>
      </div>

      {/* User menu */}
      <div className="border-t border-sidebar-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors",
                collapsed ? "justify-center" : ""
              )}
            >
              <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
                <UserCircle className="w-5 h-5 text-sidebar-primary" />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {user?.role && roleLabels[user.role]}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-sidebar-foreground/60 flex-shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
