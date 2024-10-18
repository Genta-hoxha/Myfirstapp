
import React, { useState } from 'react';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Task } from '../tasks';
import { useTranslation } from 'react-i18next';

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, completedTasksCount, totalTasksCount }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [taskInfo, setTaskInfo] = useState<{ completed: number; uncompleted: number }>({
    completed: completedTasksCount,
    uncompleted: totalTasksCount - completedTasksCount,
  });

  const handleMouseMove = () => {
    setTaskInfo({
      completed: completedTasksCount,
      uncompleted: totalTasksCount - completedTasksCount,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newTask: Task = {
      id: '',
      title,
      description,
      creationDate: new Date(),
      tags: tags.split(',').map(tag => tag.trim()),
      completed: false,
      uncompleted: false,
      taskTitle: function (arg0: string, taskTitle: any): import(
        "react").ReactNode | Iterable<import("react").ReactNode> {
          throw new Error('Function not implemented.');
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      setError(t('taskForm.errorAddingTask'));
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = completedTasksCount || 0;
  const totalTasks = totalTasksCount || 0;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="row" onMouseMove={handleMouseMove}>
      <div className="column right">
        <form onSubmit={handleSubmit} className='form' onMouseMove={handleMouseMove}>
          <input
            type="text"
            placeholder={t('taskForm.titlePlaceholder')}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            aria-label="Task Title"
          />
          <textarea
            placeholder={t('taskForm.descriptionPlaceholder')}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            aria-label="Task Description"
          />
          <input
            type="text"
            placeholder={t('taskForm.tagsPlaceholder')}
            value={tags}
            onChange={e => setTags(e.target.value)}
            aria-label="Task Tags"
          />
          <br /> <br />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? t('taskForm.addingButton') : t('taskForm.addButton')}
          </button>
        </form>
      </div>
      <div className="column left" onMouseMove={handleMouseMove}>
        <CircularProgressbar
          value={completionPercentage}
          text={`${Math.round(completionPercentage)}%`}
          styles={{
            path: {
              stroke: `#4caf50`,
            },
            text: {
              fill: '#000',
              fontSize: '16px',
            },
            trail: {
              stroke: '#f44336',
            },
          }}
        />
        <div className="task-info">
          <p style={{ color: '#4caf50' }}>
            {t('completedTasks'
            )}: {taskInfo.completed}
          </p>
          <p style={{ color: '#f44336' }}>
            {t('uncompletedTasks')}: {taskInfo.uncompleted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
