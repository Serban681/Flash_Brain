import Header from "@/components/GeneralComponents/Header";
import styles from "@/styles/liked.module.css";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import {useEffect} from "react";
import router from "next/router";
import useFetchLikedSummaries from "@/utils/useFetchLikedSummaries";
import useFetchSummaries from "@/utils/useFetchSummaries";
import useFetchUserSummaries from "@/utils/useFetchUserSummaries";

export default function FavouritesPage() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();
    let {
        error,
        isPending,
        summaryList
    } = useFetchUserSummaries();

    useEffect(() => {
        console.log(summaryList);
    }, [summaryList]);

    useEffect(() => {
        if(!isPendingLoggedIn && !isLoggedIn) router.push("/login");
    }, [isLoggedIn, isPendingLoggedIn]);

    return (
        <div className={styles.likedPageOuterDiv}>
            <Header></Header>
            <div className={styles.likedContentDiv}>
                <h2 className="float-right">Liked Summaries</h2>
            </div>
        </div>
    )
}