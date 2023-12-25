import {useEffect, useState} from "react";
import {LeaderboardEntry} from "@/utils/model/LeaderboardEntry";
import process from "process";
export default function useFetchLeaderboard() {
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        setError('');
        setIsPending(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/user/leaderboard",
            {method: 'GET',
                headers: {
                    "Origin":process.env.NEXT_PUBLIC_ORIGIN!,
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