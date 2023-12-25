import {useEffect, useState} from "react";
import {Summary} from "@/utils/model/Summary";
import * as process from "process";

function useFetchSingleSummary(summaryId: number) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summary, setSummary] = useState<Summary | undefined>(undefined);

    useEffect(() => {
        if (summaryId === undefined || summary === null || Number.isNaN(summaryId)) return;
        setError('');
        setIsPending(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/summary/" + summaryId,
            {
                method: 'GET',
                headers: {
                    "Origin": process.env.NEXT_PUBLIC_ORIGIN!,
                    "Authorization": "Bearer " + (localStorage.getItem("jwtToken") === null ? "not-an-empty-string" : localStorage.getItem("jwtToken"))
                }
            }
        )
            .then(res => {
                if (!res.ok) throw Error("Couldn't fetch summary");
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
    }, [summaryId])
    return {error, isPending, summary};
}

export default useFetchSingleSummary