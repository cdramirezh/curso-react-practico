import { useContext, useState } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate()
	const context = useContext(ShoppingCartContext);
	const [userInputError, setUserInputError] =  useState(false)
	const [emailError, setEmailError] = useState(false)
	const [pwInputErr, setPwInputErr] = useState(false)
	const [isUsernameTaken, setIsUsernameTaken] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault()
		const username = event.target.username.value
		const email = event.target.email.value
		const password = event.target.password.value
		// Validations
		const [emptyUser, emptyPw, emptyEmail] = [!username, !password, !email]
		if (emptyUser) {
			setUserInputError(true)
		}
		if (emptyEmail) {
			setEmailError(true)
		}
		if (emptyPw) {
			setPwInputErr(true)
		}
		if (!emptyUser && !emptyPw && !emptyEmail) {
			try {
				context.signUp(username, email, password)
				navigate('/')
			} catch (e) {
				console.log('got it')
				setIsUsernameTaken(true)
			}
		}
	}

	return (
		<Layout>
			<div className={` flex items-center justify-center relative w-80 mb-4`}>
				<h1 className="font-medium text-xl">Sing Up</h1>
			</div>
			<form className="flex flex-col justify-center" onSubmit={handleSubmit}>
				<label htmlFor="username">Your username:</label>
				{isUsernameTaken && <p className="text-sm text-red-500">Username already taken</p>}
				<input
					onChange={() => {setUserInputError(false); setIsUsernameTaken(false)}}
					type="text"
					name="username"
					id="username"
					placeholder={`${(userInputError && !isUsernameTaken) ? "Write a username" : "Username"}`}
					className={`${
						userInputError ? "error" : ""
					} rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none`}
					autoComplete="on"
					required
				/>
				<label htmlFor="email">Your email:</label>
				<input
					onChange={() => {setEmailError(false)}}
					type="text"
					name="email"
					id="email"
					placeholder={`${emailError ? "Write a email" : "Email"}`}
					className={`${
						emailError ? "error" : ""
					} rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none`}
					autoComplete="on"
					required
				/>
				<label htmlFor="password">Your password:</label>
				<input
					onChange={() => {setPwInputErr(false)}}
					type="password"
					name="password"
					id="password"
					placeholder={`${pwInputErr ? "Write a password" : "Password"}`}
					className={`${
						pwInputErr ? "error" : ""
					} rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none`}
					autoComplete="on"
					required
				/>
				<button className="bg-black py-3 text-white w-80 rounded-lg">
					Checkout
				</button>
			</form>
			<Link className="mt-5 text-blue-500" to='/log-in'>Already have an account? log in!</Link>
		</Layout>
	);
};

export { SignUp };
