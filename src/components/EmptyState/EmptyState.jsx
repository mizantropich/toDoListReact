import styles from './EmptyState.module.css';

export function EmptyState({ message }) {
	return (
		<div className={styles.emptyState} role="alert">
			{message}
		</div>
	);
}