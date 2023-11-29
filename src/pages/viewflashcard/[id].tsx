import Header from "@/components/GeneralComponents/Header"
import FlyerComponent from "@/components/ViewFlashCardPageComponent/Flyer"
import Image from "next/image"
import like_icon from "@/images/like_icon.svg"
import arrow from "@/images/arrow.svg"
import { useRouter} from "next/router"
import { useEffect, useState } from "react"
import { Flashcard } from "@/utils/model/Flashcard"
import useCheckLoggedIn from "@/utils/useCheckLoggedIn"
import thumbs_up from "@/images/thumbs_up.svg"
import useFetchSingleSummary from "@/utils/useFetchSingleSummary"
import useFetchSingleUser from "@/utils/useFetchSingleUser";
import useFetchLikedSummaries from "@/utils/useFetchLikedSummaries";
import config from "@/config";
// @ts-ignore
import Cookies from "js-cookie";

export default function ViewFlashCardPage() {
    const router = useRouter()
    const { id } = router.query
    const numberId = Number(id);

    //get the summary
    const {error:errorGettingSummary, isPending:summaryPending, summary} = useFetchSingleSummary(numberId);
    //get the owner of the summary
    const {error:errorGettingOwner, isPending:ownerPending, user:owner} = useFetchSingleUser(summary?.ownerId);
    //check logged-in status
    const {isLoggedIn, isPending, userInformation} = useCheckLoggedIn(0);
    //get the liked summaries of the current user
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
        setLikeCount(summary?.likes?.length!);
    }, [summary]);

    let {
        error,
        isPending:isPendingLikedSummaries,
        summaryList: likedSummaryList,
        setSummaryList
    } = useFetchLikedSummaries(isLoggedIn);


    const [isLiked, setIsLiked] = useState<boolean>(false);
    //check if the current summary is in the list of liked summaries of the current user
    useEffect(() => {
        if(likedSummaryList) {
            likedSummaryList.forEach((likedSummary) =>{
                if(likedSummary.summaryId === summary?.summaryId) {
                    setIsLiked(true);
                }
            })
        }
    }, [likedSummaryList, summary]);

    const likeThePost = () => {
        if(!isLoggedIn) {
            router.push('/login');
            return;
        }
        if(isLiked) {
            fetch(config.apiUrl + "/like/" + summary?.summaryId,
                {method: 'DELETE',
                    headers: {"Origin":config.origin,
                        "Authorization": "Bearer " + Cookies.get('jwtToken')}}
            )
                .then(res => {
                    if(!res.ok) throw Error("Couldn't remove like from summary");
                    setIsLiked(false);
                    setLikeCount(likeCount - 1);
                })
                .catch((e) => {
                    console.log(e.message);
                })
        }
        else {
            fetch(config.apiUrl + "/like/" + summary?.summaryId,
                {method: 'GET',
                    headers: {"Origin":config.origin,
                        "Authorization": "Bearer " + Cookies.get('jwtToken')}}
            )
                .then(res => {
                    if(!res.ok) throw Error("Couldn't like post");
                    setIsLiked(true);
                    setLikeCount(likeCount + 1);
                })
                .catch((e) => {
                    console.log(e.message);
                })
        }
    }

    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

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

    }, [summary, flashcards])

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
        return '<p>' + sentences.join('.</p><br><p>') + '</p>';
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
                        <div className="w-[50rem] h-96 bg-[var(--light-blue)] z-10 mb-20 shadow-default text-white font-semibold font-josefin p-8 overflow-auto rounded-sm">
                            <p className="mb-10">To: {owner ? owner.username : ''}</p>

                            {!!curContent && <div dangerouslySetInnerHTML={{ __html: addTagsAfterPeriods(curContent) }} />}

                            <div className="flex justify-between mt-7">
                                <div className="flex mt-10">
                                    <div className="mr-1 text-[1.3rem]">{likeCount}</div>
                                    <Image onClick={() => likeThePost()} className="w-6 mb-2 hover:scale-110 cursor-pointer" src={isLiked ? thumbs_up : like_icon} alt="" />
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
                    <Image width={400} height={300} className="h-[17rem] w-[30rem] object-cover" src={'http://fd72-34-32-181-95.ngrok-free.app/' + imagePath} alt=""  />
                </div>
            }
            
        </div>
    )
}