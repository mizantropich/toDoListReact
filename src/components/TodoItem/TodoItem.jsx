import styles from './TodoItem.module.css';

export function TodoItem({task}) {
	return (
		<div className={`${styles.item} ${task.completed ? styles.completed : ''}`} role="listitem">
			<input
				type="checkbox"
				checked={task.completed}
				className={styles.checkbox}
				aria-label={`Отметить задачу "${task.text}" как ${task.completed ? 'выполненную' : 'незавершенную'}`}
			/>
			<span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>
				{task.text}
			</span>
			<button
				className={styles.deleteButton}
				aria-label={`Удалить задачу "${task.text}"`}
			>
				x
			</button>
		</div>
	);
}