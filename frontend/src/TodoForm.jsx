import React, { useState } from "react";

const TodoForm = ({ onFormSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(inputValue);
        setInputValue(""); // Clear the input after submission
    }

    return (
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text"
                        className="todo-input"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit" className="todo-btn">
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    );
}

export default TodoForm;
