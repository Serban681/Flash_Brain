import AvatarComponent from "./Avatar";
import LogoComponent from "./Logo";
import Image from "next/image";
import AddImage from "@/images/plus.svg";
import router from "next/router";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";

export default function Header() {
    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);

    const goToCreateFlashCardPage = () => {
        if(!isPendingLoggedIn && isLoggedIn) {
            router.push('/createflashcard')
        } 
    }

    return (
        <div className="inline flex justify-between text-white w-full items-center pt-5">
            <div className={`${!isPendingLoggedIn && isLoggedIn ? 'opacity-100 cursor-pointer' : 'opacity-0' }`}>
                <Image onClick={goToCreateFlashCardPage} src={AddImage} alt="" className="ml-0 h-10" />
            </div>
            <LogoComponent />
            <AvatarComponent />
        </div>
    )
}