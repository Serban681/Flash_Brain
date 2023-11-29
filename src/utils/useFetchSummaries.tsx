import {useEffect, useState} from "react";
import config from "../config";
import {Summary} from "@/utils/model/Summary";

function useFetchSummaries(searchValue: string, categoryList:number[]) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setIsPending(false);
        // let filterRequest = {
        //     query: searchValue,
        //     categories: categoryList
        // }
        // setError('');
        // setIsPending(true);
        // fetch(config.apiUrl + "/summary/filtered",
        //     {
        //         method: 'POST',
        //         headers: {
        //             "Origin": config.origin,
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(filterRequest)
        //     }
        // ).then(res => {
        //         if(!res.ok) throw Error("Couldn't fetch summaries");
        //         return res.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //         setSummaryList(data);
        //         setIsPending(false);
        //     })
        //     .catch((e) => {
        //         setIsPending(false);
        //         setError(e.message);
        //     })
        setSummaryList([
            {
                "summaryId": 1,
                "title": "Introduction to Biology",
                "category_id": 3,
                "ownerId": 456,
                "isPublic": true,
                "flashCards": [
                    {
                        "flashCardId": 1,
                        "title": "Cell Structure",
                        "content": "Basic overview of cellular structures",
                        "imagePath": "/biology/cell_structure.jpg",
                        "summary_id": 1
                    },
                    {
                        "flashCardId": 2,
                        "title": "Photosynthesis Process",
                        "content": "Explanation of the photosynthesis mechanism",
                        "imagePath": "/biology/photosynthesis.jpg",
                        "summary_id": 1
                    }
                ],
                "path": "/biology/introduction",
                "likes": [
                    {
                        "likeId": 1,
                        "userId": 101,
                        "summaryId": 1
                    },
                    {
                        "likeId": 2,
                        "userId": 102,
                        "summaryId": 1
                    }
                ]
            },
            {
                "summaryId": 2,
                "title": "World History Timeline",
                "category_id": 7,
                "ownerId": 789,
                "isPublic": true,
                "flashCards": [
                    {
                        "flashCardId": 3,
                        "title": "Ancient Civilizations",
                        "content": "Overview of ancient civilizations",
                        "imagePath": "/history/ancient_civilizations.jpg",
                        "summary_id": 2
                    },
                    {
                        "flashCardId": 4,
                        "title": "World Wars",
                        "content": "Key events and impacts of world wars",
                        "imagePath": "/history/world_wars.jpg",
                        "summary_id": 2
                    },
                    {
                        "flashCardId": 5,
                        "title": "Cold War",
                        "content": "Overview of the Cold War era",
                        "imagePath": "/history/cold_war.jpg",
                        "summary_id": 2
                    }
                ],
                "path": "/history/timeline",
                "likes": [
                    {
                        "likeId": 3,
                        "userId": 201,
                        "summaryId": 2
                    },
                    {
                        "likeId": 4,
                        "userId": 202,
                        "summaryId": 2
                    },
                    {
                        "likeId": 5,
                        "userId": 203,
                        "summaryId": 2
                    }
                ]
            },
            {
                "summaryId": 3,
                "title": "Basic Physics Concepts",
                "category_id": 1,
                "ownerId": 123,
                "isPublic": true,
                "flashCards": [
                    {
                        "flashCardId": 6,
                        "title": "Newton's Laws",
                        "content": "Explanation of Newton's laws of motion",
                        "imagePath": "/physics/newtons_laws.jpg",
                        "summary_id": 3
                    },
                    {
                        "flashCardId": 7,
                        "title": "Electricity Basics",
                        "content": "Fundamentals of electrical concepts",
                        "imagePath": "/physics/electricity_basics.jpg",
                        "summary_id": 3
                    }
                ],
                "path": "/physics/basic-concepts",
                "likes": [
                    {
                        "likeId": 6,
                        "userId": 301,
                        "summaryId": 3
                    }
                ]
            },
            {
                "summaryId": 4,
                "title": "Introduction to Psychology",
                "category_id": 5,
                "ownerId": 456,
                "isPublic": true,
                "flashCards": [
                    {
                        "flashCardId": 8,
                        "title": "Behavioral Psychology",
                        "content": "Overview of behavioral psychology theories",
                        "imagePath": "/psychology/behavioral_psychology.jpg",
                        "summary_id": 4
                    },
                    {
                        "flashCardId": 9,
                        "title": "Cognitive Psychology",
                        "content": "Explanation of cognitive psychology concepts",
                        "imagePath": "/psychology/cognitive_psychology.jpg",
                        "summary_id": 4
                    },
                    {
                        "flashCardId": 10,
                        "title": "Developmental Psychology",
                        "content": "Insights into developmental psychology stages",
                        "imagePath": "/psychology/developmental_psychology.jpg",
                        "summary_id": 4
                    }
                ],
                "path": "/psychology/intro",
                "likes": [
                    {
                        "likeId": 7,
                        "userId": 401,
                        "summaryId": 4
                    },
                    {
                        "likeId": 8,
                        "userId": 402,
                        "summaryId": 4
                    }
                ]
            }
        ]);
    }, [categoryList, searchValue])
    return {error, isPending, summaryList};
}
export default useFetchSummaries