import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import TodoForm from "./TodoForm"; // Import the reusable form component

import "./Todo.css";

export const Todo = () => {
    const [task, setTask] = useState([]);
    const [dateTime, setDateTime] = useState("");

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        console.log("Stored tasks on initial load:", storedTasks); // Debug log

        if (storedTasks) {
            try {
                const parsedTasks = JSON.parse(storedTasks); // Parse the tasks from JSON
                setTask(parsedTasks); // Set the parsed tasks to the state
                console.log("Parsed tasks after load:", parsedTasks); // Debug log
            } catch (error) {
                console.error("Error parsing tasks from localStorage:", error);
            }
        }
    }, []);

    // Save tasks to localStorage whenever the `task` state changes
    useEffect(() => {
        console.log("Saving tasks to localStorage:", task);
        localStorage.setItem("tasks", JSON.stringify(task)); // Save tasks to localStorage
    }, [task]);

    const handleFormSubmit = (newTask) => {
        if (!newTask) return;

        if (task.includes(newTask)) {
            return;
        }

        setTask((prevTask) => [...prevTask, newTask]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formatDate = now.toLocaleDateString();
            const formatTime = now.toLocaleTimeString();
            setDateTime(`${formatDate} - ${formatTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDeleteTask = (value) => {
        const updatedTask = task.filter((currTask) => currTask !== value);
        setTask(updatedTask);
    };

    const handleClearData = () => {
        setTask([]);
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <h1 className="date-time">{dateTime}</h1>
            </header>

            {/* Use the TodoForm component here */}
            <TodoForm onFormSubmit={handleFormSubmit} />

            <section className="myUnOrdList">
                <ul>
                    {task.map((currTask, index) => (
                        <li key={index} className="todo-item">
                            <span>{currTask}</span>
                            <button className="check-btn">
                                <MdCheck />
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteTask(currTask)}
                            >
                                <MdDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {task.length > 0 && (
                <section className="clear-btn" onClick={handleClearData}>
                    Clear All
                </section>
            )}
        </section>
    );
};
