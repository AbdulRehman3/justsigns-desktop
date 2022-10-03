import retry from "../../assets/images/retry.svg";
import styles from "./ErrorAlert.module.css";

interface Props {
    error: string;
    message?: string;
    onRetry: () => void;
}

const ErrorAlert = ({ error, message, onRetry }: Props) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{error}</p>
            <p className={styles.message}>{message}</p>
            <button onClick={onRetry} className={styles.retryBtn}>
                <img src={retry} alt="Retry" width={30} />
            </button>
        </div>
    )
}

export default ErrorAlert;