import React, { useState, useEffect, useCallback } from 'react'

import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';


function App() {

	//Init States
	const [expenses, setExpenses] = useState([]); // Display list
	const [isLoading, setIsLoading] = useState(false); // Enables Placeholder loading text
	const [error, setError] = useState(null); // Passes error text to user
	
	const fetchExpensesHandler = useCallback(async () => {
	
		setIsLoading(true);
		setError(null);

		try{
			// Fetch API
			const response = await fetch('https://react-expenses-afab8-default-rtdb.europe-west1.firebasedatabase.app/expenses.json');
			if(!response.ok) {
				throw new Error(`Something went wrong (Error Code ${response.status})`);
			}
			const data = await response.json();

			// Transform Data
			const transformedExpenses = [];
			for(const key in data) {
				transformedExpenses.push({
					id: key,
					title: data[key].title,
					amount: data[key].amount,
					date: new Date(data[key].date),
					tags: data[key].tags,
				});
			}
			// Set State
			setExpenses(transformedExpenses)
		}
		catch(error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	// Fetch data on arrival
	useEffect(() => {
		fetchExpensesHandler();
	}, [fetchExpensesHandler]);


	// Add new expense
	const addExpenseHandler = async (expense) => {
		await fetch('https://react-expenses-afab8-default-rtdb.europe-west1.firebasedatabase.app/expenses.json', {
			method: 'POST',
			body: JSON.stringify(expense),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		setExpenses(prevState => [...prevState, expense])
	};


	// Communicating sequencing to user
	let content = <p>Found no Expenses</p>

	if(expenses.length > 0) content = <Expenses expenses={expenses} />
	if(error) content = <p>{error}</p>
	if(isLoading) content = <p>Loading...</p>

	return (
		<div className='App'>
			<NewExpense onAddExpense={addExpenseHandler} /> 
			{content}
		</div>
	);
}

export default App;
