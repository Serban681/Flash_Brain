import Header from "@/components/GeneralComponents/Header";
import styles from "@/styles/liked.module.css";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import {useEffect} from "react";
import router from "next/router";
import useFetchLikedSummaries from "@/utils/useFetchLikedSummaries";
import useFetchSummaries from "@/utils/useFetchSummaries";

export default function liked() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();
    const {error: errorFetchSummaries, isPending: isPendingSummaries, summaryList} = useFetchLikedSummaries(isLoggedIn);

    useEffect(() => {
        if(!isPendingLoggedIn && !isLoggedIn) router.push("/login");
    }, [isLoggedIn, isPendingLoggedIn]);

    return (
        <div className={styles.likedPageOuterDiv}>
            <Header></Header>
            <div className={styles.likedContentDiv}>
                <p className={styles.title}>Liked summaries</p>
            </div>
        </div>
    )
}