import styles from '../../styles/summary-card.module.css'
import {Summary} from "@/utils/model/Summary";
import Link from 'next/link';
import {useEffect, useState} from "react";
export default function SummaryCard(props:any) {

    let summary:Summary = props.summary;
    let isLoggedIn = props.isLoggedIn;
    let backgroundColor: string = props.backgroundColor;
    let secondaryColor: string = props.secondaryColor;

    let likedSummaries = props.likedSummaries;
    let setLikedSummaries = props.setLikedSummaries;

    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        if(likedSummaries) {
            likedSummaries.forEach((item: Summary) =>{
                if(item.summaryId == summary.summaryId) setIsLiked(true);
            })
        }
    }, [likedSummaries, setIsLiked]);

    function likeCard() {
        if(isLiked) return;
        else {
            //TODO call post like api endpoint and add the current summary to the local list of user liked summaries
        }
    }

    //TODO 2 different classes for the like icon (one with fill one without)

    return (
        <Link href={"/viewflashcard/" + summary.summaryId}><div className={styles.summaryCardOuterDiv}>
                <div className={styles.summaryLeftDiv} style={{backgroundColor:secondaryColor}}>
                    <div style={{backgroundColor: backgroundColor}}>
                        {summary.category_id == 1 && <span className="material-symbols-outlined">text_ad</span>}
                        {summary.category_id == 2 && <span className="material-symbols-outlined">calculate</span>}
                        {summary.category_id == 3 && <span className="material-symbols-outlined">science</span>}
                        {summary.category_id == 4 && <span className="material-symbols-outlined">swords</span>}
                        {summary.category_id == 5 && <span className="material-symbols-outlined">menu_book</span>}
                        {summary.category_id == 6 && <span className="material-symbols-outlined">computer</span>}
                        {summary.category_id == 7 && <span className="material-symbols-outlined">pin_drop</span>}
                        {summary.category_id == 8 && <span className="material-symbols-outlined">attach_money</span>}
                        {summary.category_id == 9 && <span className="material-symbols-outlined">list</span>}
                    </div>
                </div>
                <div className={styles.summaryRightDiv} style={{backgroundColor: backgroundColor}}>
                    {summary.title}
                </div>
            </div>
        </Link>
    )

}