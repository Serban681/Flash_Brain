import AccountCircle from '@/images/account_circle.svg'
import Image from 'next/image'
import router from 'next/router'
import UserDropdown from "@/components/GeneralComponents/UserDropdown";
import {use, useEffect, useState} from "react";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";

export default function AvatarComponent() {

    const [isHidden ,setIsHidden] = useState(true)
    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();

    const handleClick = () => {
        if(!isLoggedIn) router.push('/login');
        else setIsHidden(!isHidden);
    }

    return (
        <div>
            <Image className='w-10 mr-5 cursor-pointer' src={AccountCircle} alt='' onClick={handleClick} />
            <UserDropdown
                isHidden={isHidden}
                setIsHidden = {setIsHidden}
                userInformation={userInformation}>
            </UserDropdown>
        </div>   
    )
}