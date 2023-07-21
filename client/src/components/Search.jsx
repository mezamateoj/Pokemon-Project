import "./styles/search.css";
export default function Search() {
	return (
		<div className="search">
			<input
				className="search-bar"
				type="text"
				placeholder="🔍Search..."
			/>
			<button>Search</button>
		</div>
	);
}
