import styles from './../../styles/user-dropdown.module.css';
// @ts-ignore
import Cookies from "js-cookie";
import {useEffect, useRef} from "react";
import gravatar from 'gravatar';
import Image from 'next/image';

export default function UserDropdown(props:any) {

    let isHidden = props.isHidden;
    let setIsHidden = props.setIsHidden;
    let userInformation = props.userInformation;
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(userInformation)

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
    }, [])

    function handleSignOut() {
        Cookies.remove('jwtToken');
        window.location.reload();
    }

    return (
        <div ref={componentRef} className={`rounded ${isHidden ? styles.userDropdownOuterDivHidden :  styles.userDropdownOuterDiv}`}>
            <div className={styles.xDiv}>
                <span className="material-symbols-outlined" onClick={() => setIsHidden(true)}>close</span>
            </div>
            <p className={styles.accountP}>Account</p>
            <div className={styles.userDiv}>
                <div className={styles.circleDiv}></div>

                {/* {!!userInformation && <Image className='w-9 mr-5 cursor-pointer rounded-full' src={gravatar.url(userInformation.email)} alt='User Avatar' width={40} height={40} />} */}
                {/* here I add the avatar */}
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