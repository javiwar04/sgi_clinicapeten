// Mock data for the clinic management system

export interface Patient {
  id: string
  code: string
  name: string
  dpi: string
  birthDate: string
  age: number
  gender: "M" | "F" | "NM"
  phone: string
  address: string
  emergencyContact: string
  allergies: string[]
  antecedents: string
  observations: string
  lastVisit: string
  status: "activo" | "inactivo"
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  reason: string
  status: "programada" | "en_espera" | "en_consulta" | "finalizada" | "cancelada"
  observations?: string
}

export interface LabOrder {
  id: string
  code: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  examType: string
  priority: "normal" | "urgente"
  date: string
  status: "pendiente" | "en_proceso" | "completada" | "cancelada"
  results?: string
  observations?: string
}

export interface Medication {
  id: string
  code: string
  name: string
  presentation: string
  category: string
  currentStock: number
  minStock: number
  price: number
  status: "disponible" | "bajo_stock" | "agotado"
  expirationDate: string
  supplier: string
}

export interface Payment {
  id: string
  code: string
  patientId: string
  patientName: string
  service: string
  area: "consulta" | "laboratorio" | "farmacia" | "procedimiento"
  amount: number
  paymentMethod: "efectivo" | "tarjeta" | "transferencia"
  status: "pendiente" | "pagado" | "anulado"
  date: string
  receiptNumber?: string
}

export interface SystemUser {
  id: string
  name: string
  username: string
  email: string
  role: string
  status: "activo" | "inactivo"
  lastAccess: string
  permissions: string[]
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  role: string
  action: string
  module: string
  dateTime: string
  ipAddress: string
  details: string
}

export interface Consultation {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  reason: string
  symptoms: string
  vitalSigns: {
    bloodPressure: string
    heartRate: number
    temperature: number
    weight: number
    height: number
  }
  diagnosis: string
  treatment: string
  observations: string
  nextAppointment?: string
}

// Mock Patients
export const patients: Patient[] = [
  {
    id: "1",
    code: "PAC-001",
    name: "María Elena García López",
    dpi: "1234567890101",
    birthDate: "1985-03-15",
    age: 41,
    gender: "F",
    phone: "5012-3456",
    address: "Flores, Petén",
    emergencyContact: "Carlos García - 5098-7654",
    allergies: ["Penicilina"],
    antecedents: "Diabetes tipo 2",
    observations: "Paciente regular",
    lastVisit: "2026-05-01",
    status: "activo",
  },
  {
    id: "2",
    code: "PAC-002",
    name: "Juan Carlos Méndez Ruiz",
    dpi: "2345678901202",
    birthDate: "1978-07-22",
    age: 47,
    gender: "M",
    phone: "5023-4567",
    address: "San Benito, Petén",
    emergencyContact: "Rosa Méndez - 5087-6543",
    allergies: [],
    antecedents: "Hipertensión",
    observations: "",
    lastVisit: "2026-04-28",
    status: "activo",
  },
  {
    id: "3",
    code: "PAC-003",
    name: "Ana Lucía Hernández Paz",
    dpi: "3456789012303",
    birthDate: "1992-11-08",
    age: 33,
    gender: "F",
    phone: "5034-5678",
    address: "Santa Elena, Petén",
    emergencyContact: "Pedro Hernández - 5076-5432",
    allergies: ["Sulfa", "Mariscos"],
    antecedents: "Ninguno conocido",
    observations: "Primera visita",
    lastVisit: "2026-05-05",
    status: "activo",
  },
  {
    id: "4",
    code: "PAC-004",
    name: "Roberto Antonio Sánchez Morales",
    dpi: "4567890123404",
    birthDate: "1965-02-28",
    age: 61,
    gender: "M",
    phone: "5045-6789",
    address: "Melchor de Mencos, Petén",
    emergencyContact: "María Sánchez - 5065-4321",
    allergies: [],
    antecedents: "Cardiopatía, Diabetes tipo 2",
    observations: "Requiere seguimiento cardiológico",
    lastVisit: "2026-05-03",
    status: "activo",
  },
  {
    id: "5",
    code: "PAC-005",
    name: "Carmen Elena Juárez Vásquez",
    dpi: "5678901234505",
    birthDate: "2000-09-12",
    age: 25,
    gender: "F",
    phone: "5056-7890",
    address: "San Francisco, Petén",
    emergencyContact: "Luis Juárez - 5054-3210",
    allergies: ["Látex"],
    antecedents: "Asma",
    observations: "",
    lastVisit: "2026-04-15",
    status: "activo",
  },
]

// Mock Appointments
export const appointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "María Elena García López",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    specialty: "Medicina General",
    date: "2026-05-08",
    time: "09:00",
    reason: "Control de diabetes",
    status: "en_espera",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Juan Carlos Méndez Ruiz",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    specialty: "Medicina General",
    date: "2026-05-08",
    time: "09:30",
    reason: "Control de presión arterial",
    status: "programada",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Ana Lucía Hernández Paz",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    specialty: "Medicina General",
    date: "2026-05-08",
    time: "10:00",
    reason: "Consulta general",
    status: "programada",
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Roberto Antonio Sánchez Morales",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    specialty: "Cardiología",
    date: "2026-05-08",
    time: "10:30",
    reason: "Seguimiento cardiológico",
    status: "programada",
  },
  {
    id: "5",
    patientId: "5",
    patientName: "Carmen Elena Juárez Vásquez",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    specialty: "Medicina General",
    date: "2026-05-08",
    time: "11:00",
    reason: "Control de asma",
    status: "en_consulta",
  },
]

// Mock Lab Orders
export const labOrders: LabOrder[] = [
  {
    id: "1",
    code: "LAB-001",
    patientId: "1",
    patientName: "María Elena García López",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    examType: "Hemograma completo",
    priority: "normal",
    date: "2026-05-08",
    status: "pendiente",
    observations: "Control de rutina",
  },
  {
    id: "2",
    code: "LAB-002",
    patientId: "1",
    patientName: "María Elena García López",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    examType: "Glucosa en ayunas",
    priority: "normal",
    date: "2026-05-08",
    status: "en_proceso",
    observations: "Control de diabetes",
  },
  {
    id: "3",
    code: "LAB-003",
    patientId: "4",
    patientName: "Roberto Antonio Sánchez Morales",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    examType: "Perfil lipídico",
    priority: "urgente",
    date: "2026-05-08",
    status: "pendiente",
    observations: "Paciente cardiópata",
  },
  {
    id: "4",
    code: "LAB-004",
    patientId: "2",
    patientName: "Juan Carlos Méndez Ruiz",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    examType: "Creatinina",
    priority: "normal",
    date: "2026-05-07",
    status: "completada",
    results: "0.9 mg/dL - Normal",
    observations: "",
  },
]

// Mock Medications
export const medications: Medication[] = [
  {
    id: "1",
    code: "MED-001",
    name: "Metformina",
    presentation: "Tabletas 850mg",
    category: "Antidiabéticos",
    currentStock: 250,
    minStock: 50,
    price: 45.0,
    status: "disponible",
    expirationDate: "2027-06-15",
    supplier: "Farmacéutica Nacional",
  },
  {
    id: "2",
    code: "MED-002",
    name: "Losartán",
    presentation: "Tabletas 50mg",
    category: "Antihipertensivos",
    currentStock: 180,
    minStock: 40,
    price: 35.0,
    status: "disponible",
    expirationDate: "2027-03-20",
    supplier: "Distribuidora Médica",
  },
  {
    id: "3",
    code: "MED-003",
    name: "Omeprazol",
    presentation: "Cápsulas 20mg",
    category: "Antiácidos",
    currentStock: 25,
    minStock: 30,
    price: 28.0,
    status: "bajo_stock",
    expirationDate: "2026-12-10",
    supplier: "Farmacéutica Nacional",
  },
  {
    id: "4",
    code: "MED-004",
    name: "Amoxicilina",
    presentation: "Cápsulas 500mg",
    category: "Antibióticos",
    currentStock: 0,
    minStock: 50,
    price: 55.0,
    status: "agotado",
    expirationDate: "2027-01-25",
    supplier: "Distribuidora Médica",
  },
  {
    id: "5",
    code: "MED-005",
    name: "Salbutamol",
    presentation: "Inhalador 100mcg",
    category: "Broncodilatadores",
    currentStock: 45,
    minStock: 20,
    price: 85.0,
    status: "disponible",
    expirationDate: "2026-11-30",
    supplier: "Importadora Salud",
  },
]

// Mock Payments
export const payments: Payment[] = [
  {
    id: "1",
    code: "PAG-001",
    patientId: "1",
    patientName: "María Elena García López",
    service: "Consulta General",
    area: "consulta",
    amount: 150.0,
    paymentMethod: "efectivo",
    status: "pagado",
    date: "2026-05-08",
    receiptNumber: "REC-2026-001",
  },
  {
    id: "2",
    code: "PAG-002",
    patientId: "2",
    patientName: "Juan Carlos Méndez Ruiz",
    service: "Hemograma completo",
    area: "laboratorio",
    amount: 85.0,
    paymentMethod: "tarjeta",
    status: "pendiente",
    date: "2026-05-08",
  },
  {
    id: "3",
    code: "PAG-003",
    patientId: "3",
    patientName: "Ana Lucía Hernández Paz",
    service: "Medicamentos",
    area: "farmacia",
    amount: 235.0,
    paymentMethod: "efectivo",
    status: "pagado",
    date: "2026-05-07",
    receiptNumber: "REC-2026-002",
  },
  {
    id: "4",
    code: "PAG-004",
    patientId: "4",
    patientName: "Roberto Antonio Sánchez Morales",
    service: "Electrocardiograma",
    area: "procedimiento",
    amount: 200.0,
    paymentMethod: "transferencia",
    status: "pendiente",
    date: "2026-05-08",
  },
]

// Mock System Users
export const systemUsers: SystemUser[] = [
  {
    id: "1",
    name: "Carlos Administrador",
    username: "admin",
    email: "admin@clinicapeten.com",
    role: "Administrador",
    status: "activo",
    lastAccess: "2026-05-08 08:30",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "María González",
    username: "admision",
    email: "admision@clinicapeten.com",
    role: "Admisión",
    status: "activo",
    lastAccess: "2026-05-08 07:45",
    permissions: ["ver_pacientes", "crear_pacientes", "editar_pacientes", "gestionar_citas"],
  },
  {
    id: "3",
    name: "Dr. Juan Pérez",
    username: "medico",
    email: "drperez@clinicapeten.com",
    role: "Médico",
    status: "activo",
    lastAccess: "2026-05-08 08:00",
    permissions: ["ver_pacientes", "ver_expediente", "crear_consulta", "generar_ordenes"],
  },
  {
    id: "4",
    name: "Ana Laboratorio",
    username: "laboratorio",
    email: "lab@clinicapeten.com",
    role: "Laboratorio",
    status: "activo",
    lastAccess: "2026-05-08 07:30",
    permissions: ["ver_ordenes_lab", "procesar_ordenes", "cargar_resultados"],
  },
  {
    id: "5",
    name: "Pedro Farmacia",
    username: "farmacia",
    email: "farmacia@clinicapeten.com",
    role: "Farmacia",
    status: "activo",
    lastAccess: "2026-05-08 08:15",
    permissions: ["gestionar_farmacia", "ver_recetas", "entregar_medicamentos"],
  },
  {
    id: "6",
    name: "Laura Caja",
    username: "caja",
    email: "caja@clinicapeten.com",
    role: "Caja",
    status: "activo",
    lastAccess: "2026-05-08 07:55",
    permissions: ["gestionar_caja", "registrar_pagos", "ver_reportes_caja"],
  },
  {
    id: "7",
    name: "Roberto Gerente",
    username: "gerencia",
    email: "gerencia@clinicapeten.com",
    role: "Gerencia",
    status: "activo",
    lastAccess: "2026-05-07 16:30",
    permissions: ["ver_reportes", "ver_auditoria", "configurar_sistema"],
  },
]

// Mock Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "2",
    userName: "María González",
    role: "Admisión",
    action: "Creó paciente",
    module: "Pacientes",
    dateTime: "2026-05-08 08:15:23",
    ipAddress: "192.168.1.100",
    details: "Paciente: Ana Lucía Hernández Paz (PAC-003)",
  },
  {
    id: "2",
    userId: "3",
    userName: "Dr. Juan Pérez",
    role: "Médico",
    action: "Finalizó consulta",
    module: "Consultas",
    dateTime: "2026-05-08 09:30:45",
    ipAddress: "192.168.1.101",
    details: "Paciente: María Elena García López",
  },
  {
    id: "3",
    userId: "4",
    userName: "Ana Laboratorio",
    role: "Laboratorio",
    action: "Cargó resultado",
    module: "Laboratorio",
    dateTime: "2026-05-08 10:12:33",
    ipAddress: "192.168.1.102",
    details: "Orden: LAB-004 - Creatinina",
  },
  {
    id: "4",
    userId: "6",
    userName: "Laura Caja",
    role: "Caja",
    action: "Registró pago",
    module: "Pagos",
    dateTime: "2026-05-08 10:45:12",
    ipAddress: "192.168.1.103",
    details: "Pago: Q150.00 - Consulta General",
  },
  {
    id: "5",
    userId: "1",
    userName: "Carlos Administrador",
    role: "Administrador",
    action: "Modificó usuario",
    module: "Usuarios",
    dateTime: "2026-05-08 11:20:00",
    ipAddress: "192.168.1.104",
    details: "Usuario: Pedro Farmacia - Actualizó permisos",
  },
]

// Mock Consultations
export const consultations: Consultation[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "María Elena García López",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    date: "2026-05-01",
    reason: "Control de diabetes",
    symptoms: "Mareos ocasionales, sed excesiva",
    vitalSigns: {
      bloodPressure: "130/85",
      heartRate: 78,
      temperature: 36.5,
      weight: 68,
      height: 165,
    },
    diagnosis: "Diabetes Mellitus Tipo 2 - Control inadecuado",
    treatment: "Metformina 850mg cada 12 horas",
    observations: "Se recomienda dieta baja en azúcares y ejercicio regular",
    nextAppointment: "2026-05-15",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Juan Carlos Méndez Ruiz",
    doctorId: "3",
    doctorName: "Dr. Juan Pérez",
    date: "2026-04-28",
    reason: "Control de hipertensión",
    symptoms: "Dolor de cabeza ocasional",
    vitalSigns: {
      bloodPressure: "145/95",
      heartRate: 82,
      temperature: 36.8,
      weight: 85,
      height: 175,
    },
    diagnosis: "Hipertensión Arterial Esencial - Grado I",
    treatment: "Losartán 50mg cada 24 horas",
    observations: "Reducir consumo de sal, ejercicio moderado",
    nextAppointment: "2026-05-12",
  },
]

// Dashboard statistics
export const dashboardStats = {
  patientsToday: 24,
  scheduledAppointments: 18,
  pendingLabOrders: 12,
  lowStockMedications: 3,
  todayIncome: 4850.0,
  ongoingConsultations: 2,
}

// Weekly attendance data for charts
export const weeklyAttendance = [
  { day: "Lun", consultas: 45, laboratorio: 28, farmacia: 35 },
  { day: "Mar", consultas: 52, laboratorio: 32, farmacia: 40 },
  { day: "Mié", consultas: 48, laboratorio: 25, farmacia: 38 },
  { day: "Jue", consultas: 55, laboratorio: 35, farmacia: 42 },
  { day: "Vie", consultas: 60, laboratorio: 40, farmacia: 48 },
  { day: "Sáb", consultas: 35, laboratorio: 20, farmacia: 25 },
]

// Income by area data for charts
export const incomeByArea = [
  { area: "Consultas", ingresos: 12500, color: "var(--chart-1)" },
  { area: "Laboratorio", ingresos: 8500, color: "var(--chart-2)" },
  { area: "Farmacia", ingresos: 15200, color: "var(--chart-3)" },
  { area: "Procedimientos", ingresos: 5800, color: "var(--chart-4)" },
]

// Appointment status data
export const appointmentStatusData = [
  { status: "Programadas", count: 8, color: "var(--chart-1)" },
  { status: "En espera", count: 3, color: "var(--chart-4)" },
  { status: "En consulta", count: 2, color: "var(--chart-2)" },
  { status: "Finalizadas", count: 12, color: "var(--chart-3)" },
  { status: "Canceladas", count: 1, color: "var(--destructive)" },
]

// Top services data
export const topServices = [
  { service: "Consulta General", count: 156 },
  { service: "Hemograma", count: 98 },
  { service: "Glucosa en ayunas", count: 87 },
  { service: "Perfil lipídico", count: 65 },
  { service: "Electrocardiograma", count: 42 },
]
