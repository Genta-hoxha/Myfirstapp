

import React , {useState} from "react";
import { Link } from "react-router-dom";
import { Task } from "../../tasks";
import { useTranslation } from "react-i18next";


interface UncompletedTasksProps {
  tasks: Task[];
}

const UncompletedTasks: React.FC<UncompletedTasksProps> = ({ tasks }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const uncompletedTasks = tasks.filter(task => !task.completed);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="uncompleted-tasks">
      <h2>{t('uncompletedTasks')}</h2>
      {uncompletedTasks.length === 0 ? (
        <p>{t('noUncompletedTasks')}</p>
      ) : (
        <div className="task-cards">
          {uncompletedTasks.map(task => {
            console.log('Current title:', task.title);

            return (
              <div key={task.id} className="task-card">
                <h3>{t('taskTitle', task.title )}</h3> 
                <p>{t('taskDescription',task.description )}</p>
             
                <p>
                  <span style={{ fontSize: '20px', color: '#e350a8' }}>{t('tags')}:</span> {task.tags.join(', ')}
                </p>
                <p>
                <p><span style={{fontSize: '20px', color: '#9543a7'}}>{t('createdon')}:</span>{new Date(task.creationDate).toLocaleDateString()} at {new Date(task.creationDate).toLocaleTimeString()}</p>
                </p>
              </div>
            );
          })}
        </div>
      )}
      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default UncompletedTasks;
