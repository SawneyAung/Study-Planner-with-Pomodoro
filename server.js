const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data (for POST requests)
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory tasks storage (for demonstration purposes)
let tasks = [
    { category: "Work", task: "Complete project report" },
    { category: "Personal", task: "Read a book" },
];

// Route to render the page with dynamic data
app.get('/', (req, res) => {
    res.render('index', { title: "Study Planner with Pomodoro", tasks });
});

// Route to handle task addition (via form submission)
app.post('/add-task', (req, res) => {
    const { category, task } = req.body;
    tasks.push({ category, task }); // Add new task to the tasks array
    res.redirect('/'); // Redirect back to the homepage to show the updated task list
});

// Route to handle task deletion (via POST request)
app.post('/delete-task', (req, res) => {
    const { category, task } = req.body;
    tasks = tasks.filter(t => t.category !== category || t.task !== task); // Remove task
    res.redirect('/'); // Redirect back to the homepage to show the updated task list
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
