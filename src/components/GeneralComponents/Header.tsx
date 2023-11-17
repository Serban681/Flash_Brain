import AvatarComponent from "./Avatar";
import LogoComponent from "./Logo";
import Image from "next/image";
import AddImage from "@/images/plus.svg";
import router from "next/router";

export default function Header() {
    const goToCreateFlashCardPage = () => {
        router.push('/createflashcard')
    }

    return (
        <div className="flex justify-between text-white w-full items-center pt-5">
            <Image onClick={goToCreateFlashCardPage} src={AddImage} alt="" className="ml-5 h-10 cursor-pointer" />
            <LogoComponent />
            <AvatarComponent />
        </div>
    )
}