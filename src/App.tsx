import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CompletedTasks from './components/CompletedTasks';
import UncompletedTasks from './components/UncompletedTasks';
import logo from '../src/assets/logo.png'
import alFlag from '../src/assets/alflag.png'
import itFlag from '../src/assets/itflag.png'
import ukFlag from '../src/assets/ukflag.png'
import { useTranslation } from 'react-i18next';
import { Task } from './tasks';
import axios from 'axios';

const App: React.FC = () => {
  const { t, i18n } = useTranslation(); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const updateLocalStorage = () => {
      const apiUrl = 'http://localhost:5000/api/tasks'; // Define the API URL
      localStorage.setItem('myProjectURL', apiUrl);
      console.log('API URL updated to:', apiUrl);
  };

    updateLocalStorage();

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    fetchTasks();

    // Listen for popstate event to update local storage
    window.addEventListener('popstate', updateLocalStorage);

    // Cleanup the event listener on unmount
    return () => {
        window.removeEventListener('popstate', updateLocalStorage);
    };
}, []);


  // Adding a new task
  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Deleting a task
  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Toggle completed status of a task
  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(prevTasks => prevTasks.map(t => (t.id === id ? updatedTask : t)));
    }
  };

  const handleEditTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Searching a task
  const searchTasks = (term: string) => {
    const isCompletedFilter = term.toLowerCase() === 'completed';
    const isUncompletedFilter = term.toLowerCase() === 'uncompleted';
    return tasks.filter(task =>
      task.title.toLowerCase().includes(term.toLowerCase()) ||
      task.description.toLowerCase().includes(term.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) ||
      (isCompletedFilter && task.completed) ||
      (isUncompletedFilter && !task.completed)
    );
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="container">
        <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#C9c9c9' }}>
          <Link to="">
            <img 
              src={logo} 
              alt="MyTaskapp"
              style={{ height: '40px', marginRight: '10px' }} 
            />
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('Home')}</Link>
          <Link to="/completedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('completedTasks')}</Link>
          <Link to="/uncompletedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('uncompletedTasks')}</Link>
          <input
            style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', background: '#f0f0f0' }}
            className='search'
            type="text"
            placeholder="🔍  Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flag">
            <button onClick={() => changeLanguage('en')}>
              <img src={ukFlag} alt="English" width={30} />
            </button>
            <button onClick={() => changeLanguage('it')}>
              <img src={itFlag} alt="Italian" width={30} />
            </button>
            <button onClick={() => changeLanguage('sq')}>
              <img src={alFlag} alt="Albanian" width={30} />
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <TaskForm 
                onTaskAdded={addTask}
                completedTasksCount={tasks.filter(task => task.completed).length} 
                totalTasksCount={tasks.length} 
              />
              <TaskList 
                tasks={searchTasks(searchTerm)} 
                onDelete={deleteTask} 
                onToggleComplete={toggleComplete} 
                onEdit={handleEditTask} 
              />
            </>
          } />
          <Route path="/completedtasks" element={<CompletedTasks tasks={tasks} />} />
          <Route path="/uncompletedtasks" element={<UncompletedTasks tasks={tasks} />} />
          
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

