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
import { appointments, patients, type Appointment } from "@/lib/mock-data"
import {
  Calendar,
  Check,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  X,
  CalendarDays,
  Users,
  Stethoscope,
} from "lucide-react"

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00",
]

const specialties = [
  "Medicina General",
  "Cardiología",
  "Pediatría",
  "Ginecología",
  "Dermatología",
  "Traumatología",
  "Oftalmología",
]

export function AppointmentsPage() {
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(appointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "3",
    specialty: "",
    date: "",
    time: "",
    reason: "",
    observations: "",
  })

  const filteredAppointments = appointmentsList.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesDate = !dateFilter || apt.date === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  const handleCreateAppointment = () => {
    const patient = patients.find((p) => p.id === formData.patientId)
    if (!patient) return

    const newAppointment: Appointment = {
      id: String(appointmentsList.length + 1),
      patientId: formData.patientId,
      patientName: patient.name,
      doctorId: formData.doctorId,
      doctorName: "Dr. Juan Pérez",
      specialty: formData.specialty,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      status: "programada",
      observations: formData.observations,
    }
    setAppointmentsList([...appointmentsList, newAppointment])
    setIsCreateDialogOpen(false)
    setFormData({
      patientId: "",
      doctorId: "3",
      specialty: "",
      date: "",
      time: "",
      reason: "",
      observations: "",
    })
  }

  const updateStatus = (id: string, newStatus: Appointment["status"]) => {
    setAppointmentsList((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    )
  }

  const todayAppointments = appointmentsList.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0]
  )

  return (
    <MainLayout title="Gestión de Citas Médicas">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayAppointments.length}</p>
                  <p className="text-xs text-muted-foreground">Citas hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Clock className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {todayAppointments.filter((a) => a.status === "programada").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Programadas</p>
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
                  <p className="text-2xl font-bold">
                    {todayAppointments.filter((a) => a.status === "en_espera").length}
                  </p>
                  <p className="text-xs text-muted-foreground">En espera</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Stethoscope className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {todayAppointments.filter((a) => a.status === "en_consulta").length}
                  </p>
                  <p className="text-xs text-muted-foreground">En consulta</p>
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
                  <p className="text-2xl font-bold">
                    {todayAppointments.filter((a) => a.status === "finalizada").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Finalizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Citas</TabsTrigger>
            <TabsTrigger value="calendar">Vista Calendario</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-lg">Citas Médicas</CardTitle>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Cita
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Programar Nueva Cita</DialogTitle>
                        <DialogDescription>
                          Complete los datos para agendar una cita médica
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="patient">Paciente *</Label>
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
                          <Label htmlFor="specialty">Especialidad *</Label>
                          <Select
                            value={formData.specialty}
                            onValueChange={(value) =>
                              setFormData({ ...formData, specialty: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione especialidad" />
                            </SelectTrigger>
                            <SelectContent>
                              {specialties.map((specialty) => (
                                <SelectItem key={specialty} value={specialty}>
                                  {specialty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Fecha *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Hora *</Label>
                            <Select
                              value={formData.time}
                              onValueChange={(value) =>
                                setFormData({ ...formData, time: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Motivo de consulta *</Label>
                          <Input
                            id="reason"
                            value={formData.reason}
                            onChange={(e) =>
                              setFormData({ ...formData, reason: e.target.value })
                            }
                            placeholder="Ej: Control de rutina"
                          />
                        </div>
                        <div className="space-y-2">
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
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateAppointment}>Programar Cita</Button>
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
                      placeholder="Buscar paciente o médico..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full md:w-48"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="programada">Programadas</SelectItem>
                      <SelectItem value="en_espera">En espera</SelectItem>
                      <SelectItem value="en_consulta">En consulta</SelectItem>
                      <SelectItem value="finalizada">Finalizadas</SelectItem>
                      <SelectItem value="cancelada">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Médico</TableHead>
                        <TableHead>Especialidad</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell>{apt.date}</TableCell>
                          <TableCell className="font-medium">{apt.time}</TableCell>
                          <TableCell>{apt.patientName}</TableCell>
                          <TableCell>{apt.doctorName}</TableCell>
                          <TableCell>{apt.specialty}</TableCell>
                          <TableCell className="max-w-32 truncate">{apt.reason}</TableCell>
                          <TableCell>
                            <StatusBadge status={apt.status} />
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
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                {apt.status === "programada" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => updateStatus(apt.id, "en_espera")}
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Confirmar llegada
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => updateStatus(apt.id, "cancelada")}
                                      className="text-destructive"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Cancelar
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {apt.status === "en_espera" && (
                                  <DropdownMenuItem
                                    onClick={() => updateStatus(apt.id, "en_consulta")}
                                    className="text-primary"
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Pasar a consulta
                                  </DropdownMenuItem>
                                )}
                                {apt.status === "en_consulta" && (
                                  <DropdownMenuItem
                                    onClick={() => updateStatus(apt.id, "finalizada")}
                                    className="text-success"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Finalizar
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

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendario de Citas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground p-2"
                    >
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = i - 3 // Offset for month start
                    const isToday = dayNum === 8
                    const hasAppointments = [5, 8, 12, 15, 19, 22, 26].includes(dayNum)
                    
                    return (
                      <div
                        key={i}
                        className={`min-h-24 p-2 border rounded-lg ${
                          dayNum < 1 || dayNum > 31
                            ? "bg-muted/30"
                            : isToday
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50 cursor-pointer"
                        }`}
                      >
                        {dayNum >= 1 && dayNum <= 31 && (
                          <>
                            <span
                              className={`text-sm ${
                                isToday
                                  ? "font-bold text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {dayNum}
                            </span>
                            {hasAppointments && (
                              <div className="mt-1 space-y-1">
                                <div className="text-xs px-1 py-0.5 bg-primary/10 text-primary rounded truncate">
                                  09:00 - Consulta
                                </div>
                                {isToday && (
                                  <div className="text-xs px-1 py-0.5 bg-info/10 text-info rounded truncate">
                                    10:30 - Control
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
