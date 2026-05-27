export interface Task {
  id: string
  descripcion: string
  estado: string
  fechaCreacion: string
  fechaFinal: string | null
}