import Header from "@/components/GeneralComponents/Header"
import FlyerComponent from "@/components/ViewFlashCardPageComponent/Flyer"
import Image from "next/image"
import like_icon from "@/images/like_icon.svg"
import kangaroo_img from "@/images/kangaroo_img.png"
import arrow from "@/images/arrow.svg"

import { useEffect, useState } from "react"
import { Summary } from "@/utils/model/Summary"
import { Flashcard } from "@/utils/model/Flashcard"
import { User } from "@/utils/model/User"

export default function ViewFlashCardPage() {
    const [summary, setSummary] = useState<Summary | null>({
        summaryId: 1,
        title: 'Introduction to Machine Learning Algorithms',
        category_id: 1,
        ownerId: 1,
        isPublic: true,
        flashCard: [],
        likes: [28, 19, 40, 2, 67, 78]
    })
    const [flashcards, setFlashcards] = useState<Flashcard[]>([
        {
            flashCardId: 1,
            title: 'About C# Arrays',
            content: 'The concept of overfitting, where a network is unable to effectively learn, is introduced. The importance of reducing model complexity to prevent overfitting is explained. By reducing the number of parameters required to train, the network is less likely to overfit and can improve predictive performance.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1,
        },
        {
            flashCardId: 2,
            title: 'How it works',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium fringilla justo, non eleifend purus tincidunt ut. In hac habitasse platea dictumst. Vestibulum eget dui vel quam efficitur vestibulum. Sed ullamcorper tortor ac orci consectetur, vel facilisis lacus pulvinar. Suspendisse potenti. Fusce sit amet metus in dolor varius pellentesque at nec elit. Sed auctor, nunc sit amet cursus tempor, nulla ex volutpat turpis, ac hendrerit sem odio in velit. Vivamus ac tortor auctor, bibendum purus vel, pharetra purus. Etiam interdum, lacus eu viverra efficitur, tellus elit sodales neque, ac volutpat ligula metus ut lacus. Proin eu quam at risus dictum vestibulum. Duis facilisis justo in nulla convallis, a blandit diam venenatis.',	
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1,
        },
        {
            flashCardId: 3,
            title: "Introduction to Object-Oriented Programming",
            content: "Object-oriented programming (OOP) is a programming paradigm that uses objects to organize code. In OOP, each object can contain data in the form of fields and code in the form of procedures, often known as methods. This approach promotes code reuse, modularity, and a clear structure. Key principles include encapsulation, inheritance, and polymorphism.",
            imagePath: "https://ed8a-34-126-186-228.ngrok-free.app/Radu.png",
            summary_id: 1
        },
        {
            flashCardId: 4,
            title: "Working with REST APIs",
            content: "REST (Representational State Transfer) is an architectural style for designing networked applications. When working with REST APIs, you typically use standard HTTP methods such as GET, POST, PUT, and DELETE to perform operations on resources. JSON is commonly used for data representation. RESTful APIs are stateless and can be used for building scalable and maintainable web services.",
            imagePath: "https://ed8a-34-126-186-228.ngrok-free.app/Radu.png",
            summary_id: 1
        },
        {
            flashCardId: 5,
            title: 'The Basics of HTML and CSS',
            content: 'HTML and CSS are fundamental technologies for building web pages. This flashcard covers the basics of HTML structure and CSS styling, exploring how these languages work together to create visually appealing and structured web content.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        },
        {
            flashCardId: 6,
            title: 'Exploring SQL Queries',
            content: 'SQL (Structured Query Language) is crucial for managing and retrieving data from relational databases. This flashcard provides an overview of SQL queries, covering SELECT statements, filtering data, and basic database operations.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        },
        {
            flashCardId: 7,
            title: 'Understanding the MVC Architecture',
            content: 'The Model-View-Controller (MVC) architecture is a design pattern widely used in software development. This flashcard explains the key components of MVC and how they contribute to building scalable and maintainable applications.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        },
        {
            flashCardId: 8,
            title: 'Introduction to Machine Learning Algorithms',
            content: 'Machine learning algorithms are the backbone of predictive modeling. This flashcard introduces various types of machine learning algorithms, including supervised learning, unsupervised learning, and reinforcement learning.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        },
        {
            flashCardId: 9,
            title: 'Getting Started with Git and Version Control',
            content: 'Git is a powerful version control system used in software development. This flashcard covers the basics of Git, including repository management, branching, and collaboration using platforms like GitHub.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        },
        {
            flashCardId: 10,
            title: 'The Importance of Cybersecurity',
            content: 'Cybersecurity is crucial for protecting digital assets and sensitive information. This flashcard discusses the importance of cybersecurity measures, common threats, and best practices for ensuring online security.',
            imagePath: 'https://ed8a-34-126-186-228.ngrok-free.app/Radu.png',
            summary_id: 1
        }  
    ])
    const [owner, setOwner] = useState<User>({
        id: 1,
        email: 'hau@gmail.com',
        password: '123456',
        username: 'Hau2478)_lulz'
    })



    const [isLiked, setIsLiked] = useState<boolean>(false)

    const [imageActive, setImageActive] = useState<boolean>(false)
    const [curIndex, setCurIndex] = useState<number>(0)

    const [curContent, setCurContent] = useState<string>(flashcards[0]?.content!)
    const [imagePath, setCurImagePath] = useState<string>(flashcards[0]?.imagePath!)

    const imgActiveStyle = 'absolute border-8 border-white right-[7rem] bottom-[2rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'
    const imgPasiveStyle = 'absolute border-8 border-white right-[-25rem] bottom-[7rem] cursor-pointer z-10 shadow-default transition-all duration-500 ease-in-out hover:scale-105'

    const likeThePost = () => {
        setIsLiked(!isLiked)
        // setSummary({ likes: [summary?.likes, ], ...summmary })
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
                        <p className="text-white font-josefin font-bold mb-10 mt-20">{(curIndex * 5) + 1}-{(curIndex * 5) + 1 +4} of {flashcards.length}</p>

                        <div className="mb-96 mr-40">
                            {   
                                flashcards && flashcards.map((flashCard, index) => {
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

                            <div dangerouslySetInnerHTML={{ __html: addTagsAfterPeriods(curContent) }} />

                            <div className="flex justify-between mt-7">
                                <div className="flex mt-10">
                                    <div className="mr-1 text-[1.3rem]">{summary?.likes.length}</div>
                                    <Image className="w-6 hover:scale-110 cursor-pointer" src={isLiked ? '' : like_icon} alt="" />
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
                <Image width={400} height={300} className="h-72 w-[30rem] object-cover" src={imagePath} alt=""  />
            </div>
        </div>
    )
}