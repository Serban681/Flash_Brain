import {useEffect, useState} from "react";
import {Summary} from "@/utils/model/Summary";
import config from "@/config";
// @ts-ignore
import Cookies from "js-cookie";

function useFetchLikedSummaries() {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [summaryList, setSummaryList] = useState<Summary[]>([]);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/user/liked",
            {method: 'GET',
                headers: {
                "Origin":config.origin,
                    "Authorization": "Bearer " + Cookies.get('jwtToken')}}
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
    }, []);
    return {error, isPending, summaryList};

}
export default useFetchLikedSummaries;