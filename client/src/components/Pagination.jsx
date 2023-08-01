import { useState } from "react";
import { useDispatch } from "react-redux";
import { goToPage, nextPage, prevPage } from "../redux/actions/actions";
import "./styles/Pagination.css";

export default function Pagination({ page, currentPage }) {
	const [moreNumbers, setMoreNumbers] = useState(50);
	const [lessNumbers, setLessNumbers] = useState(currentPage - 4);

	const dispatch = useDispatch();

	const totalPage = 106;
	// calculate start and end item indexes
	let startItem = Math.max(page - 2, 1);
	let endItem = startItem + 4;

	// ensure that the end item does not exceed the total number of pages
	if (endItem > totalPage) {
		endItem = totalPage;
		startItem = Math.max(endItem - 4, 1);
	}

	// create an array from start to end
	const pageNumbers = [...Array(endItem + 1).keys()].slice(startItem);

	function handleMoreNumbers() {
		if (moreNumbers > 100) return;
		dispatch(goToPage(moreNumbers));
		setMoreNumbers(moreNumbers + 25);
	}

	function handleNextPage() {
		dispatch(nextPage());
		setLessNumbers(page - 4);
	}

	function handleLessNumbers() {
		if (currentPage < 5) return;
		dispatch(goToPage(lessNumbers));
	}

	return (
		<div className="pagination">
			{page < 5 || lessNumbers < 1 ? (
				""
			) : (
				<>
					<button onClick={handleLessNumbers}>{lessNumbers}</button>
					<span>..</span>
				</>
			)}

			{page !== 1 && (
				<button onClick={() => dispatch(prevPage())}>Previous</button>
			)}
			{pageNumbers.map((pageNumber) => (
				<button
					key={pageNumber}
					onClick={() => dispatch(goToPage(pageNumber))}
					className={pageNumber === page ? "active" : ""}
				>
					{pageNumber}
				</button>
			))}

			{page !== totalPage && (
				<button onClick={handleNextPage}>Next</button>
			)}
			{moreNumbers > 100 ? (
				""
			) : (
				<>
					<span>..</span>
					<button onClick={handleMoreNumbers}>{moreNumbers}</button>
				</>
			)}
		</div>
	);
}
