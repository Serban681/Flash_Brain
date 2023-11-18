import {useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";
import {Summary} from "@/utils/model/Summary";

function useFetchSummaries(searchValue: string, categoryList:number[]) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        let filterRequest = {
            query: searchValue,
            categories: categoryList
        }

        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/summary/filtered",
            {method: 'POST',
                headers: {"Origin":config.origin},
            body: JSON.stringify(filterRequest)
            }
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't fetch summaries");
                return res.json();
            })
            .then(data => {
                setSummaryList(data);
                setIsPending(false);
            })
            .catch((e) => {
                setIsPending(false);
                setError(e.message);
            })
    }, [categoryList]);
    return {error, isPending, summaryList};
}
export default useFetchSummaries