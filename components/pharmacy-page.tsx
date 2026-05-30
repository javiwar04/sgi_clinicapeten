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
import { medications, patients, type Medication } from "@/lib/mock-data"
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Pill,
  Plus,
  Search,
} from "lucide-react"

interface Prescription {
  id: string
  patientId: string
  patientName: string
  doctorName: string
  date: string
  medications: {
    name: string
    quantity: number
    instructions: string
  }[]
  status: "pendiente" | "entregada" | "cancelada"
  total: number
}

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "María Elena García López",
    doctorName: "Dr. Juan Pérez",
    date: "2026-05-08",
    medications: [
      { name: "Metformina 850mg", quantity: 30, instructions: "Cada 12 horas" },
    ],
    status: "pendiente",
    total: 135.0,
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Juan Carlos Méndez Ruiz",
    doctorName: "Dr. Juan Pérez",
    date: "2026-05-08",
    medications: [
      { name: "Losartán 50mg", quantity: 30, instructions: "Cada 24 horas" },
      { name: "Omeprazol 20mg", quantity: 14, instructions: "En ayunas" },
    ],
    status: "pendiente",
    total: 142.0,
  },
  {
    id: "3",
    patientId: "5",
    patientName: "Carmen Elena Juárez Vásquez",
    doctorName: "Dr. Juan Pérez",
    date: "2026-05-07",
    medications: [
      { name: "Salbutamol 100mcg", quantity: 1, instructions: "PRN" },
    ],
    status: "entregada",
    total: 85.0,
  },
]

export function PharmacyPage() {
  const [medicationsList, setMedicationsList] = useState<Medication[]>(medications)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)
  const [isViewMedicationOpen, setIsViewMedicationOpen] = useState(false)
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)

  const [medicationForm, setMedicationForm] = useState({
    name: "",
    presentation: "",
    category: "",
    supplier: "",
    stock: "",
    minStock: "",
    price: "",
    expirationDate: "",
  })

  const filteredMedications = medicationsList.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || med.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingPrescriptions = prescriptions.filter((p) => p.status === "pendiente")
  const lowStockMeds = medicationsList.filter((m) => m.status === "bajo_stock")
  const outOfStockMeds = medicationsList.filter((m) => m.status === "agotado")

  const handleAddMedication = () => {
    const newMedication: Medication = {
      id: String(medicationsList.length + 1),
      code: `MED-${String(medicationsList.length + 1).padStart(3, "0")}`,
      name: medicationForm.name,
      presentation: medicationForm.presentation,
      category: medicationForm.category,
      currentStock: parseInt(medicationForm.stock),
      minStock: parseInt(medicationForm.minStock),
      price: parseFloat(medicationForm.price),
      status: "disponible",
      expirationDate: medicationForm.expirationDate,
      supplier: medicationForm.supplier,
    }
    setMedicationsList([...medicationsList, newMedication])
    setIsAddMedicationOpen(false)
    setMedicationForm({
      name: "",
      presentation: "",
      category: "",
      supplier: "",
      stock: "",
      minStock: "",
      price: "",
      expirationDate: "",
    })
  }

  const deliverPrescription = () => {
    if (!selectedPrescription) return
    
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === selectedPrescription.id ? { ...p, status: "entregada" as const } : p
      )
    )
    setIsDeliveryDialogOpen(false)
    setSelectedPrescription(null)
  }

  return (
    <MainLayout title="Farmacia">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{medicationsList.length}</p>
                  <p className="text-xs text-muted-foreground">Total medicamentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Package className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingPrescriptions.length}</p>
                  <p className="text-xs text-muted-foreground">Recetas pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lowStockMeds.length}</p>
                  <p className="text-xs text-muted-foreground">Bajo stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{outOfStockMeds.length}</p>
                  <p className="text-xs text-muted-foreground">Agotados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="prescriptions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prescriptions">
              Recetas Pendientes ({pendingPrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
          </TabsList>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recetas por Entregar</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingPrescriptions.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No hay recetas pendientes
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingPrescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{prescription.patientName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {prescription.doctorName} - {prescription.date}
                            </p>
                          </div>
                          <StatusBadge status={prescription.status} />
                        </div>
                        <div className="space-y-2 mb-4">
                          {prescription.medications.map((med, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm p-2 bg-muted/50 rounded"
                            >
                              <span>
                                {med.name} x{med.quantity}
                              </span>
                              <span className="text-muted-foreground">
                                {med.instructions}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <p className="font-medium">
                            Total: Q{prescription.total.toFixed(2)}
                          </p>
                          <Button
                            onClick={() => {
                              setSelectedPrescription(prescription)
                              setIsDeliveryDialogOpen(true)
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Entregar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-lg">Inventario de Medicamentos</CardTitle>
                  <Dialog open={isAddMedicationOpen} onOpenChange={setIsAddMedicationOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Medicamento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Agregar Medicamento</DialogTitle>
                        <DialogDescription>
                          Complete los datos del nuevo medicamento
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Nombre *</Label>
                          <Input
                            value={medicationForm.name}
                            onChange={(e) =>
                              setMedicationForm({ ...medicationForm, name: e.target.value })
                            }
                            placeholder="Ej: Paracetamol"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Presentación</Label>
                            <Input
                              value={medicationForm.presentation}
                              onChange={(e) =>
                                setMedicationForm({
                                  ...medicationForm,
                                  presentation: e.target.value,
                                })
                              }
                              placeholder="Ej: Tabletas 500mg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Categoría</Label>
                            <Select
                              value={medicationForm.category}
                              onValueChange={(value) =>
                                setMedicationForm({ ...medicationForm, category: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Analgésicos">Analgésicos</SelectItem>
                                <SelectItem value="Antibióticos">Antibióticos</SelectItem>
                                <SelectItem value="Antiácidos">Antiácidos</SelectItem>
                                <SelectItem value="Antihipertensivos">Antihipertensivos</SelectItem>
                                <SelectItem value="Antidiabéticos">Antidiabéticos</SelectItem>
                                <SelectItem value="Broncodilatadores">Broncodilatadores</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Proveedor</Label>
                          <Input
                            value={medicationForm.supplier}
                            onChange={(e) =>
                              setMedicationForm({ ...medicationForm, supplier: e.target.value })
                            }
                            placeholder="Ej: Farmacéutica Nacional"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Stock inicial</Label>
                            <Input
                              type="number"
                              value={medicationForm.stock}
                              onChange={(e) =>
                                setMedicationForm({ ...medicationForm, stock: e.target.value })
                              }
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Stock mínimo</Label>
                            <Input
                              type="number"
                              value={medicationForm.minStock}
                              onChange={(e) =>
                                setMedicationForm({ ...medicationForm, minStock: e.target.value })
                              }
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Precio (Q)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={medicationForm.price}
                              onChange={(e) =>
                                setMedicationForm({ ...medicationForm, price: e.target.value })
                              }
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha de vencimiento</Label>
                          <Input
                            type="date"
                            value={medicationForm.expirationDate}
                            onChange={(e) =>
                              setMedicationForm({
                                ...medicationForm,
                                expirationDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMedicationOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddMedication}>Agregar</Button>
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
                      placeholder="Buscar por nombre, código o categoría..."
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
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="bajo_stock">Bajo stock</SelectItem>
                      <SelectItem value="agotado">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Presentación</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMedications.map((med) => (
                        <TableRow key={med.id}>
                          <TableCell className="font-mono text-sm">
                            {med.code}
                          </TableCell>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.presentation}</TableCell>
                          <TableCell>{med.category}</TableCell>
                          <TableCell>
                            <span
                              className={
                                med.currentStock <= med.minStock
                                  ? "text-destructive font-medium"
                                  : ""
                              }
                            >
                              {med.currentStock}
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              / {med.minStock}
                            </span>
                          </TableCell>
                          <TableCell>Q{med.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <StatusBadge status={med.status} />
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
                                    setSelectedMedication(med)
                                    setIsViewMedicationOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalle
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                                  Entrada de stock
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ArrowUpFromLine className="h-4 w-4 mr-2" />
                                  Salida de stock
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

        {/* View Medication Dialog */}
        <Dialog open={isViewMedicationOpen} onOpenChange={setIsViewMedicationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle del Medicamento</DialogTitle>
            </DialogHeader>
            {selectedMedication && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Código</p>
                    <p className="font-mono font-medium">{selectedMedication.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <StatusBadge status={selectedMedication.status} />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">{selectedMedication.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Presentación</p>
                    <p className="font-medium">{selectedMedication.presentation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Categoría</p>
                    <p className="font-medium">{selectedMedication.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock actual</p>
                    <p className="font-medium">{selectedMedication.currentStock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock mínimo</p>
                    <p className="font-medium">{selectedMedication.minStock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="font-medium">Q{selectedMedication.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vencimiento</p>
                    <p className="font-medium">{selectedMedication.expirationDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Proveedor</p>
                    <p className="font-medium">{selectedMedication.supplier}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delivery Confirmation Dialog */}
        <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Entrega</DialogTitle>
              <DialogDescription>
                Confirme la entrega de medicamentos al paciente
              </DialogDescription>
            </DialogHeader>
            {selectedPrescription && (
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Paciente</p>
                  <p className="font-medium">{selectedPrescription.patientName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Medicamentos</p>
                  {selectedPrescription.medications.map((med, idx) => (
                    <div key={idx} className="p-2 bg-muted/50 rounded text-sm">
                      {med.name} x{med.quantity} - {med.instructions}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total a cobrar</p>
                  <p className="text-xl font-bold">Q{selectedPrescription.total.toFixed(2)}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeliveryDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={deliverPrescription}>
                <Check className="h-4 w-4 mr-2" />
                Confirmar Entrega
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
