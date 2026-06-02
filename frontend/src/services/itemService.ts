import api from './api'
import type { Task } from '../types/task'

const URL = '/todolist/item'

export const getItems = async (limit = 10, offset = 0): Promise<{ data: Task[] }> => {
  const res = await api.get(`${URL}?limit=${limit}&offset=${offset}`)
  return res.data
}

export const getItemById = async (id: string): Promise<{ data: Task }> => {
  const res = await api.get(`${URL}/${id}`)
  return res.data
}

export const createItem = async (descripcion: string, fechaFinal: string | null): Promise<{ data: Task }> => {
  const res = await api.post(URL, { descripcion, fechaFinal })
  return res.data
}

export const patchItem = async (id: string, fields: Partial<Task>): Promise<{ data: Task }> => {
  const res = await api.patch(`${URL}/${id}`, fields)
  return res.data
}

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`${URL}/${id}`)
}