"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, Save, Users } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
}

const allPermissions = [
  { id: "ver_pacientes", label: "Ver pacientes", category: "Pacientes" },
  { id: "crear_pacientes", label: "Crear pacientes", category: "Pacientes" },
  { id: "editar_pacientes", label: "Editar pacientes", category: "Pacientes" },
  { id: "ver_expediente", label: "Ver expediente clínico", category: "Expedientes" },
  { id: "crear_consulta", label: "Crear consulta", category: "Consultas" },
  { id: "generar_ordenes", label: "Generar órdenes médicas", category: "Órdenes" },
  { id: "ver_resultados_lab", label: "Ver resultados de laboratorio", category: "Laboratorio" },
  { id: "procesar_lab", label: "Procesar órdenes de laboratorio", category: "Laboratorio" },
  { id: "gestionar_farmacia", label: "Gestionar farmacia", category: "Farmacia" },
  { id: "entregar_medicamentos", label: "Entregar medicamentos", category: "Farmacia" },
  { id: "gestionar_caja", label: "Gestionar caja", category: "Caja" },
  { id: "registrar_pagos", label: "Registrar pagos", category: "Caja" },
  { id: "ver_reportes", label: "Ver reportes", category: "Reportes" },
  { id: "exportar_reportes", label: "Exportar reportes", category: "Reportes" },
  { id: "administrar_usuarios", label: "Administrar usuarios", category: "Sistema" },
  { id: "ver_auditoria", label: "Ver auditoría", category: "Sistema" },
  { id: "configurar_sistema", label: "Configurar sistema", category: "Sistema" },
]

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acceso completo al sistema",
    userCount: 1,
    permissions: allPermissions.map((p) => p.id),
  },
  {
    id: "2",
    name: "Admisión",
    description: "Registro y gestión de pacientes y citas",
    userCount: 1,
    permissions: ["ver_pacientes", "crear_pacientes", "editar_pacientes", "ver_expediente"],
  },
  {
    id: "3",
    name: "Médico",
    description: "Atención médica y consultas",
    userCount: 1,
    permissions: [
      "ver_pacientes",
      "ver_expediente",
      "crear_consulta",
      "generar_ordenes",
      "ver_resultados_lab",
    ],
  },
  {
    id: "4",
    name: "Laboratorio",
    description: "Procesamiento de órdenes y resultados",
    userCount: 1,
    permissions: ["ver_pacientes", "ver_resultados_lab", "procesar_lab"],
  },
  {
    id: "5",
    name: "Farmacia",
    description: "Gestión de medicamentos y entregas",
    userCount: 1,
    permissions: ["ver_pacientes", "gestionar_farmacia", "entregar_medicamentos"],
  },
  {
    id: "6",
    name: "Caja",
    description: "Cobros y facturación",
    userCount: 1,
    permissions: ["ver_pacientes", "gestionar_caja", "registrar_pagos", "ver_reportes"],
  },
  {
    id: "7",
    name: "Gerencia",
    description: "Supervisión y reportes",
    userCount: 1,
    permissions: ["ver_pacientes", "ver_expediente", "ver_reportes", "exportar_reportes", "ver_auditoria"],
  },
]

const permissionCategories = [...new Set(allPermissions.map((p) => p.category))]

export function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0])
  const [hasChanges, setHasChanges] = useState(false)

  const togglePermission = (permissionId: string) => {
    if (!selectedRole) return

    const updatedPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter((p) => p !== permissionId)
      : [...selectedRole.permissions, permissionId]

    const updatedRole = { ...selectedRole, permissions: updatedPermissions }
    setSelectedRole(updatedRole)
    setHasChanges(true)
  }

  const saveChanges = () => {
    if (!selectedRole) return

    setRoles((prev) =>
      prev.map((role) => (role.id === selectedRole.id ? selectedRole : role))
    )
    setHasChanges(false)
  }

  const selectAllInCategory = (category: string, select: boolean) => {
    if (!selectedRole) return

    const categoryPermissions = allPermissions
      .filter((p) => p.category === category)
      .map((p) => p.id)

    let updatedPermissions: string[]
    if (select) {
      updatedPermissions = [...new Set([...selectedRole.permissions, ...categoryPermissions])]
    } else {
      updatedPermissions = selectedRole.permissions.filter(
        (p) => !categoryPermissions.includes(p)
      )
    }

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions })
    setHasChanges(true)
  }

  return (
    <MainLayout title="Roles y Permisos">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles del Sistema
            </CardTitle>
            <CardDescription>
              Seleccione un rol para ver y editar sus permisos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role)
                    setHasChanges(false)
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedRole?.id === role.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{role.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {role.userCount}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                  <p className="text-xs text-primary mt-1">
                    {role.permissions.length} permisos
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Permisos: {selectedRole?.name || "Seleccione un rol"}
                </CardTitle>
                <CardDescription>
                  {selectedRole?.description || "Configure los permisos del rol seleccionado"}
                </CardDescription>
              </div>
              {hasChanges && (
                <Button onClick={saveChanges}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedRole ? (
              <div className="space-y-6">
                {permissionCategories.map((category) => {
                  const categoryPermissions = allPermissions.filter(
                    (p) => p.category === category
                  )
                  const allSelected = categoryPermissions.every((p) =>
                    selectedRole.permissions.includes(p.id)
                  )
                  const someSelected = categoryPermissions.some((p) =>
                    selectedRole.permissions.includes(p.id)
                  )

                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{category}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => selectAllInCategory(category, !allSelected)}
                        >
                          {allSelected ? "Deseleccionar todo" : "Seleccionar todo"}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-muted/50 border">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={selectedRole.permissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <label
                              htmlFor={permission.id}
                              className="text-sm cursor-pointer"
                            >
                              {permission.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Seleccione un rol para ver sus permisos
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
