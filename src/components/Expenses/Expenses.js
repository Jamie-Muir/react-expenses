import React, { useState } from 'react'

import ExpenseFilter from '../ExpenseFilter/ExpenseFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import Card from '../UI/Card';
import './Expenses.css';

function Expenses(props) {
	const currentYear = new Date().getFullYear();
	const [filteredYear, setFilteredYear] = useState(currentYear.toString());
	const [filteredTags, setFilteredTags] = useState([]);
	
	const handleYearChange = (year) => setFilteredYear(year);
	const handleTagsChange = (tags) => {console.log(tags); setFilteredTags(tags)};

	const applyFilters = () => {
		let filteredByYearArr = [];
		if(filteredYear === 'All') filteredByYearArr = [...props.expenses];
		filteredByYearArr = props.expenses.filter(el => el.date.getFullYear().toString() === filteredYear );

		return filterByTags(filteredByYearArr, filteredTags)
	}

	const filterByTags = (array, filters) => {
		if(!filters) return array;
		return array.filter(arrayIndex => filters.every( filter => arrayIndex.tags.includes(filter)))
	}

	const filteredList = applyFilters();

	return (
		<Card className='expenses' >
			<ExpenseFilter selected={filteredYear} onTagsChange={handleTagsChange} onYearChange={handleYearChange} currentYear={currentYear} />
			<ExpensesChart expenses={filteredList} />
			<ExpensesList className='scroll' items={filteredList} />
		</Card> 
	)
}

export default Expenses;