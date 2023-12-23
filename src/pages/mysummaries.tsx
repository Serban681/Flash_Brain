import Header from "@/components/GeneralComponents/Header";
import styles from "@/styles/index.module.css";
import likeStyles from "@/styles/liked.module.css";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import {useEffect, useState} from "react";
import router from "next/router";
import SummaryCard from "@/components/MainPageComponents/SummaryCard";
import delete_icon from "@/images/delete_icon.svg"
import Image from "next/image";
import config from "@/config";

export default function MySummariesPage() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [deletedSummaryId, setDeletedSummaryId] = useState<number>(-1);

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

    function handleDeleteSummary(summaryId: number) {
        if(!userInformation?.summaries) return;
        const index = userInformation.summaries.findIndex(summary => summary.summaryId == summaryId);
        if (index === -1) {
            return;
        }

        setDeletedSummaryId(summaryId);
        setIsLoadingDelete(true);
        fetch(config.apiUrl + "/summary/" + summaryId,
            {method: 'DELETE',
                headers: {
                    "Origin":config.origin,
                    "Authorization": "Bearer " + localStorage.getItem('jwtToken')}}
        )
            .then(res => {
                if(!res.ok) throw Error("Couldn't delete summary");
                setIsLoadingDelete(false);
                if(userInformation?.summaries) userInformation.summaries.splice(index, 1);
                setDeletedSummaryId(-1);
            })
            .catch(() => {
                setIsLoadingDelete(false);
                setDeletedSummaryId(-1);
            })

    }

    return (
        <div className={likeStyles.likedPageOuterDiv}>
            <Header></Header>
            
            <section id="browseSection" className={styles.browseSection}>
                    <div className={styles.browseSectionContainer}>
                        <div className="centered-container mb-4">
                            <div className="lds-dual-ring" style={{opacity: isPendingLoggedIn ? '1' : '0'}}></div>
                        </div>
                        <h2 className={`${likeStyles.title} mb-8`}>My Summaries</h2>
                        {userInformation?.summaries && userInformation.summaries.length > 0 && <div className={styles.summaryBrowser}>
                            {userInformation.summaries.map((summary, index) => (
                                <div className="flex flex-col" key={summary.summaryId} style={{borderRadius:10}}>
                                    <SummaryCard
                                        summary={summary}
                                        backgroundColor={getSummaryBackground(index)}
                                        secondaryColor={getSummarySecondaryColor(index)}
                                    ></SummaryCard>
                                    <button
                                        onClick={() => handleDeleteSummary(summary.summaryId)}
                                        className="delete-btn">
                                        {isLoadingDelete && deletedSummaryId === summary.summaryId && <div className="lds-dual-ring" style={{scale:"0.35"}}></div>}
                                        {(!isLoadingDelete || deletedSummaryId !== summary.summaryId) && <Image className="relative bottom-0.5 mr-1" src={delete_icon} alt="delete"/>}
                                        {(!isLoadingDelete ||  deletedSummaryId !== summary.summaryId) && "Delete"}
                                    </button>
                                </div>
                            ))}
                        </div>}
                        {userInformation?.summaries && userInformation.summaries.length == 0 && !isPendingLoggedIn && <p style={{
                            fontFamily:'var(--font-josefin)',
                            fontSize: 26,
                            color: 'var(--white)',
                            textAlign: 'center',
                            marginBottom: '8rem'
                        }}>No results found</p>}
                    </div>
            </section>
        </div>
    )
}