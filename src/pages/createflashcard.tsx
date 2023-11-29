import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"
import {useEffect, useState} from "react"
import config from "@/config";
import LoadingComponent from "@/components/GeneralComponents/LoadingComponent";
// @ts-ignore
import Cookies from "js-cookie";
import router from "next/router";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";

export default function CreateFlashCardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [btnText, setBtnText] = useState<string>('Upload');
    const [createdId, setCreatedId] = useState<number>(0);
    const {isLoggedIn, isPending} = useCheckLoggedIn(0);

    useEffect(() => {
        if(!isLoggedIn && !isPending) router.push('/login');
    }, [isLoggedIn, isPending]);

    function handleFileChange(e:any) {
        setFile(e.target.files[0]);
    }

    const handleClick = () => {
        if(btnText === 'Upload') {
            handleFileUpload();
        } else {
            router.push(`/viewflashcard/${createdId}`)
        }
    }

    function handleFileUpload() {
        if(file === null) {
            setFileError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('uploadFile', file);
        setIsLoading(true);

        fetch(config.apiUrl + '/file/uploadfile?isPublic=' + isPublic, {
            method: 'POST',
            headers: {
                "Origin":config.origin,
                "Authorization": "Bearer " + Cookies.get('jwtToken')
            },
            body: formData
        })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            } else {
                setIsLoading(false);
                setBtnText('View Summary');
                await response.json().then(data => {
                    setCreatedId(data.summaryId);
                });
            }
        })
        .catch((error) => {
            console.error('There was a problem with the upload');
            setIsPendingUpload(false);
            setIsLoading(false);
        });
    }

    return (
        <div className="bg-blue w-full h-full ">
            <Header />
            <LoadingComponent loading={isLoading} />
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
                            <button className="big-btn" id="reduced-padding" onClick={handleClick}>{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}