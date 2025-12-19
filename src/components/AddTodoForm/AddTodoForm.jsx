import { useState } from 'react';
import styles from './AddTodoForm.module.css';

export function AddTodoForm({ onAdd }) {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmed = text.trim();
		if (!trimmed) return;
		onAdd(trimmed);
		setText('');
	};

	return (
		<div>
			<form
				className={styles.form}
				aria-label="Форма добавления новой задачи"
				onSubmit={handleSubmit}
			>
				<label htmlFor="todo-input" className={styles.label}>
					Введите новую задачу
				</label>
				<input
					id="todo-input"
					type="text"
					className={styles.input}
					placeholder="Новая задача..."
					required
					aria-required="true"
					aria-describedby="todo-help"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<small id="todo-help" className={styles.helpText}>
					Введите текст и нажмите "Добавить" или Enter
				</small>
				<button
					type="submit"
					className={styles.button}
					aria-label="Добавить новую задачу"
				>
					Добавить
				</button>
			</form>
		</div>
	);
}