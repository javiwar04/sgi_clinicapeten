"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Calendar,
  Download,
  Eye,
  FileText,
  Search,
  User,
  Users,
} from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: string
  module: string
  description: string
  details: string
  ipAddress: string
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2026-05-28 14:35:22",
    userId: "1",
    userName: "Admin Sistema",
    userRole: "Administrador",
    action: "CREATE",
    module: "Pacientes",
    description: "Registro de nuevo paciente",
    details: "Paciente: Maria Elena Garcia Lopez (PAC-008)",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: "2026-05-28 14:20:15",
    userId: "3",
    userName: "Dr. Juan Perez",
    userRole: "Medico",
    action: "UPDATE",
    module: "Consultas",
    description: "Finalizacion de consulta medica",
    details: "Consulta #245 - Paciente: Juan Carlos Mendez",
    ipAddress: "192.168.1.105",
  },
  {
    id: "3",
    timestamp: "2026-05-28 13:45:30",
    userId: "4",
    userName: "Lab Tecnicos",
    userRole: "Laboratorio",
    action: "UPDATE",
    module: "Laboratorio",
    description: "Carga de resultados de laboratorio",
    details: "Orden LAB-012 - Hemograma completo",
    ipAddress: "192.168.1.110",
  },
  {
    id: "4",
    timestamp: "2026-05-28 12:30:00",
    userId: "5",
    userName: "Farm. Martinez",
    userRole: "Farmacia",
    action: "UPDATE",
    module: "Farmacia",
    description: "Entrega de medicamentos",
    details: "Receta #089 - 3 medicamentos entregados",
    ipAddress: "192.168.1.115",
  },
  {
    id: "5",
    timestamp: "2026-05-28 11:15:45",
    userId: "6",
    userName: "Caja Principal",
    userRole: "Caja",
    action: "CREATE",
    module: "Facturacion",
    description: "Emision de factura",
    details: "Factura FAC-002 - Q375.00",
    ipAddress: "192.168.1.120",
  },
  {
    id: "6",
    timestamp: "2026-05-28 10:00:00",
    userId: "2",
    userName: "Recepcion",
    userRole: "Admision",
    action: "CREATE",
    module: "Citas",
    description: "Programacion de nueva cita",
    details: "Cita para Ana Rodriguez - 29/05/2026 09:00",
    ipAddress: "192.168.1.102",
  },
  {
    id: "7",
    timestamp: "2026-05-28 09:30:00",
    userId: "1",
    userName: "Admin Sistema",
    userRole: "Administrador",
    action: "LOGIN",
    module: "Sistema",
    description: "Inicio de sesion",
    details: "Sesion iniciada correctamente",
    ipAddress: "192.168.1.100",
  },
  {
    id: "8",
    timestamp: "2026-05-27 17:45:00",
    userId: "1",
    userName: "Admin Sistema",
    userRole: "Administrador",
    action: "UPDATE",
    module: "Configuracion",
    description: "Actualizacion de precios",
    details: "Precio consulta Cardiologia: Q200.00",
    ipAddress: "192.168.1.100",
  },
  {
    id: "9",
    timestamp: "2026-05-27 16:20:00",
    userId: "3",
    userName: "Dr. Juan Perez",
    userRole: "Medico",
    action: "CREATE",
    module: "Ordenes",
    description: "Generacion de orden de laboratorio",
    details: "Orden LAB-013 para Maria Garcia",
    ipAddress: "192.168.1.105",
  },
  {
    id: "10",
    timestamp: "2026-05-27 15:00:00",
    userId: "6",
    userName: "Caja Principal",
    userRole: "Caja",
    action: "DELETE",
    module: "Facturacion",
    description: "Anulacion de factura",
    details: "Factura FAC-001 anulada - Error en datos",
    ipAddress: "192.168.1.120",
  },
]

const actionColors: Record<string, string> = {
  CREATE: "bg-success/10 text-success",
  UPDATE: "bg-info/10 text-info",
  DELETE: "bg-destructive/10 text-destructive",
  LOGIN: "bg-primary/10 text-primary",
  LOGOUT: "bg-muted text-muted-foreground",
}

export function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter)
    return matchesSearch && matchesModule && matchesAction && matchesDate
  })

  const modules = [...new Set(logs.map((l) => l.module))]
  const actions = [...new Set(logs.map((l) => l.action))]

  const todayLogs = logs.filter((l) => l.timestamp.startsWith("2026-05-28"))
  const createActions = logs.filter((l) => l.action === "CREATE").length
  const updateActions = logs.filter((l) => l.action === "UPDATE").length
  const uniqueUsers = [...new Set(logs.map((l) => l.userId))].length

  return (
    <MainLayout title="Auditoria del Sistema">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayLogs.length}</p>
                  <p className="text-xs text-muted-foreground">Acciones hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{createActions}</p>
                  <p className="text-xs text-muted-foreground">Creaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <FileText className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{updateActions}</p>
                  <p className="text-xs text-muted-foreground">Actualizaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Users className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{uniqueUsers}</p>
                  <p className="text-xs text-muted-foreground">Usuarios activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg">Registro de Auditoria</CardTitle>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por usuario, accion o detalle..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full md:w-40"
              />
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Modulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module} value={module}>
                      {module}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Accion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {actions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Accion</TableHead>
                    <TableHead>Modulo</TableHead>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs whitespace-nowrap">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{log.userName}</p>
                          <p className="text-xs text-muted-foreground">{log.userRole}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            actionColors[log.action] || "bg-muted"
                          }`}
                        >
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{log.module}</TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {log.description}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {log.details}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.ipAddress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination info */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredLogs.length} de {logs.length} registros
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
