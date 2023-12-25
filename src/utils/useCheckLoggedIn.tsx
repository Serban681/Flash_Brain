import {useEffect, useState} from "react";
import {User} from "@/utils/model/User";
import * as process from "process";

function useCheckLoggedIn(initiator: number) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInformation, setUserInformation] = useState<User | undefined>(undefined);

    useEffect(() => {
        setIsPending(true);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/token/status",
            {
                method: 'GET',
                headers: {
                    "Origin": process.env.NEXT_PUBLIC_ORIGIN!,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')
                }
            }
        )
            .then(res => {
                if (!res.ok) throw Error("Couldn't check logged in state");
                setIsLoggedIn(true);
                setIsPending(false);
                return res.json();
            })
            .then(data => {
                setUserInformation(data);
            })
            .catch(() => {
                setIsPending(false);
                setIsLoggedIn(false);
            })
    }, [initiator])
    return {isLoggedIn, isPending, userInformation};

}

export default useCheckLoggedIn;
