import "./styles/Footer.css";
export default function Footer() {
	return (
		<footer className="main-footer">
			<div className="contact">
				<h3>Get in Touch</h3>

				<span>mezamateoj@gmail.com</span>
			</div>
			<div className="links">
				<h3>Connect</h3>

				<a
					href="https://github.com/mezamateoj"
					target="_blank"
					rel="noreferrer"
				>
					Github
				</a>
				<a
					href="https://www.linkedin.com/in/mezamateo/"
					target="_blank"
					rel="noreferrer"
				>
					Linkedin
				</a>
			</div>
			<div className="made">
				<h4 style={{ color: "#495057" }}>Made with ❤️ by Mateo Meza</h4>
			</div>
		</footer>
	);
}
