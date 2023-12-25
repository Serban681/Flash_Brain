import {LeaderboardEntry} from "@/utils/model/LeaderboardEntry";

export default function LeaderboardEntry(props: any) {

    const rank = props.index + 1;
    const entry:LeaderboardEntry = props.entry;

    return (
        <div className="bg-black w-full h-20 mb-4 flex flex-row">
            <div className="bg-black-light h-full aspect-square flex flex-col justify-center align-middle text-center text-white text-2xl font-josefin font-bold" style={{borderRadius: "var(--border-radius"}}>{rank}</div>
            <div className="flex grow flex-row justify-between items-center pt-1 text-white text-xl font-josefin font-semibold">
                <div className="ml-4">{entry.username}</div>
                <div className="mr-4">{entry.score}</div>
            </div>
        </div>
    )
}