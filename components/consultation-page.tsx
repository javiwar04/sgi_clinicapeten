"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { appointments, patients, type Appointment } from "@/lib/mock-data"
import {
  AlertTriangle,
  Calendar,
  Check,
  ClipboardList,
  FileText,
  FlaskConical,
  Pill,
  Save,
  Stethoscope,
  User,
  Users,
} from "lucide-react"

export function ConsultationPage() {
  const [waitingPatients, setWaitingPatients] = useState<Appointment[]>(
    appointments.filter((a) => a.status === "en_espera" || a.status === "en_consulta")
  )
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [isLabOrderDialogOpen, setIsLabOrderDialogOpen] = useState(false)
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false)

  const [consultationForm, setConsultationForm] = useState({
    reason: "",
    symptoms: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    diagnosis: "",
    treatment: "",
    observations: "",
    nextAppointment: "",
  })

  const selectedPatient = selectedAppointment
    ? patients.find((p) => p.id === selectedAppointment.patientId)
    : null

  const startConsultation = (apt: Appointment) => {
    setSelectedAppointment(apt)
    setConsultationForm({
      reason: apt.reason,
      symptoms: "",
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
      diagnosis: "",
      treatment: "",
      observations: "",
      nextAppointment: "",
    })
    setIsConsultationOpen(true)

    // Update status to in consultation
    setWaitingPatients((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: "en_consulta" as const } : a))
    )
  }

  const saveConsultation = () => {
    // Save consultation logic here
    console.log("[v0] Saving consultation:", consultationForm)
  }

  const finishConsultation = () => {
    if (!selectedAppointment) return

    setWaitingPatients((prev) =>
      prev.filter((a) => a.id !== selectedAppointment.id)
    )
    setIsConsultationOpen(false)
    setSelectedAppointment(null)
  }

  const inConsultation = waitingPatients.filter((a) => a.status === "en_consulta")
  const waiting = waitingPatients.filter((a) => a.status === "en_espera")

  return (
    <MainLayout title="Consulta Médica">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Lists */}
        <div className="lg:col-span-1 space-y-6">
          {/* In Consultation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary" />
                En Consulta
                {inConsultation.length > 0 && (
                  <Badge variant="secondary">{inConsultation.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {inConsultation.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Sin pacientes en consulta
                </p>
              ) : (
                <div className="space-y-2">
                  {inConsultation.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => startConsultation(apt)}
                      className="w-full text-left p-3 rounded-lg border border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{apt.patientName}</span>
                        <span className="text-xs text-muted-foreground">{apt.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{apt.reason}</p>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Waiting */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-warning" />
                En Espera
                {waiting.length > 0 && (
                  <Badge variant="secondary">{waiting.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {waiting.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Sin pacientes en espera
                </p>
              ) : (
                <div className="space-y-2">
                  {waiting.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => startConsultation(apt)}
                      className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{apt.patientName}</span>
                        <span className="text-xs text-muted-foreground">{apt.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{apt.reason}</p>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Consultation Area */}
        <div className="lg:col-span-2">
          {isConsultationOpen && selectedAppointment && selectedPatient ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Consulta Médica</CardTitle>
                    <CardDescription>
                      Complete los datos de la consulta
                    </CardDescription>
                  </div>
                  <StatusBadge status="en_consulta" />
                </div>
              </CardHeader>
              <CardContent>
                {/* Patient Info */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{selectedPatient.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {selectedPatient.age} años
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedPatient.code} | {selectedPatient.gender === "M"
                        ? "Masculino"
                        : selectedPatient.gender === "F"
                          ? "Femenino"
                          : "No mucho"}
                    </p>
                  </div>
                  {selectedPatient.allergies.length > 0 && (
                    <div className="p-2 rounded bg-destructive/10 border border-destructive/20">
                      <p className="text-xs font-medium text-destructive flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Alergias: {selectedPatient.allergies.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Consultation Form */}
                <Tabs defaultValue="consultation" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="consultation">Consulta</TabsTrigger>
                    <TabsTrigger value="vitals">Signos Vitales</TabsTrigger>
                    <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
                  </TabsList>

                  <TabsContent value="consultation" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Motivo de consulta</Label>
                      <Input
                        value={consultationForm.reason}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            reason: e.target.value,
                          })
                        }
                        placeholder="Motivo principal de la visita"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Síntomas</Label>
                      <Textarea
                        value={consultationForm.symptoms}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            symptoms: e.target.value,
                          })
                        }
                        placeholder="Describa los síntomas del paciente..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="vitals" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Presión arterial</Label>
                        <Input
                          value={consultationForm.bloodPressure}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              bloodPressure: e.target.value,
                            })
                          }
                          placeholder="Ej: 120/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frecuencia cardíaca (bpm)</Label>
                        <Input
                          type="number"
                          value={consultationForm.heartRate}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              heartRate: e.target.value,
                            })
                          }
                          placeholder="Ej: 72"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Temperatura (°C)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={consultationForm.temperature}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              temperature: e.target.value,
                            })
                          }
                          placeholder="Ej: 36.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input
                          type="number"
                          value={consultationForm.weight}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              weight: e.target.value,
                            })
                          }
                          placeholder="Ej: 70"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Altura (cm)</Label>
                        <Input
                          type="number"
                          value={consultationForm.height}
                          onChange={(e) =>
                            setConsultationForm({
                              ...consultationForm,
                              height: e.target.value,
                            })
                          }
                          placeholder="Ej: 170"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="diagnosis" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Diagnóstico</Label>
                      <Textarea
                        value={consultationForm.diagnosis}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            diagnosis: e.target.value,
                          })
                        }
                        placeholder="Diagnóstico médico..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tratamiento</Label>
                      <Textarea
                        value={consultationForm.treatment}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            treatment: e.target.value,
                          })
                        }
                        placeholder="Indicaciones de tratamiento..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Observaciones</Label>
                      <Textarea
                        value={consultationForm.observations}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            observations: e.target.value,
                          })
                        }
                        placeholder="Observaciones adicionales..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Próxima cita</Label>
                      <Input
                        type="date"
                        value={consultationForm.nextAppointment}
                        onChange={(e) =>
                          setConsultationForm({
                            ...consultationForm,
                            nextAppointment: e.target.value,
                          })
                        }
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                  <Button variant="outline" onClick={saveConsultation}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsLabOrderDialogOpen(true)}
                  >
                    <FlaskConical className="h-4 w-4 mr-2" />
                    Orden de Laboratorio
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsPrescriptionDialogOpen(true)}
                  >
                    <Pill className="h-4 w-4 mr-2" />
                    Generar Receta
                  </Button>
                  <div className="flex-1" />
                  <Button onClick={finishConsultation}>
                    <Check className="h-4 w-4 mr-2" />
                    Finalizar Consulta
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Sin consulta activa</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Seleccione un paciente de la lista de espera para iniciar una consulta médica.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Lab Order Dialog */}
      <Dialog open={isLabOrderDialogOpen} onOpenChange={setIsLabOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generar Orden de Laboratorio</DialogTitle>
            <DialogDescription>
              Seleccione los exámenes a solicitar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              {[
                "Hemograma completo",
                "Glucosa en ayunas",
                "Perfil lipídico",
                "Creatinina",
                "Ácido úrico",
                "Examen general de orina",
              ].map((exam) => (
                <label
                  key={exam}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                >
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{exam}</span>
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Observaciones</Label>
              <Textarea placeholder="Instrucciones especiales..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLabOrderDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsLabOrderDialogOpen(false)}>
              Generar Orden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prescription Dialog */}
      <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generar Receta Médica</DialogTitle>
            <DialogDescription>
              Agregue los medicamentos a la receta
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 rounded-lg border bg-muted/50">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Input placeholder="Medicamento" />
                <Input placeholder="Dosis" />
                <Input placeholder="Frecuencia" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                + Agregar medicamento
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Indicaciones</Label>
              <Textarea placeholder="Instrucciones adicionales..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsPrescriptionDialogOpen(false)}>
              Generar Receta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
