import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"
import { useState } from "react"
import config from "@/config";

export default function CreateFlashCardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);

    function handleFileChange(e:any) {
        setFile(e.target.files[0]);
    }

    function handleFileUpload() {
        if(file === null) {
            setFileError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('uploadFile', file);

        fetch(config.apiUrl + 'file/uploadfile?isPublic=' + isPublic, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => {
                console.error('There was a problem with the upload');
                setIsPendingUpload(false);
            });
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
                        <div className="text-white font-josefin font-bold mb-3 text-center mt-14">
                            {file !== null ? file.name : ''}
                        </div>
                        <div className="file-input-container">
                            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
                               
                            <div className="file-input-label">Choose a file</div>
                        </div>
                        
                        <div className="mt-16">
                            <button className="big-btn" onClick={handleFileUpload}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}