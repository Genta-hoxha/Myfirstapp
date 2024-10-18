"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //a web app framework for node, use to build APIs ; request and response are used for handling HTTP request and response
const body_parser_1 = __importDefault(require("body-parser")); //analysing json data
const cors_1 = __importDefault(require("cors")); //used for API to be accessed  from different domains
const fs_1 = __importDefault(require("fs")); //used for reading and writing files
const app = (0, express_1.default)(); //instance of Express app
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)()); //enables CORS
app.use(body_parser_1.default.json()); //configure the app to parse JSON request
// In memory storage for tasks as an array
let tasks = [];
const loadTasks = () => {
    if (fs_1.default.existsSync('tasks.json')) {
        tasks = JSON.parse(fs_1.default.readFileSync('tasks.json', 'utf-8'));
    }
};
const saveTasks = () => {
    fs_1.default.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};
// calls the loadTasks function when the server starts to load
loadTasks();
// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json({ tasks });
});
// Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        creationDate: new Date(),
        tags: req.body.tags,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});
// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = Object.assign(Object.assign({}, tasks[taskIndex]), req.body);
        saveTasks();
        res.json(tasks[taskIndex]);
    }
    else {
        res.status(404).json({ message: 'Task not found' });
    }
});
// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    res.status(204).send();
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
