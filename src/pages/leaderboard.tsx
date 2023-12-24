import styles from '../styles/leaderboard.module.css';
import Header from "@/components/GeneralComponents/Header";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import LoadingComponent from "@/components/GeneralComponents/LoadingComponent";

export default function LeaderboardPage() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);

    return (
        <div className={styles.leaderboardOuterContainer}>
            <LoadingComponent loading={isPendingLoggedIn}/>
            <Header/>
            <div className={styles.leaderboardContainer}>

            </div>
        </div>
    )
}