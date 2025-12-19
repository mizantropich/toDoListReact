import styles from './TodoStats.module.css';

export function TodoStats ({ activeCount, completedCount, totalCount }) {

	return (
		<div className={styles.stats}>
			<span className={styles.counter}>
				Осталось:&nbsp;
				<strong>{activeCount}</strong>
			</span>
			<span className={styles.info}>Выполнено: {completedCount} из {totalCount}</span>
		</div>
	);
}