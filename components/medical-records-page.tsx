"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  patients,
  consultations,
  labOrders,
  payments,
  type Patient,
} from "@/lib/mock-data"
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  FileText,
  FlaskConical,
  Heart,
  Pill,
  Search,
  Stethoscope,
  User,
  Users,
} from "lucide-react"

export function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dpi.includes(searchTerm) ||
    patient.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const patientConsultations = selectedPatient
    ? consultations.filter((c) => c.patientId === selectedPatient.id)
    : []

  const patientLabOrders = selectedPatient
    ? labOrders.filter((l) => l.patientId === selectedPatient.id)
    : []

  const patientPayments = selectedPatient
    ? payments.filter((p) => p.patientId === selectedPatient.id)
    : []

  const openRecord = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsRecordDialogOpen(true)
  }

  return (
    <MainLayout title="Expedientes Clínicos">
      <div className="space-y-6">
        {/* Search */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Búsqueda de Expedientes</CardTitle>
            <CardDescription>
              Busque pacientes por nombre, DPI o código de expediente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente..."
                className="pl-9 max-w-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pacientes Registrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>DPI</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Última visita</TableHead>
                    <TableHead>Alertas</TableHead>
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
                      <TableCell>{patient.age} años</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {patient.lastVisit}
                      </TableCell>
                      <TableCell>
                        {patient.allergies.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Alergias
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openRecord(patient)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Expediente
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Patient Record Dialog */}
        <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Expediente Clínico
              </DialogTitle>
            </DialogHeader>

            {selectedPatient && (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                      <StatusBadge status={selectedPatient.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedPatient.code} | {selectedPatient.age} años |{" "}
                      {selectedPatient.gender === "M"
                        ? "Masculino"
                        : selectedPatient.gender === "F"
                          ? "Femenino"
                          : "No mucho"}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span>DPI: {selectedPatient.dpi}</span>
                      <span>Tel: {selectedPatient.phone}</span>
                    </div>
                  </div>
                  {selectedPatient.allergies.length > 0 && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-xs font-medium text-destructive mb-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Alergias
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatient.allergies.map((allergy) => (
                          <span
                            key={allergy}
                            className="px-2 py-0.5 bg-destructive/20 text-destructive text-xs rounded-full"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="info" className="space-y-4">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="consultations">Consultas</TabsTrigger>
                    <TabsTrigger value="lab">Laboratorio</TabsTrigger>
                    <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
                    <TabsTrigger value="history">Antecedentes</TabsTrigger>
                    <TabsTrigger value="payments">Pagos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Datos Personales
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dirección</span>
                            <span className="font-medium">{selectedPatient.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contacto emergencia</span>
                            <span className="font-medium">{selectedPatient.emergencyContact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fecha nacimiento</span>
                            <span className="font-medium">{selectedPatient.birthDate}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Última Consulta
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {patientConsultations.length > 0 ? (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Fecha</span>
                                <span className="font-medium">
                                  {patientConsultations[0].date}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Médico</span>
                                <span className="font-medium">
                                  {patientConsultations[0].doctorName}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Diagnóstico</span>
                                <span className="font-medium text-right max-w-48 truncate">
                                  {patientConsultations[0].diagnosis}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              Sin consultas registradas
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Resumen de Atención
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <Stethoscope className="h-5 w-5 mx-auto mb-1 text-primary" />
                              <p className="text-2xl font-bold">
                                {patientConsultations.length}
                              </p>
                              <p className="text-xs text-muted-foreground">Consultas</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <FlaskConical className="h-5 w-5 mx-auto mb-1 text-info" />
                              <p className="text-2xl font-bold">
                                {patientLabOrders.length}
                              </p>
                              <p className="text-xs text-muted-foreground">Exámenes</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <Pill className="h-5 w-5 mx-auto mb-1 text-warning" />
                              <p className="text-2xl font-bold">3</p>
                              <p className="text-xs text-muted-foreground">Recetas</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <CreditCard className="h-5 w-5 mx-auto mb-1 text-success" />
                              <p className="text-2xl font-bold">
                                {patientPayments.length}
                              </p>
                              <p className="text-xs text-muted-foreground">Pagos</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="consultations">
                    <Card>
                      <CardContent className="pt-6">
                        {patientConsultations.length > 0 ? (
                          <div className="space-y-4">
                            {patientConsultations.map((consultation) => (
                              <div
                                key={consultation.id}
                                className="p-4 rounded-lg border bg-card"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{consultation.date}</span>
                                  </div>
                                  <Badge variant="secondary">{consultation.doctorName}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Motivo
                                    </p>
                                    <p className="text-sm">{consultation.reason}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Síntomas
                                    </p>
                                    <p className="text-sm">{consultation.symptoms}</p>
                                  </div>
                                </div>
                                <div className="p-3 rounded bg-muted/50 mb-3">
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Signos Vitales
                                  </p>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <span>PA: {consultation.vitalSigns.bloodPressure}</span>
                                    <span>FC: {consultation.vitalSigns.heartRate} bpm</span>
                                    <span>Temp: {consultation.vitalSigns.temperature}°C</span>
                                    <span>Peso: {consultation.vitalSigns.weight} kg</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Diagnóstico
                                    </p>
                                    <p className="text-sm font-medium">{consultation.diagnosis}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Tratamiento
                                    </p>
                                    <p className="text-sm">{consultation.treatment}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center py-8 text-muted-foreground">
                            No hay consultas registradas
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="lab">
                    <Card>
                      <CardContent className="pt-6">
                        {patientLabOrders.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Examen</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Médico</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Resultado</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {patientLabOrders.map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="font-mono text-sm">
                                    {order.code}
                                  </TableCell>
                                  <TableCell>{order.examType}</TableCell>
                                  <TableCell>{order.date}</TableCell>
                                  <TableCell>{order.doctorName}</TableCell>
                                  <TableCell>
                                    <StatusBadge status={order.status} />
                                  </TableCell>
                                  <TableCell>
                                    {order.results || "-"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-center py-8 text-muted-foreground">
                            No hay órdenes de laboratorio
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="prescriptions">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Pill className="h-4 w-4 text-primary" />
                                <span className="font-medium">Receta #001</span>
                              </div>
                              <span className="text-sm text-muted-foreground">2026-05-01</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                                <span>Metformina 850mg</span>
                                <span className="text-muted-foreground">
                                  Cada 12 horas - 30 días
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Heart className="h-4 w-4 text-destructive" />
                              Antecedentes Patológicos
                            </h4>
                            <p className="text-sm p-3 rounded bg-muted/50">
                              {selectedPatient.antecedents || "Sin antecedentes registrados"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-warning" />
                              Alergias
                            </h4>
                            <div className="p-3 rounded bg-muted/50">
                              {selectedPatient.allergies.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {selectedPatient.allergies.map((a) => (
                                    <Badge key={a} variant="destructive">
                                      {a}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  Sin alergias conocidas
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Observaciones</h4>
                            <p className="text-sm p-3 rounded bg-muted/50">
                              {selectedPatient.observations || "Sin observaciones"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payments">
                    <Card>
                      <CardContent className="pt-6">
                        {patientPayments.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Servicio</TableHead>
                                <TableHead>Área</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Estado</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {patientPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                  <TableCell className="font-mono text-sm">
                                    {payment.code}
                                  </TableCell>
                                  <TableCell>{payment.service}</TableCell>
                                  <TableCell className="capitalize">{payment.area}</TableCell>
                                  <TableCell>{payment.date}</TableCell>
                                  <TableCell className="font-medium">
                                    Q{payment.amount.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    <StatusBadge status={payment.status} />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-center py-8 text-muted-foreground">
                            No hay pagos registrados
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
