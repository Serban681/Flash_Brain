import Header from "@/components/GeneralComponents/Header"
import FlyerComponent from "@/components/ViewFlashCardPageComponent/Flyer"
import Image from "next/image"
import like_icon from "@/images/like_icon.svg"
import arrow from "@/images/arrow.svg"

import { useRouter} from "next/router"

import { useEffect, useState } from "react"
import { Summary } from "@/utils/model/Summary"
import { Flashcard } from "@/utils/model/Flashcard"
import { User } from "@/utils/model/User"
import useCheckLoggedIn from "@/utils/useCheckLoggedIn"
import thumbs_up from "@/images/thumbs_up.svg"

import useFetchSingleSummary from "@/utils/useFetchSingleSummary"

export default function ViewFlashCardPage() {
    const router = useRouter()
    const { id } = router.query
    const numberId = Number(id)

    const {error:errorGettingSummary, isPending:summaryPending, summary} = useFetchSingleSummary(numberId);

    // const [summary, setSummary] = useState<Summary | null>()
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [owner, setOwner] = useState<User>({
        // id: 1,
        email: 'hau@gmail.com',
        password: '123456',
        username: 'Hau2478)_lulz'
    })

    const {isLoggedIn, isPending, userInformation} = useCheckLoggedIn();

    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [imageActive, setImageActive] = useState<boolean>(false)
    const [curIndex, setCurIndex] = useState<number>(0)

    const [curContent, setCurContent] = useState<string | null | undefined>(flashcards && flashcards[0]?.content)
    const [imagePath, setCurImagePath] = useState<string | null | undefined>(flashcards && flashcards[0]?.imagePath!)

    const imgActiveStyle = 'absolute border-8 border-white right-[7rem] bottom-[2rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'
    const imgPasiveStyle = 'absolute border-8 border-white right-[-25rem] bottom-[7rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'

    useEffect(() => {
        setFlashcards(summary?.flashCards!)

        setCurContent(flashcards && flashcards[0]?.content)
        setCurImagePath(flashcards && flashcards[0]?.imagePath!)

        console.log(imagePath)
    }, [summary, flashcards])

    const likeThePost = () => {
        // if(!isLoggedIn && !isPending) {
        //     router.push('/login')
        //     return
        // }  

        // if(isLiked) {
        //     const newLikes = summary!.likes.filter(id => id !== userInformation?.id)

        //     setSummary({ likes: newLikes, ...summary! })
        // }
        
        // if(!isLiked) {
        //     const newLikes = [...summary!.likes, userInformation?.id!]

        //     setSummary({ likes: newLikes, ...summary! })
        // }

        // setIsLiked(!isLiked)
        
    }

    const setCurrentFlashcard = (id: number) => {
        const curFlashCard = flashcards.find(flashcard => flashcard.flashCardId === id)

        setCurContent(curFlashCard?.content!)
        setCurImagePath(curFlashCard?.imagePath!)
    }

    const nextFive = () => {
        if(((flashcards.length + 1) / 5) % 5 - 1 > curIndex + 1) {
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

        var resultString = '<p>' + sentences.join('.</p><br><p>') + '</p>';

        return resultString;
    }

    return (
        <div className="bg-blue w-full h-full relative">
            <Header />
            <div className="flex items-center min-h-[calc(100vh-11.75rem)]">
                <div className="flex justify-center w-full">
                    <div className="flex justify-center flex-col w-60 items-center relative">
                        {!!flashcards && <p className="text-white font-josefin font-bold mb-10 mt-20">{(curIndex * 5) + 1}-{(curIndex * 5) + 1 +4} of {flashcards.length}</p>}
                        <div className="mb-96 mr-40">
                            {   
                                !!flashcards &&  flashcards.map((flashCard, index) => {
                                    if(index >= curIndex * 5 && index <= curIndex * 5 + 4) {
                                        if(index % 5 <= 1) { 
                                            if(index % 5 === 0) return ( <FlyerComponent key={index} degree={20} color={'black'} move={{up: 1.5, right: 20}} title={flashCard.title} id={flashCard.flashCardId} setCurrentFlashcard={setCurrentFlashcard} /> )
                                            else return ( <FlyerComponent key={index} degree={-20} color={'black'} move={{up: 1.5, right: -20}} title={flashCard.title} id={flashCard.flashCardId} setCurrentFlashcard={setCurrentFlashcard} /> )
                                        }
                                        
                                        else if(index % 5 <= 3) {
                                            if(index % 5 === 2) return ( <FlyerComponent key={index} degree={10} color={'green'} move={{up: 0, right: 10}} title={flashCard.title} id={flashCard.flashCardId} setCurrentFlashcard={setCurrentFlashcard} /> )
                                            else return ( <FlyerComponent key={index} degree={-10} color={'green'} move={{up: 0, right: -10}} title={flashCard.title} id={flashCard.flashCardId} setCurrentFlashcard={setCurrentFlashcard} /> )
                                        }
                                        else if(index % 5 === 4) {
                                            return ( <FlyerComponent key={index} degree={0} color={'yellow'} move={{up: 0, right: 0}} title={flashCard.title} id={flashCard.flashCardId} setCurrentFlashcard={setCurrentFlashcard} /> )
                                        }   
                                    }
                                })
                            }  
                        </div>
                        <div className="w-[50rem] h-96 bg-[var(--light-blue)] z-10 mb-20 shadow-default text-white font-semibold font-josefin p-8 overflow-auto">
                            <p className="mb-10">To: {owner.username}</p>

                            {!!curContent && <div dangerouslySetInnerHTML={{ __html: addTagsAfterPeriods(curContent) }} />}

                            <div className="flex justify-between mt-7">
                                <div className="flex mt-10">
                                    <div className="mr-1 text-[1.3rem]">{summary?.likes?.length}</div>
                                    <Image onClick={() => likeThePost()} className="w-6 hover:scale-110 cursor-pointer" src={isLiked ? thumbs_up : like_icon} alt="" />
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
            
            {
                !!imagePath && 
                <div className={imageActive ? imgActiveStyle : imgPasiveStyle} onClick={() => setImageActive(!imageActive)} >
                    <Image width={400} height={300} className="h-[17rem] w-[30rem] object-cover" src={'https://9939-35-240-128-142.ngrok-free.app/' + imagePath} alt=""  />
                </div>
            }
            
        </div>
    )
}