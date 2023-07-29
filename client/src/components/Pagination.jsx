import { useDispatch } from "react-redux";
import { goToPage, nextPage, prevPage } from "../redux/pokemonsSlice";

export default function Pagination({ startPage, endPage, page }) {
	const dispatch = useDispatch();

	return (
		<div className="pagination">
			{startPage === 1 ? (
				""
			) : (
				<button onClick={() => dispatch(prevPage())}>Previous</button>
			)}

			{Array.from(
				{ length: endPage - startPage + 1 },
				(_, i) => startPage + i
			).map((pageNumber) => (
				<button
					key={pageNumber}
					onClick={() => dispatch(goToPage(pageNumber))}
					className={pageNumber === page ? "active" : ""}
				>
					{pageNumber}
				</button>
			))}

			<button onClick={() => dispatch(nextPage())}>Next</button>
		</div>
	);
}
