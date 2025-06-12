"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ActivoForm } from "@/components/activo-form"
import { AsignarActivoForm } from "@/components/asignar-activo-form"
import { Plus, Search, Edit, Trash2, UserPlus } from "lucide-react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/config"
// Define the Empleado interface here or import it from a types file
interface Empleado {
  id: number
  nombre: string
  apellido: string
  // add other fields as needed
}

interface Activo {
  id: number
  nombre: string
  tipo: string
  fechaAdquisicion: string
  valorInicial: number
  valorActual: number
  empleadoId?: number
}

export default function ActivosPage() {
  const [activos, setActivos] = useState<Activo[]>([])
  const [filteredActivos, setFilteredActivos] = useState<Activo[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedActivo, setSelectedActivo] = useState<Activo | null>(null)
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const asignarDialogRef = useRef<HTMLDivElement | null>(null)

  // Datos de ejemplo - reemplazar con llamadas a tu API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/activo/obtActivos`)
      .then((response) => {
        setActivos(response.data)
        setFilteredActivos(response.data)
      })
      .catch((error) => {
        console.error("Error al obtener los activos:", error)
        setActivos([])
        setFilteredActivos([])
      })
  }, [])

  // Cargar empleados al montar
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/empleado/obtEmpleados`)
      .then((response) => setEmpleados(response.data))
      .catch(() => setEmpleados([]))
  }, [])

  useEffect(() => {
    const filtered = activos.filter(
      (activo) =>
        activo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activo.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredActivos(filtered)
  }, [searchTerm, activos])

const handleCreateActivo = async (activoData: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/activo/crear`,
      activoData
    )
    setActivos([...activos, response.data])
    setIsCreateDialogOpen(false)
  } catch (error) {
    console.error("Error al crear activo:", error)
  }
}

const handleUpdateActivo = async (activoData: any) => {
  if (selectedActivo) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/activo/actualizar/${selectedActivo.id}`,
        activoData
      )
      const updatedActivos = activos.map((activo) =>
        activo.id === selectedActivo.id ? response.data : activo
      )
      setActivos(updatedActivos)
      setIsEditDialogOpen(false)
      setSelectedActivo(null)
    } catch (error) {
      console.error("Error al actualizar activo:", error)
    }
  }
}

const handleDeleteActivo = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/activo/eliminar/${id}`)
    setActivos(activos.filter((activo) => activo.id !== id))
  } catch (error) {
    console.error("Error al eliminar activo:", error)
  }
}
const handleAssignActivo = async (activoId: number, empleadoId: number) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/activo/asignar/${activoId}/${empleadoId}`
    )
    const updatedActivos = activos.map((activo) =>
      activo.id === activoId ? response.data : activo
    )
    setActivos(updatedActivos)
    setIsAssignDialogOpen(false)
    setSelectedActivo(null)
  } catch (error) {
    console.error("Error al asignar activo:", error)
  }
}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Activos</h1>
          <p className="text-muted-foreground">Administra todos los activos empresariales</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Activo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Activo</DialogTitle>
            </DialogHeader>
            <ActivoForm onSubmit={handleCreateActivo} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Activos</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar activos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Adquisición</TableHead>
                <TableHead>Valor Inicial</TableHead>
                <TableHead>Valor Actual</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivos.map((activo) => (
                <TableRow key={activo.id}>
                  <TableCell className="font-medium">{activo.nombre}</TableCell>
                  <TableCell>{activo.tipo}</TableCell>
                  <TableCell>{new Date(activo.fechaAdquisicion).toLocaleDateString()}</TableCell>
                  <TableCell>${activo.valorInicial.toLocaleString()}</TableCell>
                  <TableCell>${activo.valorActual.toLocaleString()}</TableCell>
                  <TableCell>
                    {activo.empleadoId ? (
                      (() => {
                        const emp = empleados.find((e) => e.id === activo.empleadoId)
                        return emp ? (
                          <Badge variant="secondary">{emp.nombre} {emp.apellido}</Badge>
                        ) : (
                          <Badge variant="outline">Empleado no encontrado</Badge>
                        )
                      })()
                    ) : (
                      <Badge variant="outline">Sin asignar</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedActivo(activo)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedActivo(activo)
                          setIsAssignDialogOpen(true)
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteActivo(activo.id)}>
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

      {/* Dialog para editar activo */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Activo</DialogTitle>
          </DialogHeader>
          {selectedActivo && <ActivoForm initialData={selectedActivo} onSubmit={handleUpdateActivo} />}
        </DialogContent>
      </Dialog>

      {/* Dialog para asignar activo */}
      <Dialog open={isAssignDialogOpen} onOpenChange={(open) => {
    setIsAssignDialogOpen(open)
    if (open) {
      // Forzar recarga de empleados al abrir el diálogo
      axios.get(`${API_BASE_URL}/empleado/obtEmpleados`).then((response) => setEmpleados(response.data)).catch(() => setEmpleados([]))
    }
  }}>
        <DialogContent className="max-w-md" ref={asignarDialogRef}>
          <DialogHeader>
            <DialogTitle>Asignar Activo a Empleado</DialogTitle>
          </DialogHeader>
          {selectedActivo && <AsignarActivoForm activo={selectedActivo} onSubmit={handleAssignActivo} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
