
import React, { useState } from 'react';
import { Task } from '../tasks';
import './taskitem.css'
import { useTranslation } from 'react-i18next';
import axios from 'axios';


interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
}

type TranslationKeys = 'title' | 'description' | 'completed' | 'uncompleted' | 'delete' | 'save' | 'tags' | 'createdon' | 'unbutton' ;

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  

  const sortedTasks = [...tasks].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
      setTaskToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <div className='list'>
      {/* <h2>{t('title')}</h2> */}

      {sortedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onEdit={onEdit} 
          onDelete={handleDeleteClick} 
        />
      ))}

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>(Confirm Deletion')</h4>
        <p>Are you sure you want to delete this task?</p>
        <button onClick={onConfirm} style={{marginRight:'5px'}}>Yes, Delete</button>
   
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};




// TaskItem component to handle individual tasks

const TaskItem: React.FC<{ task: Task; onDelete: (id: string) => void; onToggleComplete: (id: string) => void; onEdit: (id: string, updatedTask: Partial<Task>) => void; }> = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const { t } = useTranslation<TranslationKeys>();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState(task.tags.join(', '));



 
  const handleSave = async () => {
    const updatedTask = { title, description, tags: tags.split(',').map(tag => tag.trim()) };
    await axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask);
    
    onEdit(task.id, updatedTask); // Update local state
    setIsEditing(false);
  };

  
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
    {task.completed ? (
      <button className="completed-tag">{t('completed')}</button>
    ) : (
      <button className="uncompleted-tag">{t('uncompleted')}</button>
    )}

      {isEditing ? (
        <>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Tags (comma separated)" 
          />

          <button onClick={handleSave}>{t('save')}</button>
        </>
      ) : (
        <>
          <h3>
          {/* {i18n.exists(`task_${task.title}`) ? t(`task_${task.title}`) : task.title} */}
            {task.title}
            <span onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', color: 'blue' }}> ✏️</span>
          </h3>
          <p>{task.description}</p>         
          <p><span style={{fontSize: '20px', color: '#e350a8'}}>{t('tags')}:</span> {task.tags.join(', ')}</p>
          <p><span style={{fontSize: '20px', color: '#9543a7'}}>{t('createdon')}:</span>{new Date(task.creationDate).toLocaleDateString()} at {new Date(task.creationDate).toLocaleTimeString()}</p>
          <div className='btn'>
          <button onClick={() => onToggleComplete(task.id)}>
  {task.completed ? t('completed') : t('unbutton')}
</button>

          <button onClick={() => onDelete(task.id)}>{t('delete')}</button></div>
        </>
      )}
    </div>
  );
};

export default TaskList;


