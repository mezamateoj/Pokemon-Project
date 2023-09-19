import './styles/CreatePokemon.css';

import { useState } from 'react';
import axios from 'axios';

function CreateImage({ prompt, setPrompt, image, setImage }) {
	const [loading, setLoading] = useState(false);

	const createImage = async (prompt) => {
		try {
			if (prompt === '') return alert('Please enter a prompt');
			setLoading(true);
			const res = await axios.post(`/images`, {
				prompt: prompt,
			});
			console.log(res.data);
			setImage(res.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			alert(error.response.data.error);
		}
	};

	return (
		<div className="create">
			<div>
				<label htmlFor="" style={{ color: '#fff' }}>
					Generate Image using DALL·E AI
				</label>
			</div>
			<div className="input">
				<input
					type="text"
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Enter a prompt to generate an image"
				/>
			</div>
			<div className="btn">
				<button onClick={() => createImage(prompt)}>Generate</button>
			</div>
			<div className="img">
				{loading ? (
					<p>Loading Image...</p>
				) : (
					<>
						{image && (
							<>
								<span>Image Preview:</span>
								<img
									src={image}
									alt="generated"
									width="150px"
								/>

								<span style={{ fontSize: 'small' }}>
									Copy and paste the Url in the image creation
									form!
								</span>
								<span
									style={{
										fontSize: 'x-small',
										textAlign: 'justify',
										padding: '10px 50px',
									}}
								>
									{image}
								</span>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default CreateImage;
