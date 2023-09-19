import { useSelector } from 'react-redux';
import './styles/FormInput.css';

const errorStyles = {
	color: '#ff4742',
	fontSize: '12px',
};

function FormInput(props) {
	const { name, placeholder, value, label, onChange, error, onBlur } = props;
	const types = useSelector((store) => store.types.types);

	return (
		<div className="form-input">
			{name === 'types' ? (
				<>
					<label htmlFor="">{label}</label>
					<select
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						required
						className="form-options"
					>
						<option className="form-options" value="">
							Select a type
						</option>
						{types.map((type) => (
							<option
								className="form-options"
								key={type.name}
								value={type.name}
							>
								{type.name}
							</option>
						))}
					</select>
				</>
			) : (
				<>
					<label htmlFor="">{label}</label>
					<input
						name={name}
						type="text"
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						required
					/>
					<span className="error-form" style={errorStyles}>
						{error ? error : ''}
					</span>
				</>
			)}
		</div>
	);
}

export default FormInput;
