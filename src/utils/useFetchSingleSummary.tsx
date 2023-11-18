import {useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";
import {Summary} from "@/utils/model/Summary";
import {set} from "zod";

function useFetchSingleSummary(summaryId: number) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summary, setSummary] = useState<Summary | undefined>(undefined);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/summary/" + summaryId,
            {method: 'GET',
                headers: {"Origin":config.origin}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't fetch summary");
                return res.json();
            })
            .then(data => {
                setSummary(data);
                setIsPending(false);
            })
            .catch((e) => {
                setIsPending(false);
                setError(e.message);
            })
    }, [])
    return {error, isPending, summary};
}
export default useFetchSingleSummary