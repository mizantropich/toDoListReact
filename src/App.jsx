// src/App.jsx
import { useState } from 'react';
import styles from './App.module.css';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.jsx';
import { TodoStats } from './components/TodoStats/TodoStats.jsx';
import { TodoFilters } from './components/TodoFilters/TodoFilters.jsx';
import { TodoItem } from './components/TodoItem/TodoItem.jsx';

const tasks = [
	{ id: 1, text: 'Learn React', completed: false },
	{ id: 2, text: 'Build a Todo App', completed: true },
];

function App() {
	return (
		<div className={styles.container}>
			<h1>Todo List</h1>
			<div className={styles.todoApp}>
				<AddTodoForm />
				<TodoStats activeCount={tasks.filter(task => !task.completed).length} totalCount={tasks.length} />
				<TodoFilters currentFilter="all" />
				{tasks.map(task => (
					<TodoItem key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}

export default App;
