import {useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";
import {Summary} from "@/utils/model/Summary";
import {set} from "zod";

function useFetchSummaries(searchValue: string, categoryList:number[]) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/summary/all",
            {method: 'GET',
                headers: {"Origin":config.origin}}
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