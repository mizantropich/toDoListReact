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

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function App() {
	const [tasks, setTasks] = useState(initialTasks);
	const [currentFilter, setFilter] = useState(FILTERS.ALL);

	const filteredTasks = tasks.filter((task) => {
		switch (currentFilter) {
			case FILTERS.ACTIVE:
				return !task.completed;
			case FILTERS.COMPLETED:
				return task.completed;
			case FILTERS.ALL:
			default:
				return true;
		}
	});

	const activeCount = tasks.filter((task) => !task.completed).length;
	const completedCount = tasks.filter((task) => task.completed).length;
	const totalCount = tasks.length;

	const handleAdd = (text) => {
		setTasks((prevTasks) => [
			...prevTasks,
			{ id: generateId(), text, completed: false },
		]);
	};

	const handleToggle = (id) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const handleDelete = (id) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	return (
		<div className={styles.container}>
			<h1>Todo List</h1>
			<div className={styles.todoApp}>
				<AddTodoForm onAdd={handleAdd} />
				<TodoStats
					activeCount={activeCount}
					completedCount={completedCount}
					totalCount={totalCount}
				/>
				<TodoFilters currentFilter={currentFilter} onChangeFilter={setFilter} />
				{filteredTasks.map((task) => (
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
