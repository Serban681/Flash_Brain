import {useEffect, useState} from "react";
import {User} from "@/utils/model/User";
import config from "@/config";

export default function useFetchSingleUser(id:number | undefined) {

    const [error, setError] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(!id) return;

        setIsPending(true);
        setError('')
        fetch(config.apiUrl + "/user/" + id,
            {method: 'GET',
                headers: {"Origin":config.origin}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't fetch summary owner");
                return res.json();
            })
            .then(data => {
                console.log(data);
                setUser(data);
                setIsPending(false);
            })
            .catch(() => {
                setIsPending(false);
                setError('Something went wrong...')
            })
    }, [id])

    return {error, isPending, user};
}