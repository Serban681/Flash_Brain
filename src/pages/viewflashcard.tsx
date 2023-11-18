import Header from "@/components/GeneralComponents/Header"
import FlyerComponent from "@/components/ViewFlashCardPageComponent/Flyer"
import Image from "next/image"
import like_icon from "@/images/like_icon.svg"
import kangaroo_img from "@/images/kangaroo_img.png"
import arrow from "@/images/arrow.svg"

import { useState } from "react"

export default function ViewFlashCardPage() {
    const [imageActive, setImageActive] = useState<boolean>(false)
    const [ curIndex, setCurIndex ] = useState<number>(0)

    const imgActiveStyle = 'absolute border-8 border-white right-[7rem] bottom-[2rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'
    const imgPasiveStyle = 'absolute border-8 border-white right-[-25rem] bottom-[7rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'

    const parts = [
        'About C# Arrays',
        'abou L stuff',
        'about big stuff',
        'this will work',
        'this should worl',
        'this will work',
        'this should worl',
        'this will work',
        'this should worl',
        'this will work',
        'this should worl',
        'this will work',
        'this should worl',
        'this will work',
        'this should worl',
    ]

    // const [summary, setSummary] = useState()

    const nextFive = () => {
        if(((parts.length + 1) / 5) % 5 - 1 > curIndex + 1) {
            setCurIndex(curIndex + 1)
        }
    }

    const prevFive = () => {
        if(curIndex > 0) {
            setCurIndex(curIndex - 1)
        }
    }

    const addTagsAfterPeriods = (str: string) => {
        var sentences = str.split('.');

        var resultString = '<p>' + sentences.join('</p><br><p>') + '</p>';

        return resultString;
    }

    return (
        <div className="bg-blue w-full h-full relative">
            <Header />
            <div className="flex items-center min-h-[calc(100vh-11.75rem)]">
                <div className="flex justify-center w-full">
                    <div className="flex justify-center flex-col w-60 items-center relative">
                        <p className="text-white font-josefin font-bold mb-10 mt-20">{(curIndex * 5) + 1}-{(curIndex * 5) + 1 +4} of {parts.length}</p>

                        <div className="mb-96 mr-40">
                            {   
                                parts && parts.map((part, index) => {
                                    if(index <= 1) { if(index === 0) return ( <FlyerComponent key={index} degree={20} color={'black'} move={{up: 1.5, right: 20}} id={index} /> )
                                        else return ( <FlyerComponent key={index} degree={-20} color={'black'} move={{up: 1.5, right: -20}} id={index} /> )
                                    }
                                    
                                    else if(index <= 3) {
                                        if(index === 2) return ( <FlyerComponent key={index} degree={10} color={'green'} move={{up: 0, right: 10}} id={index} /> )
                                        else return ( <FlyerComponent key={index} degree={-10} color={'green'} move={{up: 0, right: -10}} id={index} /> )
                                    }
                                    else {
                                        return ( <FlyerComponent key={index} degree={0} color={'yellow'} move={{up: 0, right: 0}} id={index} /> )
                                    }
                                })
                            }  
                        </div>
                        <div className="w-[50rem] h-96 bg-[var(--light-blue)] z-10 mb-20 shadow-default text-white font-semibold font-josefin p-8">
                            <p className="mb-10">To: HipnotizedPixel2819</p>

                            <div dangerouslySetInnerHTML={{ __html: addTagsAfterPeriods('The concept of overfitting, where a network is unable to effectively learn, is introduced. The importance of reducing model complexity to prevent overfitting is explained. By reducing the number of parameters required to train, the network is less likely to overfit and can improve predictive performance.') }} />

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

            <Image onClick={prevFive} className="absolute left-10 bottom-1/2 hover:scale-110 cursor-pointer w-8 rotate-180" src={arrow} alt='' />
            <Image onClick={nextFive} className="absolute right-10 bottom-1/2 hover:scale-110 cursor-pointer w-8" src={arrow} alt='' />

            <div className={imageActive ? imgActiveStyle : imgPasiveStyle} onClick={() => setImageActive(!imageActive)} >
                <Image className="h-72 w-[30rem] object-cover" src={kangaroo_img} alt=""  />
            </div>
        </div>
    )
}