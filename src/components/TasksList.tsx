import type { Task } from '../types.d';

import TaskItem from './Task.tsx';

interface Props {
  todoList: Task[],
  setShowForm: (show: boolean) => void,
  setTaskToEdit: (taskToEdit: Task) => void,
}

function TasksList({ todoList, setShowForm, setTaskToEdit }: Props) {
  function handleClick(task: Task) {
    setTaskToEdit(task);
    setShowForm(true);
  }

  return (
    <ul className='flex flex-col'>
      {
        todoList.map(({ id, title, description, categoryId, completed, priority, date }) => (
          <li key={id} className={`flex-1 transition-colors hover:bg-bgSecondary-light dark:hover:bg-bgSecondary-dark ${completed && "order-1"}`}>
            <TaskItem
              id={id}
              title={title}
              description={description}
              categoryId={categoryId}
              completed={completed}
              priority={priority}
              date={date}
              editTaskInfo={handleClick}
            />
          </li>
        ))
      }
    </ul>
  );
}

export default TasksList;
