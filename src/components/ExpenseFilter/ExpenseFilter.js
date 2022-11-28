import './ExpenseFilter.css';

function ExpenseFilter(props) {

	const yearChangeHandler = (e) => {
		props.onYearChange(e.target.value);
	}

	const tagChangeHandler = (e) => {
		let tags = e.target.value.trim().split(",");
		props.onTagsChange(tags);
	}

	const generateYears = (y) => {
		const arr = [];
		for(let i=0; i > -4; i--){
			arr.push(y + i);
		}
		return arr;
	}

	const showYears = generateYears(props.currentYear).map(el => <option key={el} value={el} >{el}</option>)

	return (
		<div className='expense-filter'>
			<div className='expense-filter__control'>
				<label>Filter By Year</label>
				<select id='year' name='year' value={props.selected} onChange={yearChangeHandler}>
					<option value='All' >All</option>
					{showYears}
				</select>
			</div>
			<div className='expense-filter__control'>
				<label>Filter By Tag</label>
				<input id='tag' type='text' onChange={tagChangeHandler} />
			</div>
		</div>
	);
}

export default ExpenseFilter;
