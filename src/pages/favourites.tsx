import Header from "@/components/GeneralComponents/Header";
import styles from "@/styles/liked.module.css";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import {useEffect} from "react";
import router from "next/router";
import useFetchUserSummaries from "@/utils/useFetchUserSummaries";
import SummaryCard from "@/components/MainPageComponents/SummaryCard";
import useFetchLikedSummaries from "@/utils/useFetchLikedSummaries";

export default function FavouritesPage() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();

    let {
        error,
        isPending,
        summaryList
    } = useFetchLikedSummaries(isLoggedIn);

    useEffect(() => {
        console.log(summaryList);
    }, [summaryList]);

    useEffect(() => {
        if(!isPendingLoggedIn && !isLoggedIn) router.push("/login");
    }, [isLoggedIn, isPendingLoggedIn]);

    function getSummarySecondaryColor(index: number) {
        switch (index % 6) {
            case 0:
                return 'var(--light-green)'
            case 1:
                return 'var(--light-black)'
            case 2:
                return 'var(--light-yellow)'
            case 3:
                return 'var(--light-yellow)'
            case 4:
                return 'var(--light-green)'
            case 5:
                return 'var(--light-black)'
        }
    }

    function getSummaryBackground(index: number) {
        switch (index % 6) {
            case 0:
                return 'var(--green)'
            case 1:
                return 'var(--black)'
            case 2:
                return 'var(--yellow)'
            case 3:
                return 'var(--yellow)'
            case 4:
                return 'var(--green)'
            case 5:
                return 'var(--black)'
        }
    }

    return (
        <div className={styles.likedPageOuterDiv}>
            <Header></Header>
            
            <div className={`w-screen mt-24 ${styles.likedContentDiv}`}>
                    <div className={styles.indexLowerDiv}>
                        <h2 className={`${styles.title} mb-8`}>Liked Summaries</h2>
                        {summaryList.length > 0 && <div className={styles.summaryBrowser}>
                            {summaryList.map((summary, index) => (
                                <div key={summary.summaryId} style={{borderRadius:10}}>
                                    <SummaryCard
                                        summary={summary}
                                        backgroundColor={getSummaryBackground(index)}
                                        secondaryColor={getSummarySecondaryColor(index)}
                                    ></SummaryCard>    
                                </div>
                            ))}
                        </div>}
                        {summaryList.length == 0 && !isPending && <p style={{
                            fontFamily:'var(--font-josefin)',
                            fontSize: 26,
                            color: 'var(--white)'
                        }}>No results found</p>}
                    </div>
            </div>
        </div>
    )
}