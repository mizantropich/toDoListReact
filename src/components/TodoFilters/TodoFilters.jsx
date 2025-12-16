import styles from './TodoFilters.module.css'

export function TodoFilters({currentFilter}) {
  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Активные' },
    { id: 'completed', label: 'Выполненные' }
  ];

    return (
        <div className={styles.filters} role='group' aria-label='Фильтры для просмотра задач'>
            {filters.map(filter => (
                <button 
                    key={filter.id}
                    className={`${styles.filterButton} ${filter.id === currentFilter ? styles.active : ''}`}
                    aria-current={filter.id === currentFilter ? 'true' : 'false'}
										aria-label={`Показать ${filter.label.toLowerCase()} задачи`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}