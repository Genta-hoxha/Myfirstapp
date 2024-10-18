import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { Task } from '../tasks';
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   creationDate: Date;
//   tags: string[];
//   completed: boolean;
// }

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskAdded = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;

  return (
    <TaskForm 
      onTaskAdded={handleTaskAdded} 
      completedTasksCount={completedTasksCount} 
      totalTasksCount={totalTasksCount} 
    />
  );
};

export default Home;

