"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Download,
  FileText,
  Pill,
  Printer,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react"

const monthlyData = [
  { month: "Ene", consultas: 145, ingresos: 28500 },
  { month: "Feb", consultas: 132, ingresos: 26400 },
  { month: "Mar", consultas: 168, ingresos: 33600 },
  { month: "Abr", consultas: 155, ingresos: 31000 },
  { month: "May", consultas: 189, ingresos: 37800 },
]

const specialtyData = [
  { name: "Medicina General", value: 45, color: "#0088FE" },
  { name: "Cardiologia", value: 20, color: "#00C49F" },
  { name: "Pediatria", value: 18, color: "#FFBB28" },
  { name: "Ginecologia", value: 12, color: "#FF8042" },
  { name: "Otros", value: 5, color: "#8884d8" },
]

const dailyData = [
  { day: "Lun", pacientes: 32 },
  { day: "Mar", pacientes: 28 },
  { day: "Mie", pacientes: 35 },
  { day: "Jue", pacientes: 30 },
  { day: "Vie", pacientes: 38 },
  { day: "Sab", pacientes: 15 },
]

const topMedications = [
  { name: "Paracetamol 500mg", cantidad: 450, ingresos: 2250 },
  { name: "Losartan 50mg", cantidad: 320, ingresos: 4160 },
  { name: "Metformina 850mg", cantidad: 280, ingresos: 2520 },
  { name: "Omeprazol 20mg", cantidad: 265, ingresos: 1855 },
  { name: "Ibuprofeno 400mg", cantidad: 210, ingresos: 1050 },
]

const topExams = [
  { name: "Hemograma completo", cantidad: 180, ingresos: 15300 },
  { name: "Glucosa en ayunas", cantidad: 156, ingresos: 7020 },
  { name: "Perfil lipidico", cantidad: 98, ingresos: 11760 },
  { name: "Examen de orina", cantidad: 87, ingresos: 3480 },
  { name: "Creatinina", cantidad: 72, ingresos: 3600 },
]

export function ReportsPage() {
  const [dateRange, setDateRange] = useState("month")
  const [reportType, setReportType] = useState("general")

  const stats = {
    totalPatients: 1248,
    newPatients: 89,
    totalConsultations: 189,
    totalRevenue: 37800,
    avgTicket: 200,
    occupancy: 78,
  }

  return (
    <MainLayout title="Reportes y Estadisticas">
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Periodo</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mes</SelectItem>
                    <SelectItem value="quarter">Este trimestre</SelectItem>
                    <SelectItem value="year">Este año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Fecha inicio</Label>
                <Input type="date" defaultValue="2026-05-01" />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Fecha fin</Label>
                <Input type="date" defaultValue="2026-05-28" />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stats.totalPatients}</p>
                  <p className="text-xs text-muted-foreground">Total pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Users className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-xl font-bold">+{stats.newPatients}</p>
                  <p className="text-xs text-muted-foreground">Nuevos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Stethoscope className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stats.totalConsultations}</p>
                  <p className="text-xs text-muted-foreground">Consultas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <DollarSign className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-xl font-bold">Q{(stats.totalRevenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Ingresos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-bold">Q{stats.avgTicket}</p>
                  <p className="text-xs text-muted-foreground">Ticket prom.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Calendar className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stats.occupancy}%</p>
                  <p className="text-xs text-muted-foreground">Ocupacion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vision General</TabsTrigger>
            <TabsTrigger value="financial">Financiero</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Monthly Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Consultas Mensuales</CardTitle>
                  <CardDescription>Tendencia de consultas por mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="consultas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Specialty Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Consultas por Especialidad</CardTitle>
                  <CardDescription>Distribucion porcentual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={specialtyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {specialtyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Daily Patients */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Pacientes por Dia de la Semana</CardTitle>
                  <CardDescription>Promedio de pacientes atendidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pacientes"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Revenue Trend */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Tendencia de Ingresos</CardTitle>
                  <CardDescription>Ingresos mensuales en Quetzales</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(value) => `Q${value / 1000}k`} />
                      <Tooltip
                        formatter={(value: number) => [`Q${value.toLocaleString()}`, "Ingresos"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="ingresos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ingresos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Consultas", amount: 22500, percent: 60 },
                      { name: "Laboratorio", amount: 9450, percent: 25 },
                      { name: "Farmacia", amount: 5670, percent: 15 },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">Q{item.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Metodos de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Efectivo", amount: 18900, percent: 50, color: "bg-success" },
                      { name: "Tarjeta", amount: 15120, percent: 40, color: "bg-info" },
                      { name: "Transferencia", amount: 3780, percent: 10, color: "bg-warning" },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">Q{item.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Top Exams */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Examenes Mas Solicitados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topExams.map((exam, idx) => (
                      <div
                        key={exam.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{exam.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {exam.cantidad} realizados
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">Q{exam.ingresos.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Medicos con Mas Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Juan Perez", specialty: "Medicina General", consultations: 85 },
                      { name: "Dra. Maria Lopez", specialty: "Pediatria", consultations: 62 },
                      { name: "Dr. Carlos Ramirez", specialty: "Cardiologia", consultations: 45 },
                      { name: "Dra. Ana Martinez", specialty: "Ginecologia", consultations: 38 },
                      { name: "Dr. Roberto Hernandez", specialty: "Traumatologia", consultations: 28 },
                    ].map((doctor, idx) => (
                      <div
                        key={doctor.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-info/10 text-info text-xs font-medium flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                          </div>
                        </div>
                        <p className="font-medium">{doctor.consultations} consultas</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Top Medications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    Medicamentos Mas Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topMedications.map((med, idx) => (
                      <div
                        key={med.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-warning/10 text-warning text-xs font-medium flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {med.cantidad} unidades
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">Q{med.ingresos.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Alertas de Inventario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Amoxicilina 500mg", stock: 5, min: 20, status: "critico" },
                      { name: "Diclofenaco 75mg", stock: 12, min: 25, status: "bajo" },
                      { name: "Enalapril 10mg", stock: 8, min: 15, status: "bajo" },
                      { name: "Metoclopramida 10mg", stock: 0, min: 10, status: "agotado" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          item.status === "agotado"
                            ? "bg-destructive/5 border-destructive/20"
                            : item.status === "critico"
                            ? "bg-warning/5 border-warning/20"
                            : "bg-muted/50"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Stock: {item.stock} / Min: {item.min}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "agotado"
                              ? "bg-destructive/10 text-destructive"
                              : item.status === "critico"
                              ? "bg-warning/10 text-warning"
                              : "bg-info/10 text-info"
                          }`}
                        >
                          {item.status === "agotado"
                            ? "Agotado"
                            : item.status === "critico"
                            ? "Critico"
                            : "Bajo"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
