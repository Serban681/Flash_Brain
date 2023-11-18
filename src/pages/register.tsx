import styles from '@/styles/register-page.module.css';
import Header from "@/components/GeneralComponents/Header";
import Image from "next/image";
import GoogleImage from "@/images/google_logo.svg";
import Link from "next/link";
import {ChangeEvent, useState} from "react";
import {RegisterRequest} from "@/utils/model/RegisterRequest";
import config from "@/config";
// @ts-ignore
import Cookies from "js-cookie";
import router from "next/router";
import {useGoogleLogin} from "@react-oauth/google";

export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    const [error, setError] = useState<string>('');

    function handleRegister(e:any) {
        e.preventDefault();

        const registerData: RegisterRequest = {
            password,
            username,
            email
        };

        setError('');

        fetch(config.apiUrl + "/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': config.origin
            },
            body: JSON.stringify(registerData),
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
                Cookies.set('jwtToken', data.access_token);
                router.push('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const handleGoogleRegister =
        useGoogleLogin({
            onSuccess: codeResponse => {
                const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
                fetch(url, {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Failed to fetch user info');
                        }
                    })
                    .then((userInfo) => {
                        const atIndex = userInfo.email.indexOf('@');
                        let registerData: RegisterRequest = {
                            username: userInfo.email.substring(0, atIndex),
                            password: userInfo.id,
                            email: userInfo.email,
                        }
                        fetch(config.apiUrl + "/user", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Origin': config.origin
                            },
                            body: JSON.stringify(registerData),
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
                                Cookies.set('jwtToken', data.access_token);
                                router.push('/');
                            })
                            .catch((error) => {
                                setError(error.message);
                            });
                    })
                    .catch(() => {
                        setError("Something went wrong");
                    });
            }
        });

    return (
        <div className={styles.registerPageOuterDiv}>
            <Header></Header>
            <form className={styles.registerForm}>
                <p className={styles.registerP}>Sign-up</p>
                <button type="button" className={styles.googleButton} onClick={() => handleGoogleRegister()}>
                    <Image src={GoogleImage} alt="Google icon" style={{marginRight:15, width:'auto', height:'auto'}}></Image>
                    Sign-up with Google
                </button>
                <div className={styles.registerLine}>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>

                <div className={styles.userP}>Username</div>
                <input
                    type="text"
                    className={styles.userInput}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className={styles.emailP}>Email</div>
                <input
                    type="text"
                    className={styles.emailInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className={styles.passP}>Password</div>
                <input
                    type="password"
                    className={styles.passwordInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.confirmP}>Confirm password</div>
                <input
                    type="password"
                    className={styles.confirmInput}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Link href={"/login"} style={{width:'100%'}}><p className={styles.logInLink}>Already have an account ? Log-in here</p></Link>
                <div style={{width:'100%', marginTop:20}}>
                    <button
                        onClick={(e) => handleRegister(e)}
                        className="small-btn">Sign-up</button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    )
}