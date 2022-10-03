import {ReactComponent as LoaderSvg} from "../../assets/images/loader.svg";
import styles from "./Loader.module.css";

const Loader = () => {

    return (
        <div className={styles.container}>
            <LoaderSvg className={styles.loadingIcon} />
        </div>
    )
}

export default Loader;