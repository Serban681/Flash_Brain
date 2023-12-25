import styles from '../styles/leaderboard.module.css';
import Header from "@/components/GeneralComponents/Header";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import LoadingComponent from "@/components/GeneralComponents/LoadingComponent";
import LeaderboardEntry from "@/components/GeneralComponents/LeaderboardEntry";
import useFetchLeaderboard from "@/utils/useFetchLeaderboard";

export default function LeaderboardPage() {

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);
    const {error, isPending, leaderboardEntries} = useFetchLeaderboard();
    const position = leaderboardEntries.findIndex(user => user.uid === userInformation?.uid) + 1;

    return (
        <div className={styles.leaderboardOuterContainer}>
            <LoadingComponent loading={isPendingLoggedIn}/>
            <Header/>
            <div className={styles.leaderboardContainer}>
                <h2 className="pt-12 text-white text-2xl size font-josefin font-extrabold">Leaderboard</h2>
                <p className="pt-1 text-white text-xl font-josefin font-semibold">Your current rank is {position + "/" + leaderboardEntries.length}, with {userInformation?.score} points</p>
                <p className="pt-1 text-white text-xl font-josefin font-semibold mb-8">See how you compare to others:</p>
                <div className="overflow-auto">
                    {leaderboardEntries.map((entry, index) => (
                        <LeaderboardEntry key={index} entry={entry} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}