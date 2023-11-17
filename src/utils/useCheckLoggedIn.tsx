import {useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import config from "../config";

function useCheckLoggedIn() {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log(Cookies.get('jwtToken'));
        fetch(config.apiUrl + "/auth/verifyToken",
            {method: 'GET',
                headers: {"Origin":config.origin,
                    "Authorization": "Bearer " + Cookies.get('jwtToken')}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't check logged in state");
                setIsLoggedIn(true);
                setIsPending(false);
            })
            .catch(() => {
                setIsPending(false);
                setIsLoggedIn(false);
            })
    }, [])
    return {isLoggedIn, isPending};

}
export default useCheckLoggedIn;