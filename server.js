const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const app = express();

// Set up SQLite database
const db = new Database('tasks.db');

// Create tasks table if it does not exist
db.exec(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    task TEXT NOT NULL
)`);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// GET Route to render tasks
app.get('/', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all(); // Fetch all tasks
    res.render('index', { title: 'Task Manager', tasks });
});

// POST Route to add a new task
app.post('/add-task', (req, res) => {
    const { category, task } = req.body;
    db.prepare('INSERT INTO tasks (category, task) VALUES (?, ?)').run(category, task); // Insert new task
    res.redirect('/');
});

// POST Route to delete a task
app.post('/delete-task', (req, res) => {
    const { category, task } = req.body;
    db.prepare('DELETE FROM tasks WHERE category = ? AND task = ?').run(category, task); // Delete task
    res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
