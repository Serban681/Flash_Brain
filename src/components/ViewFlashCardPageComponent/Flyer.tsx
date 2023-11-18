
import { use } from "react"
import { useEffect } from "react"

export default function FlyerComponent({ degree, color, move, id } : { degree: number, color: string, move: { up: number, right: number }, id: number }) {
    const darkColor = color === 'yellow' ? 'dark-yellow' : color === 'green' ? 'dark-green' : 'dark-black'

    const style = {
        transform: `rotate(${degree}deg) translateX(${move.right}rem) translateY(-${move.up}rem) scale(1)`,
        backgroundColor: `var(--${color})`,
        // zIndex: `${Math.floor(10 / (id + 1))}`,
    };

    const childStyle = {
        backgroundColor: `var(--${darkColor})`
    };

    return (
        <div className="hover:scale-110 hover:-translate-y-5 transition-all ease-in-out">
            <div className="absolute shadow-default cursor-pointer h-96 w-44" style={style}>  
                <div className="rounded-full w-4 h-4 bg-blue absolute top-2 left-2" />
                <div>
                    <div className="text-white font-josefin font-bold mt-12 flex justify-center">
                        <div className='w-32 p-4 text-center' style={childStyle}>
                            About C# Arrays
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}