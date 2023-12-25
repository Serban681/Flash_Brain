import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"
import {useEffect, useState} from "react"
import LoadingComponent from "@/components/GeneralComponents/LoadingComponent";
import router from "next/router";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import LinkUpload from "@/components/CreateFlashCardComponents/LinkUpload";
import process from "process";

export default function CreateFlashCardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [btnText, setBtnText] = useState<string>('Generate');
    const {isLoggedIn, isPending} = useCheckLoggedIn(0);

    const [infoText, setInfoText] = useState<string>('');
    const [isYoutubeSelected, setIsYoutubeSelected] = useState<boolean>(false);

    useEffect(() => {
        if(!isLoggedIn && !isPending) router.push('/login');
    }, [isLoggedIn, isPending]);

    function handleFileChange(e:any) {
        setFile(e.target.files[0]);
    }

    const handleClick = () => {
        if(btnText === 'Generate') {
            handleFileUpload();
        } else {
            router.push(`/`)
        }
    }

    function handleFileUpload() {
        setFileError('');
        setInfoText('')
        if(!file) {
            setFileError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('upload_file', file);
        setIsLoading(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + '/summary/file?isPublic=' + isPublic, {
            method: 'POST',
            headers: {
                "Origin":process.env.NEXT_PUBLIC_ORIGIN!,
                "Authorization": "Bearer " + localStorage.getItem('jwtToken')
            },
            body: formData
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('There was a problem with the upload.');
            } else {
                setIsLoading(false);
                setBtnText('Go to main page');
                setInfoText('You will receive an email when your summary is ready.');
                return response.json();
            }
        })
        .catch(() => {
            setFileError("Upload failed.");
            setIsLoading(false);
        });
    }

    return (
        <div className="bg-blue w-full h-full ">
            <LoadingComponent loading={isLoading} />
            <Header />
            <div className="flex items-center min-h-[calc(100vh-11.75rem)]">
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="mb-4 mt-4">
                        <button
                            className={!isYoutubeSelected ? "generationMethodButton generationMethodButtonSelected" : "generationMethodButton"}
                            onClick={() => setIsYoutubeSelected(false)}
                        >Document</button>
                        <button
                            className={isYoutubeSelected ? "generationMethodButton generationMethodButtonSelected" : "generationMethodButton"}
                            onClick={() => setIsYoutubeSelected(true)}
                        >Youtube</button>
                    </div>
                    {!isYoutubeSelected && <div className="flex justify-center flex-col items-center" style={{height:"34rem"}}>
                        <Image className="w-14" src={upload_icon} alt="upload"  />
                        <h2 className="text-white text-xl font-josefin font-extrabold">Upload File</h2>
                        <p className="text-white font-josefin font-medium text-center mt-3 w-48">
                            Upload files here. We accept .pdf, .txt and .docx that are less than 10mb.
                        </p>
                        <div className="text-white font-josefin font-bold mb-3 text-center mt-14">
                            {file ? file.name : ''}
                        </div>
                        <div className="file-input-container">
                            <input type="file" id="fileInput" accept=".pdf" className="file-input" onChange={handleFileChange} />
                               
                            <div className="file-input-label">Choose a file</div>
                            {fileError && <div className="text-red-500 text-center font-josefin font-bold mt-2">{"⚠ " + fileError}</div>}
                        </div>
                        
                        <div className="mt-16">
                            <button className="big-btn mb-5" id="reduced-padding" onClick={handleClick}>{btnText}</button>
                        </div>
                        <div className="flex flex-row items-center mb-5">
                            <input type='checkbox' checked={isPublic} onChange={() => setIsPublic(!isPublic)} className="mr-1"/>
                            <span className="text-white font-josefin font-bold">Public summary</span>
                        </div>
                        {infoText && <div className="text-white font-josefin font-bold text-center mt-2">{infoText}</div>}
                    </div>}
                    {isYoutubeSelected && <LinkUpload setIsLoading={setIsLoading}></LinkUpload>}
                </div>
            </div>
        </div>
    )
}
