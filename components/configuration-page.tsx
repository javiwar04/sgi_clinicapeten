"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import {
  Building2,
  Calendar,
  Check,
  Clock,
  Edit,
  FlaskConical,
  Plus,
  Save,
  Settings,
  Stethoscope,
  Trash2,
  Users,
} from "lucide-react"

interface Specialty {
  id: string
  name: string
  description: string
  consultationPrice: number
  duration: number
  active: boolean
}

interface ExamType {
  id: string
  code: string
  name: string
  category: string
  price: number
  turnaroundTime: string
  active: boolean
}

interface Schedule {
  id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  active: boolean
}

const initialSpecialties: Specialty[] = [
  { id: "1", name: "Medicina General", description: "Atencion medica primaria", consultationPrice: 150, duration: 30, active: true },
  { id: "2", name: "Cardiologia", description: "Especialidad del corazon", consultationPrice: 200, duration: 45, active: true },
  { id: "3", name: "Pediatria", description: "Atencion a niños", consultationPrice: 175, duration: 30, active: true },
  { id: "4", name: "Ginecologia", description: "Salud de la mujer", consultationPrice: 200, duration: 45, active: true },
  { id: "5", name: "Dermatologia", description: "Enfermedades de la piel", consultationPrice: 180, duration: 30, active: true },
  { id: "6", name: "Traumatologia", description: "Lesiones musculoesqueleticas", consultationPrice: 200, duration: 45, active: true },
]

const initialExamTypes: ExamType[] = [
  { id: "1", code: "HEM-001", name: "Hemograma completo", category: "Hematologia", price: 85, turnaroundTime: "24h", active: true },
  { id: "2", code: "BIO-001", name: "Glucosa en ayunas", category: "Bioquimica", price: 45, turnaroundTime: "4h", active: true },
  { id: "3", code: "BIO-002", name: "Perfil lipidico", category: "Bioquimica", price: 120, turnaroundTime: "24h", active: true },
  { id: "4", code: "URI-001", name: "Examen general de orina", category: "Urinalisis", price: 40, turnaroundTime: "4h", active: true },
  { id: "5", code: "BIO-003", name: "Creatinina", category: "Bioquimica", price: 50, turnaroundTime: "4h", active: true },
  { id: "6", code: "BIO-004", name: "Acido urico", category: "Bioquimica", price: 50, turnaroundTime: "4h", active: true },
]

const initialSchedule: Schedule[] = [
  { id: "1", dayOfWeek: "Lunes", startTime: "08:00", endTime: "17:00", active: true },
  { id: "2", dayOfWeek: "Martes", startTime: "08:00", endTime: "17:00", active: true },
  { id: "3", dayOfWeek: "Miercoles", startTime: "08:00", endTime: "17:00", active: true },
  { id: "4", dayOfWeek: "Jueves", startTime: "08:00", endTime: "17:00", active: true },
  { id: "5", dayOfWeek: "Viernes", startTime: "08:00", endTime: "17:00", active: true },
  { id: "6", dayOfWeek: "Sabado", startTime: "08:00", endTime: "12:00", active: true },
  { id: "7", dayOfWeek: "Domingo", startTime: "00:00", endTime: "00:00", active: false },
]

export function ConfigurationPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>(initialSpecialties)
  const [examTypes, setExamTypes] = useState<ExamType[]>(initialExamTypes)
  const [schedule, setSchedule] = useState<Schedule[]>(initialSchedule)
  
  const [isSpecialtyDialogOpen, setIsSpecialtyDialogOpen] = useState(false)
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)
  const [editingExam, setEditingExam] = useState<ExamType | null>(null)

  const [specialtyForm, setSpecialtyForm] = useState({
    name: "",
    description: "",
    consultationPrice: "",
    duration: "30",
  })

  const [examForm, setExamForm] = useState({
    code: "",
    name: "",
    category: "",
    price: "",
    turnaroundTime: "",
  })

  const [clinicInfo, setClinicInfo] = useState({
    name: "Clinica Medica San Jose",
    address: "5ta Avenida 12-34, Zona 1, Flores, Peten",
    phone: "7867-1234",
    email: "info@clinicasanjose.com",
    nit: "12345678-9",
    slogan: "Tu salud es nuestra prioridad",
  })

  const handleSaveSpecialty = () => {
    if (editingSpecialty) {
      setSpecialties(prev =>
        prev.map(s =>
          s.id === editingSpecialty.id
            ? {
                ...s,
                name: specialtyForm.name,
                description: specialtyForm.description,
                consultationPrice: parseFloat(specialtyForm.consultationPrice),
                duration: parseInt(specialtyForm.duration),
              }
            : s
        )
      )
    } else {
      const newSpecialty: Specialty = {
        id: String(specialties.length + 1),
        name: specialtyForm.name,
        description: specialtyForm.description,
        consultationPrice: parseFloat(specialtyForm.consultationPrice),
        duration: parseInt(specialtyForm.duration),
        active: true,
      }
      setSpecialties([...specialties, newSpecialty])
    }
    setIsSpecialtyDialogOpen(false)
    setEditingSpecialty(null)
    setSpecialtyForm({ name: "", description: "", consultationPrice: "", duration: "30" })
  }

  const handleSaveExam = () => {
    if (editingExam) {
      setExamTypes(prev =>
        prev.map(e =>
          e.id === editingExam.id
            ? {
                ...e,
                code: examForm.code,
                name: examForm.name,
                category: examForm.category,
                price: parseFloat(examForm.price),
                turnaroundTime: examForm.turnaroundTime,
              }
            : e
        )
      )
    } else {
      const newExam: ExamType = {
        id: String(examTypes.length + 1),
        code: examForm.code,
        name: examForm.name,
        category: examForm.category,
        price: parseFloat(examForm.price),
        turnaroundTime: examForm.turnaroundTime,
        active: true,
      }
      setExamTypes([...examTypes, newExam])
    }
    setIsExamDialogOpen(false)
    setEditingExam(null)
    setExamForm({ code: "", name: "", category: "", price: "", turnaroundTime: "" })
  }

  const openEditSpecialty = (specialty: Specialty) => {
    setEditingSpecialty(specialty)
    setSpecialtyForm({
      name: specialty.name,
      description: specialty.description,
      consultationPrice: String(specialty.consultationPrice),
      duration: String(specialty.duration),
    })
    setIsSpecialtyDialogOpen(true)
  }

  const openEditExam = (exam: ExamType) => {
    setEditingExam(exam)
    setExamForm({
      code: exam.code,
      name: exam.name,
      category: exam.category,
      price: String(exam.price),
      turnaroundTime: exam.turnaroundTime,
    })
    setIsExamDialogOpen(true)
  }

  const toggleSpecialtyActive = (id: string) => {
    setSpecialties(prev =>
      prev.map(s => (s.id === id ? { ...s, active: !s.active } : s))
    )
  }

  const toggleExamActive = (id: string) => {
    setExamTypes(prev =>
      prev.map(e => (e.id === id ? { ...e, active: !e.active } : e))
    )
  }

  const toggleScheduleActive = (id: string) => {
    setSchedule(prev =>
      prev.map(s => (s.id === id ? { ...s, active: !s.active } : s))
    )
  }

  const updateScheduleTime = (id: string, field: "startTime" | "endTime", value: string) => {
    setSchedule(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const deleteSpecialty = (id: string) => {
    setSpecialties(prev => prev.filter(s => s.id !== id))
  }

  const deleteExam = (id: string) => {
    setExamTypes(prev => prev.filter(e => e.id !== id))
  }

  return (
    <MainLayout title="Configuracion del Sistema">
      <div className="space-y-6">
        <Tabs defaultValue="clinic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clinic">Datos de la Clinica</TabsTrigger>
            <TabsTrigger value="specialties">Especialidades</TabsTrigger>
            <TabsTrigger value="exams">Examenes</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
          </TabsList>

          {/* Clinic Info Tab */}
          <TabsContent value="clinic">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informacion de la Clinica
                </CardTitle>
                <CardDescription>
                  Datos generales que aparecen en facturas y documentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de la clinica</Label>
                    <Input
                      value={clinicInfo.name}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>NIT</Label>
                    <Input
                      value={clinicInfo.nit}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, nit: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Direccion</Label>
                    <Input
                      value={clinicInfo.address}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefono</Label>
                    <Input
                      value={clinicInfo.phone}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Correo electronico</Label>
                    <Input
                      type="email"
                      value={clinicInfo.email}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Slogan</Label>
                    <Input
                      value={clinicInfo.slogan}
                      onChange={(e) => setClinicInfo({ ...clinicInfo, slogan: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specialties Tab */}
          <TabsContent value="specialties">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Especialidades Medicas
                    </CardTitle>
                    <CardDescription>
                      Configure las especialidades disponibles en la clinica
                    </CardDescription>
                  </div>
                  <Dialog open={isSpecialtyDialogOpen} onOpenChange={setIsSpecialtyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => {
                        setEditingSpecialty(null)
                        setSpecialtyForm({ name: "", description: "", consultationPrice: "", duration: "30" })
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Especialidad
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingSpecialty ? "Editar Especialidad" : "Nueva Especialidad"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingSpecialty ? "Modifique los datos de la especialidad" : "Complete los datos de la nueva especialidad"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Nombre *</Label>
                          <Input
                            value={specialtyForm.name}
                            onChange={(e) => setSpecialtyForm({ ...specialtyForm, name: e.target.value })}
                            placeholder="Ej: Cardiologia"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descripcion</Label>
                          <Textarea
                            value={specialtyForm.description}
                            onChange={(e) => setSpecialtyForm({ ...specialtyForm, description: e.target.value })}
                            placeholder="Breve descripcion de la especialidad..."
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Precio consulta (Q)</Label>
                            <Input
                              type="number"
                              value={specialtyForm.consultationPrice}
                              onChange={(e) => setSpecialtyForm({ ...specialtyForm, consultationPrice: e.target.value })}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duracion (min)</Label>
                            <Select
                              value={specialtyForm.duration}
                              onValueChange={(value) => setSpecialtyForm({ ...specialtyForm, duration: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutos</SelectItem>
                                <SelectItem value="30">30 minutos</SelectItem>
                                <SelectItem value="45">45 minutos</SelectItem>
                                <SelectItem value="60">60 minutos</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSpecialtyDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveSpecialty}>
                          {editingSpecialty ? "Guardar Cambios" : "Crear Especialidad"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Duracion</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {specialties.map((specialty) => (
                        <TableRow key={specialty.id}>
                          <TableCell className="font-medium">{specialty.name}</TableCell>
                          <TableCell className="text-muted-foreground max-w-xs truncate">
                            {specialty.description}
                          </TableCell>
                          <TableCell>Q{specialty.consultationPrice}</TableCell>
                          <TableCell>{specialty.duration} min</TableCell>
                          <TableCell>
                            <Switch
                              checked={specialty.active}
                              onCheckedChange={() => toggleSpecialtyActive(specialty.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditSpecialty(specialty)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteSpecialty(specialty.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FlaskConical className="h-5 w-5" />
                      Tipos de Examenes
                    </CardTitle>
                    <CardDescription>
                      Configure los examenes de laboratorio disponibles
                    </CardDescription>
                  </div>
                  <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => {
                        setEditingExam(null)
                        setExamForm({ code: "", name: "", category: "", price: "", turnaroundTime: "" })
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Examen
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingExam ? "Editar Examen" : "Nuevo Examen"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingExam ? "Modifique los datos del examen" : "Complete los datos del nuevo examen"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Codigo *</Label>
                            <Input
                              value={examForm.code}
                              onChange={(e) => setExamForm({ ...examForm, code: e.target.value })}
                              placeholder="Ej: HEM-001"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Select
                              value={examForm.category}
                              onValueChange={(value) => setExamForm({ ...examForm, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hematologia">Hematologia</SelectItem>
                                <SelectItem value="Bioquimica">Bioquimica</SelectItem>
                                <SelectItem value="Urinalisis">Urinalisis</SelectItem>
                                <SelectItem value="Microbiologia">Microbiologia</SelectItem>
                                <SelectItem value="Inmunologia">Inmunologia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Nombre del examen *</Label>
                          <Input
                            value={examForm.name}
                            onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                            placeholder="Ej: Hemograma completo"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Precio (Q)</Label>
                            <Input
                              type="number"
                              value={examForm.price}
                              onChange={(e) => setExamForm({ ...examForm, price: e.target.value })}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tiempo de entrega</Label>
                            <Select
                              value={examForm.turnaroundTime}
                              onValueChange={(value) => setExamForm({ ...examForm, turnaroundTime: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1h">1 hora</SelectItem>
                                <SelectItem value="4h">4 horas</SelectItem>
                                <SelectItem value="24h">24 horas</SelectItem>
                                <SelectItem value="48h">48 horas</SelectItem>
                                <SelectItem value="72h">72 horas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsExamDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveExam}>
                          {editingExam ? "Guardar Cambios" : "Crear Examen"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Codigo</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Entrega</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {examTypes.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-mono text-sm">{exam.code}</TableCell>
                          <TableCell className="font-medium">{exam.name}</TableCell>
                          <TableCell className="text-muted-foreground">{exam.category}</TableCell>
                          <TableCell>Q{exam.price}</TableCell>
                          <TableCell>{exam.turnaroundTime}</TableCell>
                          <TableCell>
                            <Switch
                              checked={exam.active}
                              onCheckedChange={() => toggleExamActive(exam.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditExam(exam)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteExam(exam.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de Atencion
                </CardTitle>
                <CardDescription>
                  Configure los horarios de atencion de la clinica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.map((day) => (
                    <div
                      key={day.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        day.active ? "bg-card" : "bg-muted/50"
                      }`}
                    >
                      <Switch
                        checked={day.active}
                        onCheckedChange={() => toggleScheduleActive(day.id)}
                      />
                      <span className="w-24 font-medium">{day.dayOfWeek}</span>
                      {day.active ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-muted-foreground">Desde:</Label>
                            <Input
                              type="time"
                              value={day.startTime}
                              onChange={(e) => updateScheduleTime(day.id, "startTime", e.target.value)}
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm text-muted-foreground">Hasta:</Label>
                            <Input
                              type="time"
                              value={day.endTime}
                              onChange={(e) => updateScheduleTime(day.id, "endTime", e.target.value)}
                              className="w-32"
                            />
                          </div>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Cerrado</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Horarios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
