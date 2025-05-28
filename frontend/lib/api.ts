// Configuración base para las llamadas a tu API de Spring Boot
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Métodos para Activos
  async getActivos() {
    return this.request("/activo/obtActivos")
  }

  async createActivo(activo: any) {
    return this.request("/activo/crear", {
      method: "POST",
      body: JSON.stringify(activo),
    })
  }

  async updateActivo(id: number, activo: any) {
    return this.request(`/activo/actualizar/${id}`, {
      method: "PUT",
      body: JSON.stringify(activo),
    })
  }

  async deleteActivo(id: number) {
    return this.request(`/activo/eliminar/${id}`, {
      method: "DELETE",
    })
  }

  async asignarActivo(activoId: number, empleadoId: number) {
    return this.request(`/activo/asignar/${activoId}/${empleadoId}`, {
      method: "PUT",
    })
  }

  // Métodos para Empleados
  async getEmpleados() {
    return this.request("/empleado/obtEmpleados")
  }

  async getEmpleadoById(id: number) {
    return this.request(`/empleado/${id}`)
  }

  async getEmpleadoByApellido(apellido: string) {
    return this.request(`/empleado/apellido?apellido=${apellido}`)
  }

  async createEmpleado(empleado: any) {
    return this.request("/empleado/crear", {
      method: "POST",
      body: JSON.stringify(empleado),
    })
  }

  async updateEmpleado(id: number, empleado: any) {
    return this.request(`/empleado/actualizar/${id}`, {
      method: "PUT",
      body: JSON.stringify(empleado),
    })
  }

  async deleteEmpleado(id: number) {
    return this.request(`/empleado/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiService = new ApiService()
