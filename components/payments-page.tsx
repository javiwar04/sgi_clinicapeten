"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { patients } from "@/lib/mock-data"
import {
  Banknote,
  Check,
  CreditCard,
  DollarSign,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  Printer,
  Receipt,
  Search,
  Wallet,
  X,
} from "lucide-react"

interface Invoice {
  id: string
  code: string
  patientId: string
  patientName: string
  date: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  discount: number
  total: number
  status: "pendiente" | "pagada" | "anulada"
  paymentMethod?: "efectivo" | "tarjeta" | "transferencia"
  paymentDate?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    code: "FAC-001",
    patientId: "1",
    patientName: "Maria Elena Garcia Lopez",
    date: "2026-05-28",
    items: [
      { description: "Consulta Medicina General", quantity: 1, unitPrice: 150, total: 150 },
      { description: "Hemograma completo", quantity: 1, unitPrice: 85, total: 85 },
    ],
    subtotal: 235,
    discount: 0,
    total: 235,
    status: "pendiente",
  },
  {
    id: "2",
    code: "FAC-002",
    patientId: "2",
    patientName: "Juan Carlos Mendez Ruiz",
    date: "2026-05-28",
    items: [
      { description: "Consulta Cardiologia", quantity: 1, unitPrice: 200, total: 200 },
      { description: "Electrocardiograma", quantity: 1, unitPrice: 120, total: 120 },
      { description: "Losartan 50mg x30", quantity: 1, unitPrice: 75, total: 75 },
    ],
    subtotal: 395,
    discount: 20,
    total: 375,
    status: "pagada",
    paymentMethod: "tarjeta",
    paymentDate: "2026-05-28",
  },
  {
    id: "3",
    code: "FAC-003",
    patientId: "3",
    patientName: "Ana Lucia Rodriguez Perez",
    date: "2026-05-27",
    items: [
      { description: "Consulta Pediatria", quantity: 1, unitPrice: 175, total: 175 },
    ],
    subtotal: 175,
    discount: 0,
    total: 175,
    status: "pagada",
    paymentMethod: "efectivo",
    paymentDate: "2026-05-27",
  },
]

const services = [
  { id: "1", name: "Consulta Medicina General", price: 150 },
  { id: "2", name: "Consulta Cardiologia", price: 200 },
  { id: "3", name: "Consulta Pediatria", price: 175 },
  { id: "4", name: "Consulta Ginecologia", price: 200 },
  { id: "5", name: "Hemograma completo", price: 85 },
  { id: "6", name: "Glucosa en ayunas", price: 45 },
  { id: "7", name: "Perfil lipidico", price: 120 },
  { id: "8", name: "Electrocardiograma", price: 120 },
  { id: "9", name: "Radiografia de torax", price: 150 },
]

export function PaymentsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const [formData, setFormData] = useState({
    patientId: "",
    items: [{ serviceId: "", quantity: 1 }] as { serviceId: string; quantity: number }[],
    discount: 0,
  })

  const [paymentData, setPaymentData] = useState({
    method: "" as "efectivo" | "tarjeta" | "transferencia" | "",
    amountReceived: "",
  })

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingInvoices = invoices.filter((i) => i.status === "pendiente")
  const todayTotal = invoices
    .filter((i) => i.status === "pagada" && i.paymentDate === "2026-05-28")
    .reduce((sum, i) => sum + i.total, 0)
  const pendingTotal = pendingInvoices.reduce((sum, i) => sum + i.total, 0)

  const calculateInvoiceTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      const service = services.find((s) => s.id === item.serviceId)
      return sum + (service ? service.price * item.quantity : 0)
    }, 0)
    return subtotal - formData.discount
  }

  const handleCreateInvoice = () => {
    const patient = patients.find((p) => p.id === formData.patientId)
    if (!patient) return

    const items = formData.items
      .map((item) => {
        const service = services.find((s) => s.id === item.serviceId)
        if (!service) return null
        return {
          description: service.name,
          quantity: item.quantity,
          unitPrice: service.price,
          total: service.price * item.quantity,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    const subtotal = items.reduce((sum, i) => sum + i.total, 0)

    const newInvoice: Invoice = {
      id: String(invoices.length + 1),
      code: `FAC-${String(invoices.length + 1).padStart(3, "0")}`,
      patientId: formData.patientId,
      patientName: patient.name,
      date: new Date().toISOString().split("T")[0],
      items,
      subtotal,
      discount: formData.discount,
      total: subtotal - formData.discount,
      status: "pendiente",
    }

    setInvoices([...invoices, newInvoice])
    setIsCreateDialogOpen(false)
    setFormData({
      patientId: "",
      items: [{ serviceId: "", quantity: 1 }],
      discount: 0,
    })
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { serviceId: "", quantity: 1 }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    setFormData({
      ...formData,
      items: formData.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    })
  }

  const openPaymentDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaymentData({ method: "", amountReceived: String(invoice.total) })
    setIsPaymentDialogOpen(true)
  }

  const processPayment = () => {
    if (!selectedInvoice || !paymentData.method) return

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              status: "pagada" as const,
              paymentMethod: paymentData.method as "efectivo" | "tarjeta" | "transferencia",
              paymentDate: new Date().toISOString().split("T")[0],
            }
          : inv
      )
    )
    setIsPaymentDialogOpen(false)
    setSelectedInvoice(null)
  }

  const cancelInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "anulada" as const } : inv))
    )
  }

  return (
    <MainLayout title="Caja - Facturacion">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Q{todayTotal.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Cobrado hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Receipt className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingInvoices.length}</p>
                  <p className="text-xs text-muted-foreground">Facturas pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Wallet className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Q{pendingTotal.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Por cobrar</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{invoices.length}</p>
                  <p className="text-xs text-muted-foreground">Total facturas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Por Cobrar ({pendingInvoices.length})
            </TabsTrigger>
            <TabsTrigger value="all">Todas las Facturas</TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-lg">Facturas Pendientes de Pago</CardTitle>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Factura
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Factura</DialogTitle>
                        <DialogDescription>
                          Seleccione el paciente y los servicios a facturar
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
                          <Label>Servicios / Productos</Label>
                          <div className="space-y-2">
                            {formData.items.map((item, index) => (
                              <div key={index} className="flex gap-2 items-end">
                                <div className="flex-1">
                                  <Select
                                    value={item.serviceId}
                                    onValueChange={(value) =>
                                      updateItem(index, "serviceId", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccione servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {services.map((service) => (
                                        <SelectItem key={service.id} value={service.id}>
                                          {service.name} - Q{service.price}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="w-20">
                                  <Input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateItem(index, "quantity", parseInt(e.target.value) || 1)
                                    }
                                  />
                                </div>
                                {formData.items.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={addItem}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Agregar item
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Descuento (Q)</Label>
                            <Input
                              type="number"
                              min={0}
                              value={formData.discount}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  discount: parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Total a pagar</Label>
                            <div className="h-10 flex items-center px-3 border rounded-md bg-muted font-bold">
                              Q{calculateInvoiceTotal().toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateInvoice}>Crear Factura</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {pendingInvoices.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No hay facturas pendientes de pago
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingInvoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-medium">
                                {invoice.code}
                              </span>
                              <StatusBadge status={invoice.status} />
                            </div>
                            <h4 className="font-medium mt-1">{invoice.patientName}</h4>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">Q{invoice.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="space-y-1 mb-4">
                          {invoice.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm p-2 bg-muted/50 rounded"
                            >
                              <span>
                                {item.description} x{item.quantity}
                              </span>
                              <span>Q{item.total.toFixed(2)}</span>
                            </div>
                          ))}
                          {invoice.discount > 0 && (
                            <div className="flex justify-between text-sm p-2 text-success">
                              <span>Descuento</span>
                              <span>-Q{invoice.discount.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 pt-3 border-t">
                          <Button
                            className="flex-1"
                            onClick={() => openPaymentDialog(invoice)}
                          >
                            <Banknote className="h-4 w-4 mr-2" />
                            Cobrar
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => cancelInvoice(invoice.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Invoices Tab */}
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Historial de Facturas</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por paciente o numero de factura..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pendiente">Pendientes</SelectItem>
                      <SelectItem value="pagada">Pagadas</SelectItem>
                      <SelectItem value="anulada">Anuladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Factura</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Metodo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-mono text-sm">
                            {invoice.code}
                          </TableCell>
                          <TableCell className="font-medium">
                            {invoice.patientName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {invoice.date}
                          </TableCell>
                          <TableCell className="font-medium">
                            Q{invoice.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {invoice.paymentMethod === "efectivo" && (
                              <span className="flex items-center gap-1 text-sm">
                                <Banknote className="h-4 w-4" /> Efectivo
                              </span>
                            )}
                            {invoice.paymentMethod === "tarjeta" && (
                              <span className="flex items-center gap-1 text-sm">
                                <CreditCard className="h-4 w-4" /> Tarjeta
                              </span>
                            )}
                            {invoice.paymentMethod === "transferencia" && (
                              <span className="flex items-center gap-1 text-sm">
                                <Wallet className="h-4 w-4" /> Transfer.
                              </span>
                            )}
                            {!invoice.paymentMethod && "-"}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={invoice.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedInvoice(invoice)
                                    setIsViewDialogOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalle
                                </DropdownMenuItem>
                                {invoice.status === "pendiente" && (
                                  <DropdownMenuItem
                                    onClick={() => openPaymentDialog(invoice)}
                                  >
                                    <Banknote className="h-4 w-4 mr-2" />
                                    Cobrar
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Printer className="h-4 w-4 mr-2" />
                                  Imprimir
                                </DropdownMenuItem>
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
        </Tabs>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Procesar Pago</DialogTitle>
              <DialogDescription>
                {selectedInvoice && `Factura ${selectedInvoice.code} - ${selectedInvoice.patientName}`}
              </DialogDescription>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                  <p className="text-sm text-muted-foreground">Total a pagar</p>
                  <p className="text-3xl font-bold text-primary">
                    Q{selectedInvoice.total.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Metodo de pago *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={paymentData.method === "efectivo" ? "default" : "outline"}
                      className="flex flex-col gap-1 h-auto py-3"
                      onClick={() =>
                        setPaymentData({ ...paymentData, method: "efectivo" })
                      }
                    >
                      <Banknote className="h-5 w-5" />
                      <span className="text-xs">Efectivo</span>
                    </Button>
                    <Button
                      variant={paymentData.method === "tarjeta" ? "default" : "outline"}
                      className="flex flex-col gap-1 h-auto py-3"
                      onClick={() =>
                        setPaymentData({ ...paymentData, method: "tarjeta" })
                      }
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">Tarjeta</span>
                    </Button>
                    <Button
                      variant={paymentData.method === "transferencia" ? "default" : "outline"}
                      className="flex flex-col gap-1 h-auto py-3"
                      onClick={() =>
                        setPaymentData({ ...paymentData, method: "transferencia" })
                      }
                    >
                      <Wallet className="h-5 w-5" />
                      <span className="text-xs">Transferencia</span>
                    </Button>
                  </div>
                </div>

                {paymentData.method === "efectivo" && (
                  <div className="space-y-2">
                    <Label>Monto recibido</Label>
                    <Input
                      type="number"
                      value={paymentData.amountReceived}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, amountReceived: e.target.value })
                      }
                    />
                    {parseFloat(paymentData.amountReceived) > selectedInvoice.total && (
                      <p className="text-sm text-success">
                        Cambio: Q
                        {(parseFloat(paymentData.amountReceived) - selectedInvoice.total).toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={processPayment} disabled={!paymentData.method}>
                <Check className="h-4 w-4 mr-2" />
                Confirmar Pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Invoice Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Detalle de Factura</DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-lg font-bold">{selectedInvoice.code}</p>
                    <p className="text-sm text-muted-foreground">{selectedInvoice.date}</p>
                  </div>
                  <StatusBadge status={selectedInvoice.status} />
                </div>

                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <p className="font-medium">{selectedInvoice.patientName}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Detalle</p>
                  {selectedInvoice.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm p-2 bg-muted/50 rounded"
                    >
                      <span>
                        {item.description} x{item.quantity}
                      </span>
                      <span>Q{item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Q{selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Descuento</span>
                      <span>-Q{selectedInvoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>Q{selectedInvoice.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedInvoice.paymentMethod && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-success font-medium">
                      Pagado el {selectedInvoice.paymentDate} -{" "}
                      {selectedInvoice.paymentMethod === "efectivo" && "Efectivo"}
                      {selectedInvoice.paymentMethod === "tarjeta" && "Tarjeta"}
                      {selectedInvoice.paymentMethod === "transferencia" && "Transferencia"}
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
