import styles from './TodoItem.module.css';

export function TodoItem({task, onToggle, onDelete}) {
	return (
		<div className={`${styles.item} ${task.completed ? styles.completed : ''}`} role="listitem">
			<input
				type="checkbox"
				checked={task.completed}
				className={styles.checkbox}
				aria-label={`Отметить задачу "${task.text}" как ${task.completed ? 'выполненную' : 'незавершенную'}`}
				onChange={() => onToggle(task.id)}
			/>
			<span className={`${styles.text} ${task.completed ? styles.completed : ''}`}>
				{task.text}
			</span>
			<button
				className={styles.deleteButton}
				type='button'
				aria-label={`Удалить задачу "${task.text}"`}
				onClick={() => onDelete(task.id)}
			>
				x
			</button>
		</div>
	);
}