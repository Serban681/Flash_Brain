import {useEffect, useState} from "react";
import {Summary} from "@/utils/model/Summary";
import process from "process";

function useFetchLikedSummaries(isLoggedIn: boolean) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setIsPending(false);
        if(!isLoggedIn) return;
        setError('');
        setIsPending(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/summary/favourites",
            {method: 'GET',
                headers: {
                "Origin":process.env.NEXT_PUBLIC_ORIGIN!,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')}}
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
    }, [isLoggedIn]);
    return {error, isPending, summaryList, setSummaryList};
}
export default useFetchLikedSummaries;
