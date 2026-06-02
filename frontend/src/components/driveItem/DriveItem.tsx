import type { DriveFile } from '../../types/drive'
import { deleteFile } from '../../services/driveService'
import './DriveItem.css'

interface DriveItemProps {
  file: DriveFile | null
  onRefresh: () => void
  onClearSelection: () => void
}

function DriveItem({ file, onRefresh, onClearSelection }: DriveItemProps) {
  if (!file) return <p className="DriveItem-empty">Selecciona un archivo para ver opciones.</p>

  const DownloadFile = () => {
    const [meta, data] = file.bytes.split(',')
    const mime = meta.match(/:(.*?);/)?.[1] ?? 'application/octet-stream'
    const byteChars = atob(data)
    const byteArray = new Uint8Array(byteChars.length)
    for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i)
    const blob = new Blob([byteArray], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.id
    a.click()
    URL.revokeObjectURL(url)
  }

  const DeleteFile = async () => {
    if (!confirm('¿Está seguro de eliminar este archivo?')) return
    try {
      await deleteFile(file.id)
      onClearSelection()
      onRefresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="DriveItem-detail">
      <section className="Options">
        <button onClick={DownloadFile}>Descargar</button>
        <button onClick={DeleteFile}>Eliminar</button>
      </section>
    </div>
  )
}

export default DriveItem