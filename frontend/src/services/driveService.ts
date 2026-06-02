import api from './api'
import type { DriveFile } from '../types/drive'

const URL = '/drive'

export const getFiles = async (limit = 10, offset = 0): Promise<{ data: DriveFile[] }> => {
  const res = await api.get(`${URL}?limit=${limit}&offset=${offset}`)
  return res.data
}

export const uploadFile = async (bytes: string): Promise<{ data: DriveFile }> => {
  const res = await api.post(URL, { bytes })
  return res.data
}

export const deleteFile = async (id: string): Promise<void> => {
  await api.delete(`${URL}/${id}`)
}