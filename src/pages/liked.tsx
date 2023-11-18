import Header from "@/components/GeneralComponents/Header";
import styles from "@/styles/liked.module.css";

export default function liked() {
    return (
        <div className={styles.likedPageOuterDiv}>
            <Header></Header>
            <div className={styles.likedContentDiv}></div>
        </div>
    )
}