// src/App.jsx
import { useState } from 'react';
import styles from './App.module.css';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.jsx';
import { TodoStats } from './components/TodoStats/TodoStats.jsx';
import { TodoFilters } from './components/TodoFilters/TodoFilters.jsx';
import { TodoItem } from './components/TodoItem/TodoItem.jsx';

const initialTasks = [
	{ id: 1, text: 'Learn React', completed: false },
	{ id: 2, text: 'Build a Todo App', completed: true },
];

function App() {
	const [tasks, setTasks] = useState(initialTasks);

	const handleAdd = (text) => {
		console.log('add', text);
	};

	const handleToggle = (id) => {
		console.log('toggle', id);
	};

	const handleDelete = (id) => {
		console.log('delete', id);
	};

	return (
		<div className={styles.container}>
			<h1>Todo List</h1>
			<div className={styles.todoApp}>
				<AddTodoForm onAdd={handleAdd} />
				<TodoStats
					activeCount={tasks.filter((task) => !task.completed).length}
					totalCount={tasks.length}
				/>
				<TodoFilters currentFilter="all" />
				{tasks.map((task) => (
					<TodoItem
						key={task.id}
						task={task}
						onToggle={handleToggle}
						onDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
