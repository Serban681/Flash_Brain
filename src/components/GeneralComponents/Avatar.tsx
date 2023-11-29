import AccountCircle from '@/images/account_circle.svg'
import Image from 'next/image'
import router from 'next/router'
import UserDropdown from "@/components/GeneralComponents/UserDropdown";
import {useState} from "react";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import gravatar from 'gravatar';

export default function AvatarComponent() {

    const [isHidden ,setIsHidden] = useState(true)
    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);

    const handleClick = () => {
        if(!isLoggedIn) router.push('/login');
        else setIsHidden(!isHidden);
    }

    const gravatarUrl = !isPendingLoggedIn && isLoggedIn ? gravatar.url(!!userInformation ? userInformation.email : '' , {protocol: 'http', s: '40'}) : ''

    return (
        <div>
            {
                !isPendingLoggedIn && !!isLoggedIn ? 
                    <Image className='w-9 mr-5 cursor-pointer rounded-full' src={gravatarUrl} alt='User Avatar' width={40} height={40} onClick={handleClick} />
                    :
                    <Image className='w-10 mr-5 cursor-pointer' src={AccountCircle} alt='' onClick={handleClick} />
            }

            <UserDropdown
                isHidden={isHidden}
                setIsHidden = {setIsHidden}
                userInformation={userInformation}>
            </UserDropdown>
        </div>   
    )
}