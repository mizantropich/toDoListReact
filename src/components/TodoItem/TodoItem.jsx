import styles from './TodoItem.module.css';

function formatCreatedAgo(createdAt)	{
	const now = Date.now();
	const diffMs = now - createdAt;
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHrs = Math.floor(diffMin / 60);
	const diffDays = Math.floor(diffHrs / 24);
	if (diffDays > 0) {
		return `создано ${diffDays} дней назад`;
	}
	else if (diffHrs > 0) {
		return `создано ${diffHrs} часов назад`;
	}
	else if (diffMin > 0)	{
		return `создано ${diffMin} минут назад`;
	}
	else if (diffSec >= 5) {
		return `создано ${diffSec} секунд назад`;
	}
	return 'создано только что';
}

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
			<span className={styles.createdAt}>
				{formatCreatedAgo(task.createdAt)}
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