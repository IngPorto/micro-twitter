import React, { useState } from 'react'
import { API_SERVER_ROUTE } from '../../static-global-variables.json'
import bg_imagen from '../../public/images/bg.jpg'

export default function Landing(props) {
	const [slug, setSlug] = useState()
	const [password, setPassword] = useState()
	const [feedbackMsn, setFeedBk] = useState()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const auth = await fetch(API_SERVER_ROUTE + '/api/user/auth', {
			method: 'POST',
			body: JSON.stringify({
				slug,
				password
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
		const response = await auth.json()
		if (response) {
			await props.setUser(response)
		}else {
			// Usuario no encontrado
			//console.log(feedbackMsn)
			await (feedbackMsn.innerHTML = 'Usuario desconocido')
			await feedbackMsn.classList.add("d-block");
			await feedbackMsn.classList.add("text-danger");
		}
		console.log(response)
	}

	const handleChange = e => {
		switch (e.target.name) {
			case 'slug': setSlug(e.target.value); break;
			case 'password': setPassword(e.target.value); break;
		}
		console.log(e.target.value)
	}

	return (
		<div className="landing">
			<nav className="nav">
				<a className="nav-link active mt-text h5 text-white">Micro Twitter • <span className="share-you lead">share you</span></a>
			</nav>
			<div className="header">
				<div className="centrador">
					<div className="titulos container">
						<p className="h1 text-white">Escribe y comparte</p>
						<p className="h1 text-white">Esto no es un Twitter, pero casi.</p>
						<p className="text-white">Aquí encontrarás un ambiente creado con el stack MERN.</p>
					</div>
					<div className="container">
						<div className="user-action-form card">
							<div className="card-body p-4">
								<p className="h5 mb-3">Inicia</p>
								<form onSubmit={handleSubmit}>
									<input className="form-control mb-3" type="text" placeholder="nickname" name="slug" onChange={handleChange} />
									<input className="form-control mb-3" type="password" placeholder="contraseña" name="password" onChange={handleChange} />
									<p className="feedback-message d-none" id="feedback-message" ref={ref => setFeedBk(ref)}></p>
									<button className="btn btn-success btn-sm btn-block mb-3" type="submit">Entrar</button>
									<p className="mb-0 text-center text-primary">No tengo cuenta</p>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="sign">
					<p className="text-white text-center">@ingporto</p>
				</div>
				<div className="oscurecedor"></div>

			</div>
			<style jsx>{`
			.nav {
				background-color: #000!important;
				z-index: 2;
				position: fixed;
				width: 100vw;
				top: 0;
			}
			.mt-text {
			}
			.share-you {
				font-size: 0.95rem;
			}
			.black-bg {
				background-color: #1c1c1c
			}
			.header {
				background: url(/images/bg.jpg);
				background-repeat: no-repeat;
				background-size: cover;
				background-position-x: center;
				height: 100vh;
				width: 100vw;
				position: absolute;
				top: 0;
				z-index: 1;
				display: flex;
			}
			.centrador {
				margin: auto;
			}
			.feedback-message {
			}
			.sign {
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100vw;
			}
			.sign p {

			}
			.oscurecedor {
				background-color: rgba(0, 0 ,0 ,0.5);
				position: absolute;
				top: 0;
				left: 0;
				height: 100vh;
				width: 100vw;
				z-index: -2;
			}
			`}</style>
		</div>
	)
}