"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { systemUsers, type SystemUser } from "@/lib/mock-data"
import { Edit, Eye, MoreHorizontal, Plus, Search, UserX, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const permissions = [
  { id: "ver_pacientes", label: "Ver pacientes" },
  { id: "crear_pacientes", label: "Crear pacientes" },
  { id: "editar_pacientes", label: "Editar pacientes" },
  { id: "ver_expediente", label: "Ver expediente clínico" },
  { id: "crear_consulta", label: "Crear consulta" },
  { id: "generar_ordenes", label: "Generar órdenes médicas" },
  { id: "ver_resultados_lab", label: "Ver resultados de laboratorio" },
  { id: "gestionar_farmacia", label: "Gestionar farmacia" },
  { id: "gestionar_caja", label: "Gestionar caja" },
  { id: "ver_reportes", label: "Ver reportes" },
  { id: "administrar_usuarios", label: "Administrar usuarios" },
]

export function UsersPage() {
  const [users, setUsers] = useState<SystemUser[]>(systemUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    status: true,
    permissions: [] as string[],
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleCreateUser = () => {
    const newUser: SystemUser = {
      id: String(users.length + 1),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      status: formData.status ? "activo" : "inactivo",
      lastAccess: "-",
      permissions: formData.permissions,
    }
    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
      status: true,
      permissions: [],
    })
  }

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "activo" ? "inactivo" : "activo" }
          : user
      )
    )
  }

  return (
    <MainLayout title="Gestión de Usuarios">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-xs text-muted-foreground">Total usuarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.status === "activo").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Usuarios activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <UserX className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.status === "inactivo").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Usuarios inactivos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Roles definidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg">Usuarios del Sistema</CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                      Complete los datos del nuevo usuario del sistema
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Ej: Juan Pérez"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Usuario</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                          }
                          placeholder="Ej: jperez"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Ej: jperez@clinica.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          placeholder="********"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData({ ...formData, role: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                            <SelectItem value="Admisión">Admisión</SelectItem>
                            <SelectItem value="Médico">Médico</SelectItem>
                            <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                            <SelectItem value="Farmacia">Farmacia</SelectItem>
                            <SelectItem value="Caja">Caja</SelectItem>
                            <SelectItem value="Gerencia">Gerencia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Estado</Label>
                        <div className="flex items-center gap-2 h-10">
                          <Switch
                            checked={formData.status}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, status: checked })
                            }
                          />
                          <span className="text-sm">
                            {formData.status ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Permisos asignados</Label>
                      <div className="grid grid-cols-2 gap-2 p-4 border rounded-lg bg-muted/50">
                        {permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
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
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateUser}>Crear Usuario</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, usuario o correo..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Admisión">Admisión</SelectItem>
                  <SelectItem value="Médico">Médico</SelectItem>
                  <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                  <SelectItem value="Farmacia">Farmacia</SelectItem>
                  <SelectItem value="Caja">Caja</SelectItem>
                  <SelectItem value="Gerencia">Gerencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último acceso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.lastAccess}
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsViewDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              {user.status === "activo" ? "Desactivar" : "Activar"}
                            </DropdownMenuItem>
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

        {/* View User Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle del Usuario</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usuario</p>
                    <p className="font-medium">{selectedUser.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Correo</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rol</p>
                    <p className="font-medium">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <StatusBadge status={selectedUser.status} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último acceso</p>
                    <p className="font-medium">{selectedUser.lastAccess}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Permisos</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {p === "all" ? "Todos los permisos" : p.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
