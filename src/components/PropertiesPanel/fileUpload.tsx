import { useEffect, useState } from "react"
import Dropzone from "react-dropzone";
import UploadService from '../../services/upload-files';

export const FileUpload = () => {
    const [ selectedFiles, setSelectedFiles ] = useState() as any
    const [ currentFile, setCurrentFile ] = useState() as any
    const [ progress, setProgress ] = useState(0)
    const [ message, setMessage ] = useState('')
    const [ fileInfos, setFileInfos ] = useState([])

    useEffect(() => {
        // UploadService.getFiles().then((response: any) => {
        //     setFileInfos( response.data )
        // });
    }, [])

    const upload = () => {
        let currentFile = selectedFiles[0];
    
        setProgress(0)
        setCurrentFile( currentFile )
    
        UploadService.upload(currentFile, (event: any) => {
            setProgress( Math.round((100 * event.loaded) / event.total) )
        }).then((response: any) => {
            // setMessage( response.data.message )
            // return UploadService.getFiles();
        })
        .then((files: any) => {
            setFileInfos( files.data )
        })
        .catch(() => {
            setProgress(0)
            setMessage('Could not upload the file!')
            setCurrentFile( undefined )
        });
    
        setSelectedFiles( undefined )
    }
    
    const onDrop = (files: any) => {
        if (files.length > 0) {
            setSelectedFiles( files )
        }
    }

    return (
        <div>
            {currentFile && (
            <div className="progress mb-3">
                <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={progress}
                    style={{ width: progress + '%' }}
                >
                    {progress}%
                </div>
            </div>
            )}

            <Dropzone onDrop={onDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            {selectedFiles && selectedFiles[0].name ? (
                                <div className="selected-file">
                                    {selectedFiles && selectedFiles[0].name}
                                </div>
                            ) : (
                                'Drag and drop file here, or click to select file'
                            )}
                        </div>

                        <aside className="selected-file-wrapper">
                            <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={!selectedFiles}
                                onClick={upload}
                            >
                                Upload
                            </button>
                        </aside>
                    </section>
                )}
            </Dropzone>

            <div className="alert alert-light" role="alert">
                {message}
            </div>

            {fileInfos.length > 0 && (
                <div className="card">
                    <div className="card-header">List of Files</div>

                    <ul className="list-group list-group-flush">
                        {fileInfos.map((file: any, index: number) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
      </div>
    )
}