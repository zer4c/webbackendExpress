import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '../components/panel/Panel'
import DriveList from '../components/driveList/DriveList'
import DriveItem from '../components/driveItem/DriveItem'
import { getFiles, uploadFile } from '../services/driveService'
import type { DriveFile } from '../types/drive'

function PantallaDrive() {
  const [files, setFiles] = useState<DriveFile[]>([])
  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null)
  const navigate = useNavigate()

  const FetchFiles = async () => {
    getFiles().then((data) => setFiles(data.data)).catch((err) => console.error(err))
  }

  useEffect(() => { FetchFiles() }, [])

  const UploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        await uploadFile(reader.result as string)
        FetchFiles()
      } catch (err) {
        console.error(err)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div className="topbar">
        <button onClick={() => navigate('/todolist')}>TodoList</button>
      </div>
      <section className="panels">
        <Panel>
          <DriveList files={files} onSelectFile={setSelectedFile} onUpload={UploadFile} />
        </Panel>
        <Panel>
          <DriveItem file={selectedFile} onRefresh={FetchFiles} onClearSelection={() => setSelectedFile(null)} />
        </Panel>
      </section>
    </div>
  )
}

export default PantallaDrive