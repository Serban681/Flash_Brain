import {useEffect, useState} from "react";
import config from "../config";
import {Summary} from "@/utils/model/Summary";

function useFetchSummaries(searchValue: string, categoryList:number[]) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setIsPending(false);
        let filterRequest = {
            query: searchValue,
            categories: categoryList
        }
        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/summary/filtered",
            {
                method: 'GET',
                headers: {
                    "Origin": config.origin,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterRequest)
            }
        ).then(res => {
                if(!res.ok) throw Error("Couldn't fetch summaries");
                return res.json();
            })
            .then(data => {
                console.log(data);
                setSummaryList(data);
                setIsPending(false);
            })
            .catch((e) => {
                setIsPending(false);
                setError(e.message);
            })

    }, [categoryList, searchValue])
    return {error, isPending, summaryList};
}
export default useFetchSummaries