import styles from './../../styles/user-dropdown.module.css';
import {useEffect, useRef} from "react";
import gravatar from 'gravatar';
import Image from 'next/image';
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import router from "next/router";
import close_icon from "@/images/close_icon.svg";

export default function UserDropdown(props:any) {

    let isHidden = props.isHidden;
    let setIsHidden = props.setIsHidden;
    const componentRef = useRef<HTMLDivElement>(null);

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn(0);

    const gravatarUrl = !isPendingLoggedIn && isLoggedIn ? gravatar.url(!!userInformation ? userInformation.email : '' , {protocol: 'http', s: '40'}) : ''

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsHidden(true);
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.keyCode === 27) {
                setIsHidden(true);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [componentRef]);

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        router.push('/');
        window.location.reload();
    }

    const goToMySummaries = () => {
        router.push('/mysummaries');
    }

    return (
        <div ref={componentRef} className={`rounded ${isHidden ? styles.userDropdownOuterDivHidden :  styles.userDropdownOuterDiv}`}>
            <div className={`${styles.xDiv}`}>
                <Image className="material-symbols-outlined transition-all hover:scale-110 mt-3 mr-3" onClick={() => setIsHidden(true)} src={close_icon} alt="close icon" />
            </div>
            <p className={`${styles.accountP} mt-[-1.2rem]`}>Account</p>
            <div className={styles.userDiv}>
                {!!userInformation && <Image className='w-12 mr-2 ml-6 rounded-full' src={gravatarUrl} alt='User Avatar' width={200} height={200} />}
                <div className={styles.userInformationDiv}>
                    <p style={{fontSize:18}}>{userInformation !== undefined ? userInformation.username : "Loading..."}</p>
                    <p style={{fontSize:16}}>{userInformation !== undefined ? userInformation.email : "Loading..."}</p>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={goToMySummaries} className={`small-btn ${styles.btn}`}>My summaries</button>
                <button className={`small-btn block ${styles.btn_2}`} id="green" onClick={handleSignOut}>Sign out</button>            
            </div>
        </div>
    )
}