import React, { useState } from 'react';

import './NewExpense.css';

import ExpenseForm from './ExpenseForm';

function NewExpense(props) {
	const [toggle, setToggle] = useState(false);

	const submitDataHandler = (submittedData) => {
		const expenseData = {
			...submittedData,
			// amount: +submittedData.amount,
			id: Date.now()
		};
		console.log(expenseData)
		props.onAddExpense(expenseData);
	}

	const clickHandler = () => setToggle(prevState => !prevState);

	return (
		<div className='new-expense'>
			{toggle ? 
				<ExpenseForm onSubmitData={submitDataHandler} setToggle={setToggle} /> 
				:
				<button onClick={clickHandler}>Add New Expense</button>	 
			}
			
		</div>
	)
}

export default NewExpense;