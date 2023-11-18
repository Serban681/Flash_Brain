import {use, useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";
import {User} from "@/utils/model/User";

function useCheckLoggedIn() {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInformation, setUserInformation] = useState<User | undefined>(undefined);

    useEffect(() => {
        fetch(config.apiUrl + "/auth/verifyToken",
            {method: 'GET',
                headers: {"Origin":config.origin,
                    "Authorization": "Bearer " + Cookies.get('jwtToken')}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't check logged in state");
                setIsLoggedIn(true);
                setIsPending(false);
                return res.json();
            })
            .then(data => {
                console.log(data);
                setUserInformation(data);
            })
            .catch(() => {
                setIsPending(false);
                setIsLoggedIn(false);
            })
    }, [])
    return {isLoggedIn, isPending, userInformation};

}
export default useCheckLoggedIn;