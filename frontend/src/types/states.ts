export const TaskState = {
  PENDIENTE: 'pendiente',
  COMPLETADO: 'completado',
} as const

export type TaskState = typeof TaskState[keyof typeof TaskState]