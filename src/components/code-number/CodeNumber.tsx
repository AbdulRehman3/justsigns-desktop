
import styles from "./CodeNumber.module.css";

const CodeNumber = ({ code }: { code: number }) => {

	return (
		<div className={styles.container}>
			<p className={styles.code}>{code}</p>
		</div>
	)
}

export default CodeNumber;