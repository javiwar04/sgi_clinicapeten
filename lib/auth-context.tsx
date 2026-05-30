"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "admin" | "admision" | "medico" | "laboratorio" | "farmacia" | "caja" | "gerencia"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin123",
    user: {
      id: "1",
      name: "Carlos Administrador",
      email: "admin@clinicapeten.com",
      role: "admin",
    },
  },
  admision: {
    password: "admision123",
    user: {
      id: "2",
      name: "María González",
      email: "admision@clinicapeten.com",
      role: "admision",
    },
  },
  medico: {
    password: "medico123",
    user: {
      id: "3",
      name: "Dr. Juan Pérez",
      email: "drperez@clinicapeten.com",
      role: "medico",
    },
  },
  laboratorio: {
    password: "lab123",
    user: {
      id: "4",
      name: "Ana Laboratorio",
      email: "lab@clinicapeten.com",
      role: "laboratorio",
    },
  },
  farmacia: {
    password: "farmacia123",
    user: {
      id: "5",
      name: "Pedro Farmacia",
      email: "farmacia@clinicapeten.com",
      role: "farmacia",
    },
  },
  caja: {
    password: "caja123",
    user: {
      id: "6",
      name: "Laura Caja",
      email: "caja@clinicapeten.com",
      role: "caja",
    },
  },
  gerencia: {
    password: "gerencia123",
    user: {
      id: "7",
      name: "Roberto Gerente",
      email: "gerencia@clinicapeten.com",
      role: "gerencia",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    const mockUser = mockUsers[username.toLowerCase()]
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Role labels in Spanish
export const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  admision: "Admisión",
  medico: "Médico",
  laboratorio: "Laboratorio",
  farmacia: "Farmacia",
  caja: "Caja",
  gerencia: "Gerencia",
}
