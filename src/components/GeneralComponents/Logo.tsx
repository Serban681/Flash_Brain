import router from 'next/router'

export default function LogoComponent() {
    const handleClick = () => {
        router.push('/')
    }
    
    return (
        <h1 className="font-fredoka text-2xl text-white font-bold cursor-pointer" onClick={() => handleClick()}>#FlashBrain</h1>        
    )
}