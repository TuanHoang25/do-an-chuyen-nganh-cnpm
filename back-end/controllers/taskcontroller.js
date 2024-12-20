
import multer from "multer";
import path from "path";
import Task from "../models/Task.js";
// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/works"); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Admin APIs

// POST /api/tasks: Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, deadline, assignedTo, department } = req.body;
        const attachments = req.files.map(file => file.path); // Array of file paths

        const newTask = new Task({
            title,
            description,
            attachments,
            deadline,
            assignedTo,
            department,
            createdBy: req.user._id, // Assuming req.user contains authenticated user info
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/tasks/:id: Update task information
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/tasks: Get all tasks (with filters)
const getTasks = async (req, res) => {
    try {
        const { department, status } = req.query;

        const filters = {};
        if (department) filters.department = department;
        if (status) filters.status = status;

        const tasks = await Task.find(filters).populate("assignedTo department createdBy");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Employee APIs

// GET /api/tasks/my-tasks: Get tasks assigned to the logged-in employee
const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id }).populate("department createdBy");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/tasks/:id/submit: Submit a task
const submitTask = async (req, res) => {
    try {
        const { id } = req.params;
        const completedFiles = req.files.map(file => file.path); // Array of submitted file paths

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (new Date() > new Date(task.deadline)) {
            return res.status(400).json({ error: "Cannot submit task after the deadline" });
        }

        task.completedFiles = completedFiles;
        task.submittedAt = new Date();
        task.status = "Hoàn thành";

        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const checkDeadline = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (new Date() > new Date(task.deadline)) {
            task.status = "Muộn";
            await task.save();
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export { createTask, updateTask, getTasks, getMyTasks, submitTask, upload, checkDeadline };