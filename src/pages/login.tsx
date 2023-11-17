import styles from '@/styles/login-page.module.css';
import Header from "@/components/GeneralComponents/Header";
import Link from "next/link";
import Image from "next/image";
import GoogleImage from "@/images/google_logo.svg";
import {useState} from "react";
import {LoginRequest} from "@/utils/model/LoginRequest";
import config from "@/config";
// @ts-ignore
import Cookies from "js-cookie";
import router from "next/router";
export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>('');

    function handleLogin(e:any) {
        e.preventDefault();
        const loginData: LoginRequest = {
            password,
            username,
        };

        setError('');

        fetch(config.apiUrl + "/auth/generate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': config.origin
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    if(response.status === 401)
                        throw new Error('Password is incorrect.');
                    else if(response.status === 404) throw new Error('User not found.');
                    else throw new Error('Something went wrong.');
                }
            })
            .then((data) => {
                Cookies.set('jwtToken', data.jwtToken);
                router.push('/');
            })
            .catch((error) => {
                setError(error.message);
            });
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
                <input
                    type="text"
                    className={styles.userInput}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <div className={styles.passP}>Password</div>
                <input
                    type="password"
                    className={styles.passwordInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link href={"/register"} style={{width:'100%'}}><p className={styles.signUpLink}>Don't have an account ? Sign-up here</p></Link>
                <div style={{width:'100%', marginTop:20}}>
                    <button
                        onClick={(e) => handleLogin(e)}
                    >Log-in</button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    )
}