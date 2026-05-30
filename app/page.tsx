"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { DashboardPage } from "@/components/dashboard-page"
import { UsersPage } from "@/components/users-page"
import { RolesPage } from "@/components/roles-page"
import { AdmissionPage } from "@/components/admission-page"
import { AppointmentsPage } from "@/components/appointments-page"
import { MedicalRecordsPage } from "@/components/medical-records-page"
import { ConsultationPage } from "@/components/consultation-page"
import { OrdersPage } from "@/components/orders-page"
import { LaboratoryPage } from "@/components/laboratory-page"
import { PharmacyPage } from "@/components/pharmacy-page"
import { PaymentsPage } from "@/components/payments-page"
import { ReportsPage } from "@/components/reports-page"
import { AuditPage } from "@/components/audit-page"
import { ConfigurationPage } from "@/components/configuration-page"

export type PageType = 
  | "dashboard" 
  | "usuarios" 
  | "roles" 
  | "admision" 
  | "citas" 
  | "expedientes" 
  | "consulta" 
  | "ordenes" 
  | "laboratorio" 
  | "farmacia" 
  | "caja" 
  | "reportes" 
  | "auditoria" 
  | "configuracion"

interface NavigationContextType {
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
}

import { createContext, useContext } from "react"

export const NavigationContext = createContext<NavigationContextType | null>(null)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "usuarios":
        return <UsersPage />
      case "roles":
        return <RolesPage />
      case "admision":
        return <AdmissionPage />
      case "citas":
        return <AppointmentsPage />
      case "expedientes":
        return <MedicalRecordsPage />
      case "consulta":
        return <ConsultationPage />
      case "ordenes":
        return <OrdersPage />
      case "laboratorio":
        return <LaboratoryPage />
      case "farmacia":
        return <PharmacyPage />
      case "caja":
        return <PaymentsPage />
      case "reportes":
        return <ReportsPage />
      case "auditoria":
        return <AuditPage />
      case "configuracion":
        return <ConfigurationPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {renderPage()}
    </NavigationContext.Provider>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
