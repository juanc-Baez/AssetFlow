"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EmpleadoForm } from "@/components/empleado-form"
import { Plus, Search, Edit, Trash2, User } from "lucide-react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/config"

interface Activo {
  id: number
  nombre: string
  tipo: string
  valorInicial: number
  fechaAdquisicion: string
  valorActual: number
}
interface Empleado {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  departamento: string
  cargo: string
  fechaContratacion: string
  activos?: Activo[]
}

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [filteredEmpleados, setFilteredEmpleados] = useState<Empleado[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

useEffect(() => {
    axios
      .get(`${API_BASE_URL}/empleado/obtEmpleados`)
      .then((response) => {
        setEmpleados(response.data)
        setFilteredEmpleados(response.data)
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error)
        setEmpleados([])
        setFilteredEmpleados([])
      })
  }, [])


  useEffect(() => {
    const filtered = empleados.filter(
      (empleado) =>
        empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empleado.departamento.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEmpleados(filtered)
  }, [searchTerm, empleados])

const handleCreateEmpleado = async (empleadoData: any) => {
  setErrorMessage("")
  try {
    const response = await axios.post(
      `${API_BASE_URL}/empleado/crear`,
      empleadoData
    )
    setEmpleados([...empleados, response.data])
    setIsCreateDialogOpen(false)
  } catch (error: any) {
    let duplicate = false
    if (error.response && error.response.status === 500) {
      // Manejo robusto para error de email duplicado
      const data = error.response.data
      // Buscar el texto en cualquier parte del objeto o string
      const dataString = typeof data === "string" ? data : JSON.stringify(data)
      if (dataString.includes("Duplicate entry") && dataString.includes("UKnihg474u49g6e8aolp4lwrj6e")) {
        duplicate = true
      }
    }
    if (duplicate) {
      setErrorMessage("El email ya está registrado. Usa uno diferente.")
    } else {
      setErrorMessage("Error al crear empleado. Intenta nuevamente.")
    }
    console.error("Error al crear empleado:", error)
  }
}
  
const handleUpdateEmpleado = async (empleadoData: any) => {
  if (selectedEmpleado) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/empleado/actualizar/${selectedEmpleado.id}`,
        empleadoData
      )
      const updatedEmpleados = empleados.map((empleado) =>
        empleado.id === selectedEmpleado.id ? response.data : empleado
      )
      setEmpleados(updatedEmpleados)
      setIsEditDialogOpen(false)
      setSelectedEmpleado(null)
    } catch (error) {
      console.error("Error al actualizar empleado:", error)
    }
  }
}
const handleDeleteEmpleado = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/empleado/${id}`)
    setEmpleados(empleados.filter((empleado) => empleado.id !== id))
  } catch (error) {
    console.error("Error al eliminar empleado:", error)
  }
}
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Empleados</h1>
          <p className="text-muted-foreground">Administra la información de todos los empleados</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Empleado</DialogTitle>
            </DialogHeader>
            <EmpleadoForm onSubmit={handleCreateEmpleado} errorMessage={errorMessage} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empleados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          {errorMessage && (
            <div className="text-red-600 font-semibold mt-2">{errorMessage}</div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Fecha Ingreso</TableHead>
                <TableHead>Activos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {empleado.nombre} {empleado.apellido}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{empleado.email}</TableCell>
                  <TableCell>{empleado.telefono}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatDepartamento(empleado.departamento)}
                    </Badge>
                  </TableCell>
                  <TableCell>{empleado.cargo}</TableCell>
                  <TableCell>{new Date(empleado.fechaContratacion).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {empleado.activos && empleado.activos.length > 0
                        ? empleado.activos.map((a) => a.nombre).join(", ")
                        : "Sin activos"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedEmpleado(empleado)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEmpleado(empleado.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para editar empleado */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
          </DialogHeader>
          {selectedEmpleado && <EmpleadoForm initialData={selectedEmpleado} onSubmit={handleUpdateEmpleado} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function formatDepartamento(depto: string) {
  // Mapea los valores del backend a nombres con mayúscula inicial y acentos
  const map: Record<string, string> = {
    TECNOLOGIA: "Tecnología",
    RECURSOS_HUMANOS: "Recursos Humanos",
    VENTAS: "Ventas",
    MARKETING: "Marketing",
    FINANZAS: "Finanzas",
    OPERACIONES: "Operaciones",
    ADMINISTRACION: "Administración",
    LEGAL: "Legal",
  };
  return map[depto] || depto.charAt(0).toUpperCase() + depto.slice(1).toLowerCase();
}
