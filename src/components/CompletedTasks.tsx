



import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../tasks';
import { useTranslation } from 'react-i18next';

interface CompletedTasksProps {
  tasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const { t } = useTranslation();
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="completed-tasks">
      
      <h2>{t('completedTasks')}</h2>
      {completedTasks.length === 0 ? (
        <p>{t('noCompletedTasks')}</p>
      ) : (
        <div className='task-cards'>
          {completedTasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{t('taskTitle', task.title )}</h3>
              {/* <p>{t('taskDescription', { description: task.description })}</p> */}
              <p>{t('taskDescription',  task.description )}</p>
              <p>
                <span style={{ fontSize: '20px', color: '#e350a8' }}>{t('tags')}:</span> {task.tags.join(', ')}
              </p>
              <p>
              <p><span style={{fontSize: '20px', color: '#9543a7'}}>{t('createdon')}:</span>{new Date(task.creationDate).toLocaleDateString()} at {new Date(task.creationDate).toLocaleTimeString()}</p>
              </p>
            </div>
          ))}
        </div>
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CompletedTasks;
