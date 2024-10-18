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
    const initialUrl = localStorage.getItem('currentUrl') || 'http://mytasks-local';
    localStorage.setItem('currentUrl', initialUrl);
    
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data.tasks);
    };
    fetchTasks();
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

// import React from 'react';
// import  { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskDetails from './components/TaskDetails';
// import CompletedTasks from './components/CompletedTasks';
// import UncompletedTasks from './components/UncompletedTasks';
// import { Task } from './tasks';

// import alFlag from '../src/alflag.png';
// import itFlag from '../src/itflag.png';
// import ukFlag from '../src/ukflag.png';
// import { useTranslation } from 'react-i18next';

// const App = () => {
//   const { t, i18n } = useTranslation();
//   const [tasks, setTasks] = useState();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [apiUrl, setApiUrl] = useState(localStorage.getItem('currentUrl') || 'http://localhost');

//   useEffect(() => {
//     // const initialUrl = 'http://mytasks-local';
//     // localStorage.setItem('currentUrl', initialUrl);
//     const initialUrl = localStorage.getItem('currentUrl') || 'http://mytasks-local';
   



//     const fetchTasks = async () => {
//       const response = await axios.get(`${apiUrl}:5000/api/tasks`);
//       setTasks(response.data.tasks);
//       saveTasksToLocalStorage(response.data.tasks);
//       // Load tasks from local storage
//       const storedTasks = localStorage.getItem('tasks');
//       if (storedTasks) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     };
//     fetchTasks();
//   }, [apiUrl]);

//   const saveTasksToLocalStorage = (tasks) => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     console.log('Tasks saved to local storage:', tasks);

//   };

//   const addTask = (newTask) => {
//     setTasks(prevTasks => {
//       const updatedTasks = [...prevTasks, newTask];
//       saveTasksToLocalStorage(updatedTasks); // Save to local storage
//       return updatedTasks;
//     });
//   };

//   const deleteTask = async (id: string) => {
//     await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//     setTasks(prevTasks => {
//       const updatedTasks = prevTasks.filter(task => task.id !== id);
//       saveTasksToLocalStorage(updatedTasks); // Save to local storage
//       return updatedTasks;
//     });
//   };

//   const toggleComplete = async (id) => {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//       const updatedTask = { ...task, completed: !task.completed };
//       await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
//       setTasks(prevTasks => {
//         const updatedTasks = prevTasks.map(t => (t.id === id ? updatedTask : t));
//         saveTasksToLocalStorage(updatedTasks); // Save to local storage
//         return updatedTasks;
//       });
//     }
//   };

//   const handleEditTask = (id, updatedTask) => {
//     setTasks(prevTasks => {
//       const updatedTasks = prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
//       saveTasksToLocalStorage(updatedTasks); // Save to local storage
//       return updatedTasks;
//     });
//   };

//   const searchTasks = (term) => {
//     const isCompletedFilter = term.toLowerCase() === 'completed';
//     const isUncompletedFilter = term.toLowerCase() === 'uncompleted';
//     return tasks.filter(task =>
//       task.title.toLowerCase().includes(term.toLowerCase()) ||
//       task.description.toLowerCase().includes(term.toLowerCase()) ||
//       task.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) ||
//       (isCompletedFilter && task.completed) ||
//       (isUncompletedFilter && !task.completed)
//     );
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <Router>
//       <div className="container">
//         <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#C9c9c9' }}>
//           <Link to="">
//             <img 
//               src={logo} 
//               alt="MyTaskapp"
//               style={{ height: '40px', marginRight: '10px' }} 
//             />
//           </Link>
//           <Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('Home')}</Link>
//           <Link to="/completedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('completedTasks')}</Link>
//           <Link to="/uncompletedtasks" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>{t('uncompletedTasks')}</Link>
//           <input
//             style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', background: '#f0f0f0' }}
//             className='search'
//             type="text"
//             placeholder="🔍  Search tasks..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="flag">
//             <button onClick={() => changeLanguage('en')}>
//               <img src={ukFlag} alt="English" width={30} />
//             </button>
//             <button onClick={() => changeLanguage('it')}>
//               <img src={itFlag} alt="Italian" width={30} />
//             </button>
//             <button onClick={() => changeLanguage('sq')}>
//               <img src={alFlag} alt="Albanian" width={30} />
//             </button>
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/" element={
//             <>
//               <TaskForm 
//                 onTaskAdded={addTask}
//                 completedTasksCount={tasks.filter(task => task.completed).length} 
//                 totalTasksCount={tasks.length} 
//               />
//               <TaskList 
//                 tasks={searchTasks(searchTerm)} 
//                 onDelete={deleteTask} 
//                 onToggleComplete={toggleComplete} 
//                 onEdit={handleEditTask} 
//               />
//             </>
//           } />
//           <Route path="/completedtasks" element={<CompletedTasks tasks={tasks} />} />
//           <Route path="/uncompletedtasks" element={<UncompletedTasks tasks={tasks} />} />
//           <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
