

//the component receives a list of taska as a prop and uses the useParams hook to extract the task ID from the URL
import React from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../tasks';
//defined a Task interface that represent the structure of a task object
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// }


//defines the expected props for the component
interface TaskDetailsProps {
  tasks: Task[];
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ tasks }) => {
  const { id } = useParams<{ id: string }>();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return <h1>Task not found</h1>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
};

export default TaskDetails;
