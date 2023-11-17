import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"
import { useState } from "react"

export default function CreateFlashCardPage() {
    const [file, setFile] = useState<any>(null)

    function handleFileChange(e:any) {
        setFile(e.target.files[0])
    }

    return (
        <div className="bg-blue w-full h-full ">
            <Header />
            <div className="flex items-center min-h-[calc(100vh-11.75rem)]">
                <div className="flex justify-center w-full">
                    <div className="flex justify-center flex-col w-60 items-center">
                        <Image className="w-14" src={upload_icon} alt=""  />
                        <h2 className="text-white text-xl font-josefin font-extrabold">Upload File</h2>
                        <p className="text-white font-josefin font-medium text-center mt-3">
                            Upload files here. We accept .pdf, .txt and .docx that are less than 10mb.
                        </p>
                        <div className="file-input-container mt-10">
                            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
                            <div className="selected-file-name ml-7 mb-3" id="selectedFileName">{file !== null ? file.name : ''}</div>
                            <div className="file-input-label">Choose a file</div>
                        </div>
                        
                        <div className="mt-10">
                            <button className="bg-white">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}