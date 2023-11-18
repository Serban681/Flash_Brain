import {useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";
import {Summary} from "@/utils/model/Summary";

function useFetchSummaries() {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
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
    }, [])
    return {error, isPending, summaryList};

}
export default useFetchSummaries