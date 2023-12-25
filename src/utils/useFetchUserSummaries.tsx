import {useEffect, useState} from "react";
import {Summary} from "@/utils/model/Summary";
import process from "process";

export default function useFetchUserSummaries() {
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/user/posted",
            {
                method: 'GET',
                headers: {
                    "Origin":process.env.NEXT_PUBLIC_ORIGIN!,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')},
            }
        ).then(res => {
            if(!res.ok) throw Error("Couldn't fetch posted summaries");
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
    }, [])
    return {error, isPending, summaryList};
}