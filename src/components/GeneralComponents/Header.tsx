import AvatarComponent from "./Avatar";
import LogoComponent from "./Logo";
import Image from "next/image";
import AddImage from "@/images/plus.svg";
import HeartImage from "@/images/liked_icon.svg";
import router from "next/router";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";

export default function Header() {
    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();

    const goToCreateFlashCardPage = () => {
        if(!isPendingLoggedIn && isLoggedIn) {
            router.push('/createflashcard')
        } 
    }

    return (
        <div className="inline flex justify-between text-white w-full items-center pt-5">
            <div className={`${!isPendingLoggedIn && isLoggedIn ? 'opacity-100 cursor-pointer' : 'opacity-0' }`}>
                <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                    <Image onClick={goToCreateFlashCardPage} src={AddImage} alt="" className="ml-5 h-10" />
                </div>
            </div>
            
            <LogoComponent />
            <AvatarComponent />
        </div>
    )
}