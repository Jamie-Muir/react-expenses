import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
	if (props.items && props.items.length === 0) {
		return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
	}

	return (
		<ul className='expenses-list'>
			{props.items.map((expense) => (
				<ExpenseItem
					key={expense.id}
					title={expense.title}
					amount={expense.amount}
					date={expense.date}
					tags={expense.tags}
				/>
			))}
		</ul>
	);
};

export default ExpensesList;
