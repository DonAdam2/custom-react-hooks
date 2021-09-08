import React from 'react';
//custom hooks
import useArray from '../../customHooks/UseArray';

const ArrayHookPage = () => {
	const toDos = useArray([]);

	return (
		<div className="magnify-container">
			<h3>ToDos</h3>
			<button onClick={() => toDos.add(Math.random())}>Add</button>
			<ul>
				{toDos.value.map((el, i) => (
					<li key={i}>
						{el} <button onClick={() => toDos.removeByIndex(i)}>Delete</button>
					</li>
				))}
			</ul>
			<button onClick={() => toDos.clear()}>Clear Todos</button>
		</div>
	);
};

export default ArrayHookPage;
