import React, { useState, useEffect } from "react";
import "./Todo.css";

function Task({ task, index, completeTask, removeTask }) {
	return (
		<div
			className="task"
			style={{ textDecoration: task.completed ? "line-through" : "" }}
		>
			{task.title}

			<button style={{ background: "red" }} onClick={() => removeTask(index)}>
				X
			</button>
			<button onClick={() => completeTask(index)}>Complete</button>
		</div>
	);
}

function CreateTask({ addTask }) {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value) return;
		addTask(value);
		setValue("");
	};
	return (
		<form onSubmit={handleSubmit}>
			<h3 className="Container">TO DO :</h3>
			<input
				type="text"
				className="input"
				value={value}
				placeholder="Add new To-do"
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
}

function Todo() {
	const [tasksRemaining, setTasksRemaining] = useState(0);
	const [tasks, setTasks] = useState([
		{
			title: "Task Test One",
			completed: true,
		},
	]);

	useEffect(() => {
		setTasksRemaining(tasks.filter((task) => !task.completed).length);
	});

	const addTask = (title) => {
		const newTasks = [...tasks, { title, completed: false }];
		setTasks(newTasks);
	};

	const completeTask = (index) => {
		const newTasks = [...tasks];
		newTasks[index].completed = true;
		setTasks(newTasks);
	};

	const removeTask = (index) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	return (
		<div className="todo-container">
			<div className="create-task">
				<CreateTask addTask={addTask} />
			</div>
			<div className="header">Pending tasks ({tasksRemaining})</div>
			<div className="tasks">
				{tasks.map((task, index) => (
					<Task
						task={task}
						index={index}
						completeTask={completeTask}
						removeTask={removeTask}
						key={index}
					/>
				))}
			</div>
		</div>
	);
}

export default Todo;
