import styles from './TodoFilters.module.css';

export function TodoFilters({
	currentFilter,
	onChangeFilter,
	sortType,
	onChangeSort,
	completedCount,
	onClearCompleted,
}) {
  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Активные' },
    { id: 'completed', label: 'Выполненные' }
  ];

	const sortOptions = [
		{ id: 'newest', label: 'Сначала новые' },
		{ id: 'oldest', label: 'Сначала старые' },
	];

	return (
		<div className={styles.panel}>
			<div
				className={styles.filters}
				role="group"
				aria-label="Фильтры для просмотра задач"
			>
				{filters.map((filter) => (
					<button
						key={filter.id}
						type="button"
						className={`${styles.filterButton} ${
							filter.id === currentFilter ? styles.active : ''
						}`}
						aria-current={filter.id === currentFilter ? 'true' : 'false'}
						aria-label={`Показать ${filter.label.toLowerCase()} задачи`}
						onClick={() => onChangeFilter(filter.id)}
					>
						{filter.label}
					</button>
				))}
			</div>

			<div className={styles.sort} role="group" aria-label="Сортировка задач">
				{sortOptions.map((option) => (
					<button
						key={option.id}
						type="button"
						className={`${styles.sortButton} ${
							option.id === sortType ? styles.active : ''
						}`}
						aria-current={option.id === sortType ? 'true' : 'false'}
						onClick={() => onChangeSort(option.id)}
					>
						{option.label}
					</button>
				))}
			</div>

			<button
				type="button"
				className={styles.clearCompletedButton}
				onClick={onClearCompleted}
				disabled={completedCount === 0}
				aria-disabled={completedCount === 0 ? 'true' : 'false'}
			>
				Удалить все выполненные
			</button>
		</div>
	);
}