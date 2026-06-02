import type { DriveFile } from '../../types/drive'
import './DriveList.css'

interface DriveListProps {
  files: DriveFile[]
  onSelectFile: (file: DriveFile) => void
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function DriveList({ files, onSelectFile, onUpload }: DriveListProps) {
  return (
    <div className="DriveList">
      <div className="header">
        <h2>Drive</h2>
        <label>
          Subir archivo
          <input type="file" onChange={onUpload} style={{ display: 'none' }} />
        </label>
      </div>
      {files.map((file) => (
        <button className="item" key={file.id} onClick={() => onSelectFile(file)}>
          {file.id}
        </button>
      ))}
    </div>
  )
}

export default DriveList