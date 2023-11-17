import styles from '@/styles/login-page.module.css';
export default function LoginPage() {

    return (
        <div className={styles.loginPageOuterDiv}>
            <form className={styles.loginForm}>
                <p className={styles.loginP}>Log in</p>
                <button className={styles.googleButton}>Sign-up with Google</button>
                <div className={styles.loginLine}>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
            </form>
        </div>
    )
}