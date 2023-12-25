import styles from '@/styles/register-page.module.css';
import Header from "@/components/GeneralComponents/Header";
import Image from "next/image";
import GoogleImage from "@/images/google_logo.svg";
import Link from "next/link";
import {useEffect, useState} from "react";
import {RegisterRequest} from "@/utils/model/RegisterRequest";
import {useGoogleLogin} from "@react-oauth/google";
import EmailImage from "@/images/email_icon.svg";
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import router from "next/router";
import process from "process";

export default function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmailMessage, setIsEmailMessage] = useState<boolean>(false);

    /*
    when the user finishes the register process, the checkLoggedInNumber will be
    incremented every few seconds to check if the email has been verified. If it has, the user
    will be redirected to the main page.
     */
    const [loggedInNumber, setLoggedInNumber] = useState<number>(0);
    const {isLoggedIn, isPending, userInformation} = useCheckLoggedIn(loggedInNumber);
    let registerInterval: NodeJS.Timeout;

    useEffect(() => {
        return () => {
            if(registerInterval)
                clearInterval(registerInterval);
        }
    }, []);

    useEffect(() => {
        if(isLoggedIn) router.push('/');
    }, [isLoggedIn]);

    function handleRegister(e:any) {
        e.preventDefault();
        const registerData: RegisterRequest = {
            password,
            username,
            email
        };

        if(password === '' || username === '' || email === '' || confirmPassword === '') {
            setError('⚠ All fields are required.');
            return;
        }
        if(password !== confirmPassword) {
            setError('⚠ Passwords do not match.');
            return;
        }
        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setError('⚠ Invalid email address.');
            return;
        }
        if(password.length < 8) {
            setError("⚠ Password must be at least 8 characters long.");
            return;
        }

        setError('');
        setIsLoading(true);
        console.log(registerData);
        fetch(process.env.NEXT_PUBLIC_API_URL + "/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NEXT_PUBLIC_ORIGIN!,
            },
            body: JSON.stringify(registerData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    if(response.status === 409)
                        throw new Error('User with these credentials already exists');
                    else throw new Error('Something went wrong.');
                }
            })
            .then((data) => {
                setIsLoading(false);
                localStorage.setItem('jwtToken', data.accessToken);
                setIsEmailMessage(true);
                registerInterval = setInterval(() => {
                    setLoggedInNumber(prevNumber => prevNumber + 1)
                }, 2000)
            })
            .catch((error) => {
                setIsLoading(false);
                setError('⚠ ' + error.message);
            });
    }

    const handleGoogleRegister =
        useGoogleLogin({
            onSuccess: codeResponse => {
                const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
                setError('');
                setIsLoading(true);
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
                        console.log(registerData);
                        fetch(process.env.NEXT_PUBLIC_API_URL + "/user", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Origin': process.env.NEXT_PUBLIC_ORIGIN!
                            },
                            body: JSON.stringify(registerData),
                        })
                            .then((response) => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    if(response.status === 409) throw new Error('User already exists.');
                                    else throw new Error('Something went wrong.');
                                }
                            })
                            .then((data) => {
                                setIsLoading(false);
                                localStorage.setItem('jwtToken', data.accessToken);
                                setIsEmailMessage(true);
                                registerInterval = setInterval(() => {
                                    setLoggedInNumber(prevNumber => prevNumber + 1);
                                }, 2000)
                            })
                            .catch((error) => {
                                setIsLoading(false)
                                setError('⚠ ' + error.message);
                            });
                    })
                    .catch(() => {
                        setIsLoading(false);
                        setError('⚠ ' + "Something went wrong");
                    });
            }
        });

    return (
        <div className={styles.registerPageOuterDiv}>
            <Header></Header>
            {isEmailMessage &&
                <div className={styles.emailVerificationMessage}>
                    <Image src={EmailImage} alt="" className="ml-5 h-16 w-16"/>
                    <p>{`We've sent a verification e-mail to ${email}. Please access the your e-mail to verify your account.`}</p>
                </div>}
            {!isEmailMessage && <form className={styles.registerForm}>
                <p className={styles.registerP}>Register</p>
                <button type="button" className={styles.googleButton} onClick={() => handleGoogleRegister()}>
                    <Image src={GoogleImage} alt="Google icon" style={{marginRight:15, width:'2rem', height:'auto'}}></Image>
                    Sign-up with Google
                </button>
                <div className={styles.registerLine}>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>

                <div className={styles.userLabel}>Username</div>
                <input
                    type="text"
                    className={styles.userInput}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className={styles.emailLabel}>Email</div>
                <input
                    type="text"
                    className={styles.emailInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className={styles.passLabel}>Password</div>
                <input
                    type="password"
                    className={styles.passwordInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.confirmLabel}>Confirm password</div>
                <input
                    type="password"
                    className={styles.confirmInput}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Link href={"/login"} style={{width:'100%'}}><p className={styles.logInLink}>Already have an account ? Log-in here</p></Link>
                <div style={{width:'100%', marginTop:20, marginBottom: 20}}>
                    <button
                        onClick={(e) => handleRegister(e)}
                        className="small-btn">Sign up</button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {isLoading && <div className="lds-dual-ring"></div>}
            </form>}
        </div>
    )
}