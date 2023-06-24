import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import "./navbar.css";

const Navbar = () => {
	const context = useContext(ShoppingCartContext);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const activeStyle = "underline underline-offset-4";

	return (
		<nav className="custom-navbar flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-[#fffc]">
			<Bars3Icon
				className="h-10 w-10 md:hidden"
				onClick={() => {
					setIsNavOpen(!isNavOpen);
				}}
			/>
			<ul
				className={
					"flex items-center gap-3" +
					(isNavOpen ? "" : " [@media(max-width:767px)]:hidden")
				}
			>
				<li className="font-semibold text-lg">
					<NavLink to="/">Shopi</NavLink>
				</li>
				<li>
					<NavLink
						to="/"
						onClick={() => context.setSearchByCategory()}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						All
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/clothes"
						onClick={() => context.setSearchByCategory("clothes")}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Clothes
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/electronics"
						onClick={() => context.setSearchByCategory("electronics")}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Electronics
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/furniture"
						onClick={() => context.setSearchByCategory("furniture")}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Furniture
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/shoes"
						onClick={() => context.setSearchByCategory("shoes")}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Shoes
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/others"
						onClick={() => context.setSearchByCategory("others")}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Others
					</NavLink>
				</li>
			</ul>
			<ul
				className={
					"flex items-center gap-3" +
					(isNavOpen ? "" : " [@media(max-width:767px)]:hidden")
				}
			>
				{!!context.isUserLoggedIn && (
					<>
						<li className="text-black/60">
							<NavLink to="/my-account">{context.account.email}</NavLink>
						</li>
						<li>
							<NavLink
								to="/my-orders"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								My Orders
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/my-account"
								className={({ isActive }) =>
									isActive ? activeStyle : undefined
								}
							>
								My Account
							</NavLink>
						</li>
					</>
				)}
				<li>
					<NavLink
						to={`${context.isUserLoggedIn ? "/" : "/sign-up"}`}
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
						onClick={context.logout}
					>
						{!!context.isUserLoggedIn && "Log out"}
						{!context.isUserLoggedIn && "Sign Up"}
					</NavLink>
				</li>
				{!!context.isUserLoggedIn && (
					<>
						<li className="flex items-center">
							<ShoppingBagIcon className="h-6 w-6 text-black"></ShoppingBagIcon>
							<div>{context.cartProducts.length}</div>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
