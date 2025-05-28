"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

interface AsignarActivoFormProps {
  activo: any
  onSubmit: (activoId: number, empleadoId: number) => void
}

export function AsignarActivoForm({ activo, onSubmit }: AsignarActivoFormProps) {
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<string>("")
  const [empleados, setEmpleados] = useState<any[]>([])

  // Cargar empleados disponibles
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/empleado/obtEmpleados`)
        setEmpleados(response.data)
      } catch (error) {
        console.error("Error al obtener empleados:", error)
      }
    }
    fetchEmpleados()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEmpleadoId) {
      onSubmit(activo.id, Number.parseInt(selectedEmpleadoId))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Activo a Asignar</Label>
        <div className="p-3 bg-muted rounded-md">
          <p className="font-medium">{activo.nombre}</p>
          <p className="text-sm text-muted-foreground">{activo.tipo}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="empleado">Seleccionar Empleado</Label>
        <Select value={selectedEmpleadoId} onValueChange={setSelectedEmpleadoId}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar empleado" />
          </SelectTrigger>
          <SelectContent>
            {empleados.map((empleado) => (
              <SelectItem key={empleado.id} value={empleado.id.toString()}>
                {empleado.nombre} {empleado.apellido}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={!selectedEmpleadoId}>
        Asignar Activo
      </Button>
    </form>
  )
}
