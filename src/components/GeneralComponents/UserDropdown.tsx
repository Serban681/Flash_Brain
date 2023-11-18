import styles from './../../styles/user-dropdown.module.css';
// @ts-ignore
import Cookies from "js-cookie";
import {useEffect, useRef} from "react";
import gravatar from 'gravatar';
import Image from 'next/image';
import useCheckLoggedIn from "@/utils/useCheckLoggedIn";
import router from "next/router";

export default function UserDropdown(props:any) {

    let isHidden = props.isHidden;
    let setIsHidden = props.setIsHidden;
    const componentRef = useRef<HTMLDivElement>(null);

    const {isLoggedIn, isPending: isPendingLoggedIn, userInformation} = useCheckLoggedIn();

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

    function handleSignOut() {
        Cookies.remove('jwtToken');
        router.push('/');
    }

    return (
        <div ref={componentRef} className={`rounded ${isHidden ? styles.userDropdownOuterDivHidden :  styles.userDropdownOuterDiv}`}>
            <div className={styles.xDiv}>
                <span className="material-symbols-outlined" onClick={() => setIsHidden(true)}>close</span>
            </div>
            <p className={styles.accountP}>Account</p>
            <div className={styles.userDiv}>
                {!!userInformation && <Image className='w-14 mr-2 ml-8 cursor-pointer rounded-full' src={gravatarUrl} alt='User Avatar' width={200} height={200} />}
                <div className={styles.userInformationDiv}>
                    <p style={{fontSize:24}}>{userInformation !== undefined ? userInformation.username : "Loading..."}</p>
                    <p style={{fontSize:18}}>{userInformation !== undefined ? userInformation.email : "Loading..."}</p>
                </div>
            </div>
            <div className={styles.buttonDiv}>
                <button className="big-btn" onClick={handleSignOut}>Sign out</button>
            </div>
        </div>
    )
}