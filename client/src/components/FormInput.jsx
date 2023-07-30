import "./styles/FormInput.css";

const errorStyles = {
	color: "#ff4742",
	fontSize: "12px",
};

function FormInput(props) {
	const { name, placeholder, value, label, onChange, error, onBlur } = props;

	return (
		<div className="form-input">
			<label htmlFor="">{label}</label>
			<input
				name={name}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			<span className="error-form" style={errorStyles}>
				{error ? error : ""}
			</span>
		</div>
	);
}

export default FormInput;
