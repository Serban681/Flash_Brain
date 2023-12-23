import {useEffect, useState} from "react";
import config from "../config";
import {User} from "@/utils/model/User";

function useCheckLoggedIn(initiator: number) {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInformation, setUserInformation] = useState<User | undefined>(undefined);

    useEffect(() => {
        setIsPending(true);
        fetch(config.apiUrl + "/auth/token/status",
            {method: 'GET',
                headers: {"Origin":config.origin,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't check logged in state");
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
