import AccountCircle from '@/images/account_circle.svg'
import Image from 'next/image'
import router from 'next/router'

export default function AvatarComponent() {
    const handleClick = () => {
        router.push('/login')
    }

    return (
        <div>
            <Image className='w-10 mr-5 cursor-pointer' src={AccountCircle} alt='' onClick={handleClick} />
        </div>   
    )
}