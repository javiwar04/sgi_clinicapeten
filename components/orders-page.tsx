"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { labOrders, patients, type LabOrder } from "@/lib/mock-data"
import {
  Eye,
  FileSearch,
  FlaskConical,
  Pill,
  Plus,
  Search,
  Stethoscope,
} from "lucide-react"

interface MedicalOrder {
  id: string
  code: string
  patientId: string
  patientName: string
  doctorName: string
  type: "laboratorio" | "farmacia" | "procedimiento" | "referencia"
  service: string
  priority: "normal" | "urgente"
  date: string
  status: "pendiente" | "en_proceso" | "completada" | "cancelada"
  observations?: string
}

const mockOrders: MedicalOrder[] = [
  ...labOrders.map((o) => ({
    ...o,
    type: "laboratorio" as const,
    service: o.examType,
  })),
  {
    id: "o1",
    code: "ORD-001",
    patientId: "1",
    patientName: "María Elena García López",
    doctorName: "Dr. Juan Pérez",
    type: "farmacia",
    service: "Metformina 850mg - 30 tabletas",
    priority: "normal",
    date: "2026-05-08",
    status: "pendiente",
    observations: "Control de diabetes",
  },
  {
    id: "o2",
    code: "ORD-002",
    patientId: "4",
    patientName: "Roberto Antonio Sánchez Morales",
    doctorName: "Dr. Juan Pérez",
    type: "procedimiento",
    service: "Electrocardiograma",
    priority: "urgente",
    date: "2026-05-08",
    status: "en_proceso",
    observations: "Paciente cardiópata - seguimiento",
  },
  {
    id: "o3",
    code: "ORD-003",
    patientId: "3",
    patientName: "Ana Lucía Hernández Paz",
    doctorName: "Dr. Juan Pérez",
    type: "referencia",
    service: "Referencia a Oftalmología",
    priority: "normal",
    date: "2026-05-07",
    status: "completada",
    observations: "Revisión de vista por dolores de cabeza",
  },
]

const orderTypeConfig = {
  laboratorio: {
    label: "Laboratorio",
    icon: FlaskConical,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  farmacia: {
    label: "Farmacia",
    icon: Pill,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  procedimiento: {
    label: "Procedimiento",
    icon: Stethoscope,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  referencia: {
    label: "Referencia",
    icon: FileSearch,
    color: "text-success",
    bgColor: "bg-success/10",
  },
}

export function OrdersPage() {
  const [orders, setOrders] = useState<MedicalOrder[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<MedicalOrder | null>(null)

  const [formData, setFormData] = useState({
    patientId: "",
    type: "",
    service: "",
    priority: "normal",
    observations: "",
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || order.type === typeFilter
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleCreateOrder = () => {
    const patient = patients.find((p) => p.id === formData.patientId)
    if (!patient) return

    const newOrder: MedicalOrder = {
      id: String(orders.length + 1),
      code: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      patientId: formData.patientId,
      patientName: patient.name,
      doctorName: "Dr. Juan Pérez",
      type: formData.type as MedicalOrder["type"],
      service: formData.service,
      priority: formData.priority as "normal" | "urgente",
      date: new Date().toISOString().split("T")[0],
      status: "pendiente",
      observations: formData.observations,
    }
    setOrders([newOrder, ...orders])
    setIsCreateDialogOpen(false)
    setFormData({
      patientId: "",
      type: "",
      service: "",
      priority: "normal",
      observations: "",
    })
  }

  const countByType = (type: string) =>
    orders.filter((o) => o.type === type && o.status !== "completada" && o.status !== "cancelada").length

  return (
    <MainLayout title="Órdenes Médicas">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {(Object.keys(orderTypeConfig) as Array<keyof typeof orderTypeConfig>).map((type) => {
            const config = orderTypeConfig[type]
            const Icon = config.icon
            return (
              <Card key={type}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{countByType(type)}</p>
                      <p className="text-xs text-muted-foreground">{config.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg">Gestión de Órdenes</CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Orden
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Crear Orden Médica</DialogTitle>
                    <DialogDescription>
                      Complete los datos de la orden
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Paciente *</Label>
                      <Select
                        value={formData.patientId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, patientId: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.code} - {patient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo de orden *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laboratorio">Laboratorio</SelectItem>
                          <SelectItem value="farmacia">Farmacia</SelectItem>
                          <SelectItem value="procedimiento">Procedimiento</SelectItem>
                          <SelectItem value="referencia">Referencia Médica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Servicio solicitado *</Label>
                      <Input
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        placeholder="Ej: Hemograma completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Prioridad</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Observaciones</Label>
                      <Textarea
                        value={formData.observations}
                        onChange={(e) =>
                          setFormData({ ...formData, observations: e.target.value })
                        }
                        placeholder="Notas adicionales..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateOrder}>Crear Orden</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por paciente, código o servicio..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tipo de orden" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="laboratorio">Laboratorio</SelectItem>
                  <SelectItem value="farmacia">Farmacia</SelectItem>
                  <SelectItem value="procedimiento">Procedimiento</SelectItem>
                  <SelectItem value="referencia">Referencia</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_proceso">En proceso</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const config = orderTypeConfig[order.type]
                    const Icon = config.icon
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.code}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${config.bgColor}`}>
                              <Icon className={`h-3 w-3 ${config.color}`} />
                            </div>
                            <span className="text-sm">{config.label}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.patientName}
                        </TableCell>
                        <TableCell className="max-w-40 truncate">
                          {order.service}
                        </TableCell>
                        <TableCell>{order.doctorName}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.priority} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {order.date}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* View Order Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle de Orden</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Código</p>
                    <p className="font-mono font-medium">{selectedOrder.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium capitalize">{selectedOrder.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Paciente</p>
                    <p className="font-medium">{selectedOrder.patientName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Servicio</p>
                    <p className="font-medium">{selectedOrder.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Médico</p>
                    <p className="font-medium">{selectedOrder.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prioridad</p>
                    <StatusBadge status={selectedOrder.priority} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
                {selectedOrder.observations && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Observaciones</p>
                    <p className="text-sm p-3 rounded bg-muted/50">
                      {selectedOrder.observations}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
