import Header from "@/components/GeneralComponents/Header"
import FlyerComponent from "@/components/ViewFlashCardPageComponent/Flyer"
import Image from "next/image"
import like_icon from "@/images/like_icon.svg"
import kangaroo_img from "@/images/kangaroo_img.png"
import { useState } from "react"

export default function ViewFlashCardPage() {
    const [imageActive, setImageActive] = useState<boolean>(false)

    const imgActiveStyle = 'absolute border-8 border-white right-[7rem] bottom-[2rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'
    const imgPasiveStyle = 'absolute border-8 border-white right-[-25rem] bottom-[7rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'

    const parts = [
        'About C# Arrays',
        'abou L stuff',
        'about big stuff',
        'this will work',
        'this should worl',
    ]

    return (
        <div className="bg-blue w-full h-full relative">
            <Header />
            <div className="flex items-center min-h-[calc(100vh-11.75rem)]">
                <div className="flex justify-center w-full">
                    <div className="flex justify-center flex-col w-60 items-center">
                        <p className="text-white font-josefin font-bold mb-10 relative mt-20">1-5 of 26</p>
                        <div className="mb-96 mr-40">
                            {   
                                parts && parts.map((part, index) => {
                                    if(index === 0) return ( <FlyerComponent key={index} degree={0} color={'yellow'} move={{up: 0, right: 0}} id={index} /> )
                                    else if(index <= 2) {
                                        if(index === 1) return ( <FlyerComponent key={index} degree={10} color={'green'} move={{up: 0, right: 10}} id={index} /> )
                                        else return ( <FlyerComponent key={index} degree={-10} color={'green'} move={{up: 0, right: -10}} id={index} /> )
                                    }
                                    else {
                                        if(index === 3) return ( <FlyerComponent key={index} degree={20} color={'black'} move={{up: 1.5, right: 20}} id={index} /> )
                                        else return ( <FlyerComponent key={index} degree={-20} color={'black'} move={{up: 1.5, right: -20}} id={index} /> )
                                    }
                                })
                            }  
                        </div>
                        <div className="w-[50rem] h-96 bg-[var(--light-blue)] z-10 mb-20 shadow-default text-white font-semibold font-josefin p-8">
                            <p className="mb-10">To: HipnotizedPixel2819</p>

                            <p>In C#, an array is a data structure that allows you to store multiple values of the same data type in a single variable. Arrays are useful when you want to store a collection of items of the same type, such as a list of numbers, names, or any other data.</p><br />

                            <p>Array elements are accessed using an index, starting from 0. For example, to access the first element of the numbers array:</p>

                            <div className="flex justify-between mt-7">
                                <div className="flex mt-10">
                                    <div className="mr-1 text-[1.3rem]">28</div>
                                    <Image className="w-6" src={like_icon} alt="" />
                                </div>
                                <div className="mt-5 text-right">
                                    <p>Happy Learning,</p>
                                    <p>LLM Bot</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={imageActive ? imgActiveStyle : imgPasiveStyle} onClick={() => setImageActive(!imageActive)} >
                <Image className="h-72 w-[30rem] object-cover" src={kangaroo_img} alt=""  />
            </div>
        </div>
    )
}