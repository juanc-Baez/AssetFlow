"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmpleadoFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  errorMessage?: string
}

export function EmpleadoForm({ initialData, onSubmit, errorMessage }: EmpleadoFormProps) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    email: initialData?.email || "",
    telefono: initialData?.telefono || "",
    departamento: initialData?.departamento || "",
    cargo: initialData?.cargo || "",
    fechaContratacion: initialData?.fechaContratacion || "",
    salarioBase: initialData?.salarioBase || 0,
    horasExtra: initialData?.horasExtra || 0,
    deducciones: initialData?.deducciones || 0,
    impuestos: initialData?.impuestos || 0,
    bonificaciones: initialData?.bonificaciones || 0,
    estado: initialData?.estado || "ACTIVO",
    tipoContrato: initialData?.tipoContrato || "PERMANENTE",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const departamentos = [
    { label: "Tecnología", value: "TECNOLOGIA" },
    { label: "Recursos Humanos", value: "RECURSOS_HUMANOS" },
    { label: "Ventas", value: "VENTAS" },
    { label: "Marketing", value: "MARKETING" },
    { label: "Finanzas", value: "FINANZAS" },
    { label: "Operaciones", value: "OPERACIONES" },
    { label: "Administración", value: "ADMINISTRACION" },
    { label: "Legal", value: "LEGAL" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-2 rounded-md border border-gray-200 bg-white shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {/* Mensaje de error justo debajo del campo email, con asterisco rojo y font más pequeño */}
        {errorMessage && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-red-600 text-base leading-none">*</span>
            <span className="text-red-600 text-xs leading-none">{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          id="telefono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="departamento">Departamento</Label>
          <Select
            value={formData.departamento}
            onValueChange={(value) => setFormData({ ...formData, departamento: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar departamento" />
            </SelectTrigger>
            <SelectContent>
              {departamentos.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo</Label>
        <Input
          id="cargo"
          value={formData.cargo}
          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fechaContratacion">Fecha de Ingreso</Label>
        <Input
          id="fechaContratacion"
          type="date"
          value={formData.fechaContratacion}
          onChange={(e) => setFormData({ ...formData, fechaContratacion: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salarioBase">Salario Base</Label>
        <Input
          id="salarioBase"
          type="number"
          value={formData.salarioBase}
          onChange={(e) => setFormData({ ...formData, salarioBase: Number(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="horasExtra">Horas Extra</Label>
        <Input
          id="horasExtra"
          type="number"
          value={formData.horasExtra}
          onChange={(e) => setFormData({ ...formData, horasExtra: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deducciones">Deducciones</Label>
        <Input
          id="deducciones"
          type="number"
          value={formData.deducciones}
          onChange={(e) => setFormData({ ...formData, deducciones: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="impuestos">Impuestos</Label>
        <Input
          id="impuestos"
          type="number"
          value={formData.impuestos}
          onChange={(e) => setFormData({ ...formData, impuestos: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bonificaciones">Bonificaciones</Label>
        <Input
          id="bonificaciones"
          type="number"
          value={formData.bonificaciones}
          onChange={(e) => setFormData({ ...formData, bonificaciones: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Select
          value={formData.estado}
          onValueChange={(value) => setFormData({ ...formData, estado: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVO">Activo</SelectItem>
            <SelectItem value="INACTIVO">Inactivo</SelectItem>
            <SelectItem value="SUSPENDIDO">Suspendido</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
        <Select
          value={formData.tipoContrato}
          onValueChange={(value) => setFormData({ ...formData, tipoContrato: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PERMANENTE">Permanente</SelectItem>
            <SelectItem value="TEMPORAL">Temporal</SelectItem>
            <SelectItem value="POR_HORAS">Por horas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        {initialData ? "Actualizar Empleado" : "Crear Empleado"}
      </Button>
    </form>
  )
}
