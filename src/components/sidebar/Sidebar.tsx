import { ReactComponent as HeaderMenu } from "../../assets/images/menu.svg";
import { ReactComponent as FullScreen } from "../../assets/images/fullscreen.svg";
import appLogo from "../../assets/images/logo.png";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <div className="wpper">
            <div className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <img className={styles.appLogo} src={appLogo} />
                    <ul className={styles.sidebarList}>
                        <li className={styles.sidebarLink}>AutoRefresh</li>
                        <li className={styles.sidebarLink}>Input</li>
                        <li className={styles.sidebarLink}>Refresh</li>
                    </ul>
                </div>
            </div>
            <div className={styles.headerContainer}>
                <div className={styles.headerMenu}>
                    <HeaderMenu />
                </div>
                <div className={styles.headerMenu}>
                    <FullScreen />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;