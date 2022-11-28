import React, { useState } from 'react'

import './ExpenseForm.css';

function ExpenseForm(props) {
	const defaultData = {
		title: '',
		amount: 0,
		date: '',
		tags: []
	}

	const [formData, setFormData] = useState({...defaultData});

	const onChangeHandler = (e) => {
		setFormData(prevState => {
			return {...prevState, [e.target.id]: e.target.value};
		})
	}

	const onChangeTagsHandler = (e) => {
		setFormData(prevState => {
			return {...prevState, [e.target.id]: e.target.value.trim().split(',')};
		})
	}

	const submitHandler = (e) => {
		e.preventDefault();

		const date = typeof formData.date !== "object" ? new Date() : new Date(formData.date)

		const expenseData = {...formData, date: date}
		props.onSubmitData(expenseData);
		setFormData({...defaultData});
	}

	const cancelHandler = () => props.setToggle();

	const randomHandler = (e) => {
		e.preventDefault();
		const amount = Math.floor(Math.random()*1000) / 100
		const title = wordGen(3, " ");
		const tags = wordGen(5, ",").split(",");
		tags.pop();
		
		setFormData(x => ({...x, title: title, amount: amount, tags: tags}))
	}

	const wordGen = (numWords, delim) => {
		const wordArray = new Array(numWords).fill(0); 
		let string = '';
		
		for (let i=0; i < wordArray.length; i++) {
			wordArray[i] = Math.ceil(Math.random()*10); // how many chars per word

			for (let j = 0; j < wordArray[i]; j++) {
				let char = Math.floor(Math.random()*(122-65 +1) + 65) + ""; // pick a letter

				string += String.fromCharCode(char);
			}
			string += delim; // add a deliminator between words
		}
		return string;
	}

	return (
		<div>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label>Title</label>
					<input id='title' type='text' onChange={onChangeHandler} value={formData.title} />
				</div>
				<div className='new-expense__control'>
					<label>Amount</label>
					<input id='amount' type='number' min='0.01' step='0.01' onChange={onChangeHandler} value={formData.amount} />
				</div>
				<div className='new-expense__control'>
					<label>Date</label>
					<input id='date' type='date' min='2021-01-01' max='2025-12-31' onChange={onChangeHandler} value={formData.date} />
				</div>
				<div className='new-expense__control'>
					<label>Tags</label>
					<input id='tags' type='text' onChange={onChangeTagsHandler} value={formData.tags} />
				</div>
			</div>
			<div className='new-expense__actions'>
				<button onClick={cancelHandler}>Close</button>	
				<button onClick={randomHandler}>Randomise</button>	
				<button type="submit" onClick={submitHandler}>Add Expense</button>
			</div>
		</div>
	);
}

export default ExpenseForm;
