import config from "@/config";
import {useEffect, useState} from "react";
import {LeaderboardEntry} from "@/utils/model/LeaderboardEntry";
export default function useFetchLeaderboard() {
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(config.apiUrl + "/user/leaderboard",
            {method: 'GET',
                headers: {
                    "Origin":config.origin,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't fetch leaderboard");
                return res.json();
            })
            .then(data => {
                setLeaderboardEntries(data);
                setIsPending(false);
            })
            .catch((e) => {
                setIsPending(false);
                setError(e.message);
            })
    }, []);
    return {error, isPending, leaderboardEntries};
}