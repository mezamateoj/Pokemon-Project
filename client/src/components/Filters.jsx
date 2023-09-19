import { useDispatch, useSelector } from 'react-redux';

import { filterByType, resetFilters } from '../redux/actions/actions';
import './styles/Filters.css';
import { useState } from 'react';
import {
	filterByAttack,
	orderByName,
	filterByOrigin,
} from '../redux/thunks/thunks';

export default function Filters() {
	const [filter, setFilter] = useState(''); // ["attack", "name"
	const dispatch = useDispatch();
	const types = useSelector((store) => store.types);

	function onSelectedType(e) {
		dispatch(filterByType(e.target.value));
	}

	async function handleOrigin(e) {
		try {
			await new Promise((resolve) => {
				resolve(dispatch(filterByOrigin(e.target.value)));
			});
		} catch (error) {
			console.log(error);
			alert(error.response.data.error);
		}
	}

	function handleReset() {
		dispatch(resetFilters());
	}

	function handleFilterByAttackorName(e) {
		if (filter === 'attack') {
			console.log(e.target.value);
			dispatch(filterByAttack(e.target.value));
		} else if (filter === 'name') {
			console.log(e.target.value);

			dispatch(orderByName(e.target.value));
		}
	}

	return (
		<div className="filters">
			{
				<img
					src="pokeball.png"
					alt="pokeball"
					style={{ width: '32px' }}
				/>
			}
			<div className="order-filters">
				<div className="select-filters">
					<fieldset className="filter-fieldset">
						<legend>Sort By:</legend>
						<div>
							<label htmlFor="attack">attack</label>
							<input
								type="radio"
								id=""
								name="filter"
								value="attack"
								onChange={(e) => setFilter(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="name">name</label>
							<input
								type="radio"
								id="name"
								name="filter"
								value="name"
								onChange={(e) => setFilter(e.target.value)}
							/>
						</div>

						<select
							name="filter"
							id=""
							onChange={handleFilterByAttackorName}
						>
							<option value="asc">asc</option>
							<option value="desc">desc</option>
						</select>
					</fieldset>
				</div>
			</div>
			<div className="type-filter">
				<label htmlFor="type">Types</label>
				<div className="select-filters">
					<select
						className="type-select"
						name=""
						id=""
						onChange={onSelectedType}
					>
						{types.types?.map((type) => (
							<option key={type.name} value={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="origin-filter">
				<label htmlFor="origin">Origin</label>
				<div className="select-filters">
					<select name="" id="" onChange={handleOrigin}>
						<option value="API">Pokemon API</option>
						<option value="Created">Created</option>
					</select>
				</div>
			</div>
			<button className="pokemon-btn" onClick={handleReset}>
				Reset
			</button>
		</div>
	);
}
