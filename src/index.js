import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
	changeTitle,
	deleteTask,
	completeTask,
	loadTasks,
	getTasksLoadingStatus,
	getTasks,
	createTask,
} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getErrors } from './store/errors';

const store = configureStore();

const App = () => {
	const state = useSelector(getTasks());
	const isLoading = useSelector(getTasksLoadingStatus());
	const error = useSelector(getErrors());
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTasks());
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (error) {
		return <p>{error}</p>;
	}

	return (
		<>
			<h1>App</h1>
			<button
				onClick={() => {
					dispatch(
						createTask({
							userId: 1,
							title: 'New task',
							completed: false,
						})
					);
				}}
			>
				Create new task
			</button>
			<ul>
				{state.map((el) => (
					<li key={el.id}>
						<p>{el.title}</p>
						<p>{`Completed: ${el.completed}`}</p>
						<button onClick={() => dispatch(completeTask(el.id))}>
							Complete
						</button>
						<button onClick={() => dispatch(changeTitle(el.id))}>
							Change title
						</button>
						<button onClick={() => dispatch(deleteTask(el.id))}>Delete</button>
						<hr />
					</li>
				))}
			</ul>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
