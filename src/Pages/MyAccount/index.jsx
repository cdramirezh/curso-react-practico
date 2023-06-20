import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Layout from "../../Components/Layout";

function MyAccount() {
	const context = useContext(ShoppingCartContext);
	
	return (
		<Layout>
			<div className="w-80">
				<h1 className="font-medium text-xl text-center mb-4">Welcome</h1>
				<p>
					Username: <b>{context.account.username}</b>
				</p>
				<p>
					Email: <b>{context.account.password}</b>
				</p>
				<button
					className="bg-black rounded-lg text-white py-3 w-full mt-4"
					onClick={context.logout}
				>
					Log Out
				</button>
			</div>
		</Layout>
	);
}

export default MyAccount;
