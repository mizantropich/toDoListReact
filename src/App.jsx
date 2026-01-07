// src/App.jsx
import { useEffect, useState, useMemo} from 'react';
import styles from './App.module.css';

import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.jsx';
import { TodoStats } from './components/TodoStats/TodoStats.jsx';
import { TodoFilters } from './components/TodoFilters/TodoFilters.jsx';
import { TodoItem } from './components/TodoItem/TodoItem.jsx';
import { EmptyState } from './components/EmptyState/EmptyState.jsx';

const STORAGE_KEY = 'todo.tasks';

const initialTasks = [];

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const SORT = {
	NEWEST: 'newest',
	OLDEST: 'oldest',
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function isPlainObject(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeCompleted(value) {
	if (typeof value === 'boolean') return value;
	if (typeof value === 'string') {
		const v = value.toLowerCase().trim();
		if (v === 'true') return true;
		if (v === 'false') return false;
	}
	if (typeof value === 'number') {
		if (value === 1) return true;
		if (value === 0) return false;
	}
	// мягкий дефолт
	return false;
}

function normalizeCreatedAt(value) {
	// number (идеально)
	if (typeof value === 'number' && Number.isFinite(value)) return value;

	// string -> number (часто бывает после сохранений/миграций)
	if (typeof value === 'string') {
		const parsed = Number(value);
		if (Number.isFinite(parsed)) return parsed;
	}

	// мягкий fallback для старых/битых данных
	return Date.now();
}

function normalizeTask(raw) {
	if (!isPlainObject(raw)) return null;

	const id = raw.id;
	const hasValidId = typeof id === 'string' || typeof id === 'number';
	if (!hasValidId) return null;

	const textRaw = raw.text;
	if (textRaw === undefined || textRaw === null) return null;
	const text = String(textRaw).trim();
	if (text.length === 0) return null;

	const completed = normalizeCompleted(raw.completed);

	const createdAt = normalizeCreatedAt(raw.createdAt);

	return { id, text, completed, createdAt };
}

function loadTasksFromStorage() {
	if (typeof Storage === 'undefined') {
		return initialTasks;
	}

	let stored;
	try {
		stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return initialTasks;
	} catch (e) {
		console.error('Error accessing localStorage:', e);
		return initialTasks;
	}

	let parsed;
	try {
		parsed = JSON.parse(stored);
	} catch (e) {
		console.error('Error parsing tasks JSON:', e);
		return initialTasks;
	}

	if (!Array.isArray(parsed)) return initialTasks;

	const normalized = parsed.map(normalizeTask).filter(Boolean);

	// если все элементы оказались мусором — возвращаем initialTasks (по твоему DoD)
	return normalized.length > 0 ? normalized : initialTasks;
}

function App() {
	const [tasks, setTasks] = useState(() => loadTasksFromStorage());

	const [now, setNow] = useState(Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setNow(Date.now());
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (typeof Storage === 'undefined') {
			return;
		}

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
		} catch (error) {
			console.error('Error saving tasks to localStorage:', error);
		}
	}, [tasks]);

	const [currentFilter, setFilter] = useState(FILTERS.ALL);

	const [sortType, setSortType] = useState(SORT.NEWEST);

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
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
	}, [tasks, currentFilter]);

	const sortedTasks = useMemo(() => {
		return [...filteredTasks].sort((a, b) => {
			if (sortType === SORT.OLDEST) return a.createdAt - b.createdAt;
			return b.createdAt - a.createdAt; // newest first
		});
	}, [filteredTasks, sortType]);

	const { activeCount, completedCount } = useMemo(() => {
		return tasks.reduce(
			(acc, task) => {
				if (task.completed) {
					acc.completedCount++;
				} else {
					acc.activeCount++;
				}
				return acc;
			},
			{ activeCount: 0, completedCount: 0 }
		);
	}, [tasks]);
	const totalCount = tasks.length;

	const getEmptyStateMessage = () => {
		// 1) Нет задач вообще
		if (tasks.length === 0) {
			return '📝 Нет задач. Добавьте первую!';
		}

		// 2) Есть задачи, но по фильтру ничего не осталось
		if (sortedTasks.length === 0) {
			switch (currentFilter) {
				case FILTERS.ACTIVE:
					return '✅ Все задачи выполнены!';
				case FILTERS.COMPLETED:
					return '📝 Нет выполненных задач';
				case FILTERS.ALL:
				default:
					return '📝 Нет задач';
			}
		}

		return null;
	};

	const emptyMessage = getEmptyStateMessage();
	const showEmptyState = emptyMessage !== null;

	const handleAdd = (text) => {
		setTasks((prevTasks) => [
			...prevTasks,
			{ id: generateId(), text, completed: false, createdAt: Date.now() },
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

	const handleClearCompleted = () => {
		setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
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
				<TodoFilters
					currentFilter={currentFilter}
					onChangeFilter={setFilter}
					sortType={sortType}
					onChangeSort={setSortType}
					completedCount={completedCount}
					onClearCompleted={handleClearCompleted}
				/>
				{showEmptyState ? (
					<EmptyState message={emptyMessage} />
				) : (
					sortedTasks.map((task) => (
						<TodoItem
							key={task.id}
							task={task}
							onToggle={handleToggle}
							onDelete={handleDelete}
							now={now}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default App;
