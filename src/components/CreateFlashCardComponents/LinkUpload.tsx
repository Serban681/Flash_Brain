import youtube_icon from "@/images/youtube_icon.svg"
import Image from "next/image";
import {useState} from "react";
import router from "next/router";
import process from "process";

export default function LinkUpload(props: any) {

    const setIsLoading = props.setIsLoading;
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [btnText, setBtnText] = useState<string>('Generate');

    const [infoText, setInfoText] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const [link, setLink] = useState<string>('');

    function handleButtonClick() {
        if(btnText === 'Generate') {
            handleGenerateFromYoutubeLink();
        } else {
            router.push(`/`);
        }
    }
    function handleGenerateFromYoutubeLink() {
        if(link === '') {
            setErrorText('Please enter a link');
            return;
        }
        setIsLoading(true);
        setErrorText('')
        setInfoText('Generating summary...')

        const requestBody = {
            url: link
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + '/summary/video?isPublic=' + isPublic, {
            method: 'POST',
            headers: {
                "Origin":process.env.NEXT_PUBLIC_ORIGIN!,
                "Authorization": "Bearer " + localStorage.getItem('jwtToken'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('There was a problem with the process.');
                } else {
                    setIsLoading(false);
                    setBtnText('Go to main page');
                    setInfoText('You will receive an email when your summary is ready.');
                    return response.json();
                }
            })
            .catch(() => {
                setErrorText("The process failed.");
                setInfoText('');
                setIsLoading(false);
            });
    }

    return (
        <div className="w-80 box-border flex flex-col items-center mt-8" style={{height:"32rem"}}>
            <Image className="w-14" src={youtube_icon} alt="youtube"/>
            <p className="text-white font-josefin font-medium text-center mt-3 mb-4 w-48 " style={{}}>Paste any YouTube video link and we will summarize it for you!</p>
            <input className="w-full h-8 pb-4 pt-4 pl-1 pr-1 outline-0 text-white placeholder-gray-200 font-medium"
                   type="text"
                   placeholder="Youtube link"
                   style={{backgroundColor:"#5A94BB", border:"2px solid #5A94BB"}}
                   value={link}
                   onChange={(e) => setLink(e.target.value)}
            />
            <div className="mt-16">
                <button className="big-btn mb-5" id="reduced-padding" onClick={handleButtonClick}>{btnText}</button>
            </div>
            <div className="flex flex-row items-center mb-5">
                <input type='checkbox' checked={isPublic} onChange={() => setIsPublic(!isPublic)} className="mr-1"/>
                <span className="text-white font-josefin font-bold">Public summary</span>
            </div>
            {infoText && <div className="text-white font-josefin font-bold text-center mt-2">{infoText}</div>}
            {errorText && <div className="text-red-500 text-center font-josefin font-bold mt-2">{"⚠ " + errorText}</div>}
        </div>
    )
}