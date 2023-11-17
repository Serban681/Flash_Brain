import styles from '@/styles/login-page.module.css';
import Header from "@/components/GeneralComponents/Header";
import Link from "next/link";
import Button from "@/components/GeneralComponents/Button";
import Image from "next/image";
import GoogleImage from "@/images/google_logo.svg";
export default function LoginPage() {

    function handleLogin() {
        console.log(";")
    }

    return (
        <div className={styles.loginPageOuterDiv}>
            <Header></Header>
            <form className={styles.loginForm}>
                <p className={styles.loginP}>Log in</p>
                <button type="button" className={styles.googleButton}>
                    <Image src={GoogleImage} alt="Google icon" style={{marginRight:15, width:'auto', height:'auto'}}></Image>
                    Log-in with Google
                </button>
                <div className={styles.loginLine}>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <div className={styles.userP}>Username</div>
                <input type="text" className={styles.userInput}/>
                <div className={styles.passP}>Password</div>
                <input type="text" className={styles.passwordInput}/>
                <Link href={"/register"} style={{width:'100%'}}><p className={styles.signUpLink}>Don't have an account ? Sign-up here</p></Link>
                <div style={{width:'100%', marginTop:20}}>
                    <Button text={"Log in"} function={handleLogin}></Button>
                </div>

            </form>
        </div>
    )
}