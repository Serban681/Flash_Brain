import Header from "@/components/GeneralComponents/Header"
import Image from "next/image"
import upload_icon from "@/images/upload_icon.svg"

export default function CreateFlashCardPage() {
    return (
        <div className="bg-blue w-full h-full">
            <Header />
            <div className="flex items-center h-full mt-[-8rem]">
                <div className="flex justify-center w-full">
                    <div className="flex justify-center flex-col w-60 items-center">
                        <Image className="w-14" src={upload_icon} alt=""  />
                        <h2 className="text-white text-xl font-josefin font-extrabold">Upload File</h2>
                        <p className="text-white font-josefin font-medium text-center mt-3">
                            Drag’n’drop files here. We accept .pdf, .txt and .docx that are less than 10mb.
                        </p>

                        <div className="mt-10">
                            <button className="bg-white">Select Files</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}