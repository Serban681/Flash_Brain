import styles from '../../styles/summary-card.module.css'
import {Summary} from "@/utils/model/Summary";
import Link from 'next/link';
import {useState} from "react";
import thumbs_up from "@/images/thumbs_up.svg";
import Image from "next/image";

export default function SummaryCard(props:any) {

    let summary:Summary = props.summary;
    let isLoggedIn = props.isLoggedIn;
    let backgroundColor: string = props.backgroundColor;
    let secondaryColor: string = props.secondaryColor;

    const [isLiked, setIsLiked] = useState<boolean>(false);

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
                
                <div className={`relative ${styles.summaryRightDiv}`} style={{backgroundColor: backgroundColor}}>
                    {summary.title}
                    <div className='absolute flex right-2 bottom-0.5'>
                        <p>126</p>
                        <Image className='w-4 ml-0.5 mb-1' width={40} height={40} src={thumbs_up} alt="" />
                    </div>  
                </div>
            </div>
        </Link>
    )

}