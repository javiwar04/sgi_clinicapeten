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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patients, type Patient } from "@/lib/mock-data"
import {
  Calendar,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  UserPlus,
  Users,
} from "lucide-react"

export function AdmissionPage() {
  const [patientsList, setPatientsList] = useState<Patient[]>(patients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    dpi: "",
    birthDate: "",
    gender: "",
    phone: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    antecedents: "",
    observations: "",
  })

  const filteredPatients = patientsList.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.dpi.includes(searchTerm) ||
      patient.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const calculateAge = (birthDate: string): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleCreatePatient = () => {
    const newPatient: Patient = {
      id: String(patientsList.length + 1),
      code: `PAC-${String(patientsList.length + 1).padStart(3, "0")}`,
      name: formData.name,
      dpi: formData.dpi,
      birthDate: formData.birthDate,
      age: calculateAge(formData.birthDate),
      gender: formData.gender as "M" | "F" | "NM",
      phone: formData.phone,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      allergies: formData.allergies ? formData.allergies.split(",").map((a) => a.trim()) : [],
      antecedents: formData.antecedents,
      observations: formData.observations,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "activo",
    }
    setPatientsList([...patientsList, newPatient])
    setIsCreateDialogOpen(false)
    setFormData({
      name: "",
      dpi: "",
      birthDate: "",
      gender: "",
      phone: "",
      address: "",
      emergencyContact: "",
      allergies: "",
      antecedents: "",
      observations: "",
    })
  }

  return (
    <MainLayout title="Módulo de Admisión">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{patientsList.length}</p>
                  <p className="text-xs text-muted-foreground">Total pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {patientsList.filter((p) => p.status === "activo").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pacientes activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <UserPlus className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Nuevos hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Citas de hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="today">Llegadas de Hoy</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-lg">Registro de Pacientes</CardTitle>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Paciente
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
                        <DialogDescription>
                          Complete los datos del paciente para crear su expediente
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder="Ej: María Elena García López"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dpi">DPI *</Label>
                            <Input
                              id="dpi"
                              value={formData.dpi}
                              onChange={(e) =>
                                setFormData({ ...formData, dpi: e.target.value })
                              }
                              placeholder="Ej: 1234567890101"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birthDate">Fecha de nacimiento *</Label>
                            <Input
                              id="birthDate"
                              type="date"
                              value={formData.birthDate}
                              onChange={(e) =>
                                setFormData({ ...formData, birthDate: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Sexo *</Label>
                            <Select
                              value={formData.gender}
                              onValueChange={(value) =>
                                setFormData({ ...formData, gender: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="M">Masculino</SelectItem>
                                <SelectItem value="F">Femenino</SelectItem>
                                <SelectItem value="NM">No mucho</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono *</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              placeholder="Ej: 5012-3456"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                              placeholder="Ej: Flores, Petén"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                            <Input
                              id="emergencyContact"
                              value={formData.emergencyContact}
                              onChange={(e) =>
                                setFormData({ ...formData, emergencyContact: e.target.value })
                              }
                              placeholder="Ej: Carlos García - 5098-7654"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="allergies">Alergias (separar con comas)</Label>
                            <Input
                              id="allergies"
                              value={formData.allergies}
                              onChange={(e) =>
                                setFormData({ ...formData, allergies: e.target.value })
                              }
                              placeholder="Ej: Penicilina, Sulfa"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="antecedents">Antecedentes generales</Label>
                            <Textarea
                              id="antecedents"
                              value={formData.antecedents}
                              onChange={(e) =>
                                setFormData({ ...formData, antecedents: e.target.value })
                              }
                              placeholder="Historial médico relevante..."
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="observations">Observaciones</Label>
                            <Textarea
                              id="observations"
                              value={formData.observations}
                              onChange={(e) =>
                                setFormData({ ...formData, observations: e.target.value })
                              }
                              placeholder="Notas adicionales..."
                              rows={2}
                            />
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
                        <Button onClick={handleCreatePatient}>Registrar Paciente</Button>
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
                      placeholder="Buscar por nombre, DPI o código..."
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
                      <SelectItem value="activo">Activos</SelectItem>
                      <SelectItem value="inactivo">Inactivos</SelectItem>
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
                        <TableHead>DPI</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Última visita</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-mono text-sm">
                            {patient.code}
                          </TableCell>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.dpi}</TableCell>
                          <TableCell>{patient.phone}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {patient.lastVisit}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={patient.status} />
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
                                    setSelectedPatient(patient)
                                    setIsViewDialogOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver expediente
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Crear cita
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-primary">
                                  <Send className="h-4 w-4 mr-2" />
                                  Enviar a consulta
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

          <TabsContent value="today">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pacientes con Cita Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientsList.slice(0, 4).map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.code} - Cita: 09:00 AM
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="en_espera" />
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar a consulta
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Patient Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Expediente del Paciente</DialogTitle>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.code} | {selectedPatient.age} años |{" "}
                      {selectedPatient.gender === "M"
                        ? "Masculino"
                        : selectedPatient.gender === "F"
                          ? "Femenino"
                          : "No mucho"}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={selectedPatient.status} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">DPI</p>
                    <p className="font-medium">{selectedPatient.dpi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de nacimiento</p>
                    <p className="font-medium">{selectedPatient.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Última visita</p>
                    <p className="font-medium">{selectedPatient.lastVisit}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Contacto de emergencia</p>
                    <p className="font-medium">{selectedPatient.emergencyContact}</p>
                  </div>
                </div>

                {selectedPatient.allergies.length > 0 && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm font-medium text-destructive mb-1">Alergias</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPatient.antecedents && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Antecedentes</p>
                    <p className="text-sm p-3 rounded-lg bg-muted/50">
                      {selectedPatient.antecedents}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Cerrar
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Crear Cita
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
