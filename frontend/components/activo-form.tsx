"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ActivoFormProps {
  initialData?: any
  onSubmit: (data: any) => void
}

export function ActivoForm({ initialData, onSubmit }: ActivoFormProps) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    tipo: initialData?.tipo || "",
    fechaAdquisicion: initialData?.fechaAdquisicion || "",
    valorInicial: initialData?.valorInicial || "",
    valorActual: initialData?.valorActual || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      valorInicial: Number.parseFloat(formData.valorInicial),
      valorActual: Number.parseFloat(formData.valorActual),
    })
  }

  const tiposActivo = [
    "Equipo de Cómputo",
    "Equipo de Oficina",
    "Mobiliario",
    "Vehículo",
    "Maquinaria",
    "Herramientas",
    "Otros",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre del Activo</Label>
        <Input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo de Activo</Label>
        <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            {tiposActivo.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fechaAdquisicion">Fecha de Adquisición</Label>
        <Input
          id="fechaAdquisicion"
          type="date"
          value={formData.fechaAdquisicion}
          onChange={(e) => setFormData({ ...formData, fechaAdquisicion: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="valorInicial">Valor Inicial</Label>
        <Input
          id="valorInicial"
          type="number"
          step="0.01"
          value={formData.valorInicial}
          onChange={(e) => setFormData({ ...formData, valorInicial: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="valorActual">Valor Actual</Label>
        <Input
          id="valorActual"
          type="number"
          step="0.01"
          value={formData.valorActual}
          onChange={(e) => setFormData({ ...formData, valorActual: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Actualizar Activo" : "Crear Activo"}
      </Button>
    </form>
  )
}
