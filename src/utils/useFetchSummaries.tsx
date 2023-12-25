import {useEffect, useState} from "react";
import {Summary} from "@/utils/model/Summary";
import process from "process";

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
        fetch(process.env.NEXT_PUBLIC_API_URL + "/summary/filtered",
            {
                method: 'POST',
                headers: {
                    "Origin": process.env.NEXT_PUBLIC_ORIGIN!,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterRequest)
            }
        ).then(res => {
                if(!res.ok) throw Error("Couldn't fetch summaries");
                return res.json();
            })
            .then(data => {
                setSummaryList(data);
                setIsPending(false);
            })
            .catch((e) => {
                console.log(e.message);
                setIsPending(false);
                setError(e.message);
            })

    }, [categoryList, searchValue])
    return {error, isPending, summaryList};
}
export default useFetchSummaries
