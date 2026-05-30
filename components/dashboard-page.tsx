"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import {
  Users,
  Calendar,
  FlaskConical,
  Pill,
  DollarSign,
  Stethoscope,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import {
  dashboardStats,
  weeklyAttendance,
  incomeByArea,
  appointmentStatusData,
  topServices,
  appointments,
  labOrders,
  medications,
} from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

const CHART_COLORS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444"]

export function DashboardPage() {
  const pendingLabOrders = labOrders.filter((o) => o.status === "pendiente")
  const lowStockMeds = medications.filter((m) => m.status === "bajo_stock" || m.status === "agotado")
  const waitingPatients = appointments.filter((a) => a.status === "en_espera" || a.status === "en_consulta")

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.patientsToday}</p>
                  <p className="text-xs text-muted-foreground">Pacientes hoy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Calendar className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.scheduledAppointments}</p>
                  <p className="text-xs text-muted-foreground">Citas programadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <FlaskConical className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.pendingLabOrders}</p>
                  <p className="text-xs text-muted-foreground">Órdenes lab. pend.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Pill className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dashboardStats.lowStockMedications}</p>
                  <p className="text-xs text-muted-foreground">Med. bajo stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Q{dashboardStats.todayIncome.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Ingresos hoy</p>
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
                  <p className="text-2xl font-bold">{dashboardStats.ongoingConsultations}</p>
                  <p className="text-xs text-muted-foreground">Consultas en curso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Atenciones por semana</CardTitle>
              <CardDescription>Consultas, laboratorio y farmacia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="day" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="consultas" name="Consultas" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="laboratorio" name="Laboratorio" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="farmacia" name="Farmacia" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Income by Area Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ingresos por área</CardTitle>
              <CardDescription>Distribución de ingresos del mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeByArea}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="ingresos"
                      nameKey="area"
                      label={({ area, percent }) => `${area} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {incomeByArea.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`Q${value.toLocaleString()}`, "Ingresos"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Waiting Patients */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Pacientes en espera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {waitingPatients.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay pacientes en espera
                  </p>
                ) : (
                  waitingPatients.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {apt.time} - {apt.specialty}
                        </p>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Lab Orders */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Órdenes de laboratorio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingLabOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay órdenes pendientes
                  </p>
                ) : (
                  pendingLabOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{order.patientName}</p>
                        <p className="text-xs text-muted-foreground">{order.examType}</p>
                      </div>
                      <StatusBadge status={order.priority} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Medications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Medicamentos con bajo stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockMeds.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Todo el inventario está en orden
                  </p>
                ) : (
                  lowStockMeds.map((med) => (
                    <div
                      key={med.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{med.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock: {med.currentStock} / Mín: {med.minStock}
                        </p>
                      </div>
                      <StatusBadge status={med.status} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services & Status Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Servicios más solicitados
              </CardTitle>
              <CardDescription>Top 5 servicios del mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.service} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-6 text-muted-foreground">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{service.service}</span>
                        <span className="text-sm font-medium">{service.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{
                            width: `${(service.count / topServices[0].count) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appointment Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estado de citas</CardTitle>
              <CardDescription>Distribución de citas del día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appointmentStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      nameKey="status"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {appointmentStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
