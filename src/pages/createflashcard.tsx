import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"

export default function CreateFlashCardPage() {
    return (
        <div className="bg-blue w-full h-full">
            <Header />
            <div>
                <Image className="w-20" src={upload_icon} alt="" />
                <h2>Upload File</h2>
            </div>
        </div>
    )
}