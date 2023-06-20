import { useContext, useState } from 'react'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import './login.css'

const LogIn = () => {
  const context = useContext(ShoppingCartContext)
	const [userInputError, setUserInputError] =  useState(false)
	const [pwInputErr, setPwInputErr] = useState(false)

	const handleSubmit = (event) => {

		event.preventDefault()
		const username = event.target.username.value
		const password = event.target.password.value
		// Validations
		const [emptyUser, emptyPw] = [!username, !password]
		if (emptyUser) {
			setUserInputError(true)
		}
		if (emptyPw) {
			setPwInputErr(true)
		}
		if (!emptyUser && !emptyPw) {
			try {
				context.login(username, password)
			} catch (error) {
				console.error(error)
				alert(error)
			}
		}
	}

	return(
		<Layout>
			<div className='flex items-center justify-center relative w-80 mb-4'>
				<h1 className='font-medium text-xl'>Log In</h1>
			</div>
			<form className='flex flex-col justify-center' onSubmit={handleSubmit}>
				<input
					onChange={()=>{setUserInputError(false)}}
					type="text"
					name='username'
					placeholder={`${userInputError ? 'Write a username': 'Username'}`}
					className={`${userInputError ? 'error': ''} rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none`}
					autoComplete='on'
					required
					/>
				<input
					onChange={()=>{setPwInputErr(false)}}
					type="password"
					name='password'
					placeholder={`${userInputError ? 'Write a password': 'Password'}`}
					className={`${pwInputErr ? 'error': ''} rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none`}
					autoComplete='on'
					required
				/>
				<button className='bg-black py-3 text-white w-80 rounded-lg'>LogIn</button>
			</form>
		</Layout>
	)
}

export { LogIn }