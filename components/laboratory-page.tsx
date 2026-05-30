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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { labOrders, patients, type LabOrder } from "@/lib/mock-data"
import {
  Check,
  Clock,
  Eye,
  FlaskConical,
  Loader2,
  MoreHorizontal,
  Play,
  Search,
  Upload,
} from "lucide-react"

const examTypes = [
  "Hemograma completo",
  "Glucosa en ayunas",
  "Perfil lipídico",
  "Creatinina",
  "Examen general de orina",
]

export function LaboratoryPage() {
  const [orders, setOrders] = useState<LabOrder[]>(labOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<LabOrder | null>(null)

  const [createForm, setCreateForm] = useState({
    patientId: "",
    examType: "",
    priority: "normal" as "normal" | "urgente",
    observations: "",
  })

  const [resultForm, setResultForm] = useState({
    result: "",
    referenceValues: "",
    observations: "",
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.examType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingOrders = orders.filter((o) => o.status === "pendiente")
  const inProgressOrders = orders.filter((o) => o.status === "en_proceso")
  const completedOrders = orders.filter((o) => o.status === "completada")

  const createLabOrder = () => {
    const patient = patients.find((p) => p.id === createForm.patientId)
    if (!patient || !createForm.examType) return

    const newOrder: LabOrder = {
      id: String(orders.length + 1),
      code: `LAB-${String(orders.length + 1).padStart(3, "0")}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: "3",
      doctorName: "Dr. Juan Pérez",
      examType: createForm.examType,
      priority: createForm.priority,
      date: new Date().toISOString().split("T")[0],
      status: "pendiente",
      observations: createForm.observations,
    }

    setOrders((prev) => [newOrder, ...prev])
    setCreateForm({
      patientId: "",
      examType: "",
      priority: "normal",
      observations: "",
    })
    setIsCreateDialogOpen(false)
  }

  const startProcessing = (order: LabOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "en_proceso" as const } : o))
    )
  }

  const openResultDialog = (order: LabOrder) => {
    setSelectedOrder(order)
    setResultForm({
      result: "",
      referenceValues: "",
      observations: "",
    })
    setIsResultDialogOpen(true)
  }

  const saveResult = () => {
    if (!selectedOrder) return

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: "completada" as const,
              results: resultForm.result,
              observations: resultForm.observations,
            }
          : o
      )
    )
    setIsResultDialogOpen(false)
    setSelectedOrder(null)
  }

  return (
    <MainLayout title="Laboratorio">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingOrders.length}</p>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Loader2 className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressOrders.length}</p>
                  <p className="text-xs text-muted-foreground">En proceso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Check className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedOrders.length}</p>
                  <p className="text-xs text-muted-foreground">Completadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <FlaskConical className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {orders.filter((o) => o.priority === "urgente" && o.status === "pendiente").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Urgentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas las órdenes</TabsTrigger>
            <TabsTrigger value="pending">
              Pendientes ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="inprogress">
              En proceso ({inProgressOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completadas ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          {["all", "pending", "inprogress", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-lg">Órdenes de Laboratorio</CardTitle>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Nueva Orden
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Nueva Orden de Laboratorio</DialogTitle>
                          <DialogDescription>
                            Esta orden se guarda solo en memoria y no persiste al recargar.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Paciente *</Label>
                            <Select
                              value={createForm.patientId}
                              onValueChange={(value) =>
                                setCreateForm({ ...createForm, patientId: value })
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
                            <Label>Examen *</Label>
                            <Select
                              value={createForm.examType}
                              onValueChange={(value) =>
                                setCreateForm({ ...createForm, examType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione examen" />
                              </SelectTrigger>
                              <SelectContent>
                                {examTypes.map((exam) => (
                                  <SelectItem key={exam} value={exam}>
                                    {exam}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Prioridad *</Label>
                            <Select
                              value={createForm.priority}
                              onValueChange={(value) =>
                                setCreateForm({
                                  ...createForm,
                                  priority: value as "normal" | "urgente",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione prioridad" />
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
                              value={createForm.observations}
                              onChange={(e) =>
                                setCreateForm({ ...createForm, observations: e.target.value })
                              }
                              placeholder="Notas adicionales"
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={createLabOrder}>Crear orden</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por paciente, código o examen..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {tab === "all" && (
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="pendiente">Pendiente</SelectItem>
                          <SelectItem value="en_proceso">En proceso</SelectItem>
                          <SelectItem value="completada">Completada</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Table */}
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Examen</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Prioridad</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders
                          .filter((order) => {
                            if (tab === "pending") return order.status === "pendiente"
                            if (tab === "inprogress") return order.status === "en_proceso"
                            if (tab === "completed") return order.status === "completada"
                            return true
                          })
                          .map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-mono text-sm">
                                {order.code}
                              </TableCell>
                              <TableCell className="font-medium">
                                {order.patientName}
                              </TableCell>
                              <TableCell>{order.examType}</TableCell>
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
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedOrder(order)
                                        setIsViewDialogOpen(true)
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      Ver detalle
                                    </DropdownMenuItem>
                                    {order.status === "pendiente" && (
                                      <DropdownMenuItem
                                        onClick={() => startProcessing(order)}
                                      >
                                        <Play className="h-4 w-4 mr-2" />
                                        Iniciar proceso
                                      </DropdownMenuItem>
                                    )}
                                    {order.status === "en_proceso" && (
                                      <DropdownMenuItem
                                        onClick={() => openResultDialog(order)}
                                        className="text-success"
                                      >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Cargar resultado
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* View Order Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle de Orden de Laboratorio</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Código</p>
                    <p className="font-mono font-medium">{selectedOrder.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Paciente</p>
                    <p className="font-medium">{selectedOrder.patientName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Examen</p>
                    <p className="font-medium">{selectedOrder.examType}</p>
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
                </div>
                {selectedOrder.results && (
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm font-medium text-success mb-2">Resultado</p>
                    <p className="text-sm">{selectedOrder.results}</p>
                  </div>
                )}
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

        {/* Upload Result Dialog */}
        <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cargar Resultado de Laboratorio</DialogTitle>
              <DialogDescription>
                {selectedOrder && `${selectedOrder.examType} - ${selectedOrder.patientName}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Resultado *</Label>
                <Textarea
                  value={resultForm.result}
                  onChange={(e) =>
                    setResultForm({ ...resultForm, result: e.target.value })
                  }
                  placeholder="Ingrese los resultados del examen..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Valores de referencia</Label>
                <Input
                  value={resultForm.referenceValues}
                  onChange={(e) =>
                    setResultForm({ ...resultForm, referenceValues: e.target.value })
                  }
                  placeholder="Ej: 70-110 mg/dL"
                />
              </div>
              <div className="space-y-2">
                <Label>Observaciones</Label>
                <Textarea
                  value={resultForm.observations}
                  onChange={(e) =>
                    setResultForm({ ...resultForm, observations: e.target.value })
                  }
                  placeholder="Observaciones adicionales..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Archivo adjunto (opcional)</Label>
                <Input type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResultDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveResult}>
                <Check className="h-4 w-4 mr-2" />
                Guardar Resultado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
