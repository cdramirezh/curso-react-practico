import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
	// Shopping Cart · Increment quantity
	const [count, setCount] = useState(0);

	// Product Detail · Open/Close
	const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
	const openProductDetail = () => setIsProductDetailOpen(true);
	const closeProductDetail = () => setIsProductDetailOpen(false);

	// Checkout Side Menu · Open/Close
	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
	const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
	const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

	// Product Detail · Show product
	const [productToShow, setProductToShow] = useState({});

	// Shopping Cart · Add products to cart
	const [cartProducts, setCartProducts] = useState([]);

	// Shopping Cart · Order
	const [order, setOrder] = useState([]);

	// Get products
	const [items, setItems] = useState(null);
	const [filteredItems, setFilteredItems] = useState(null);

	// Get products by title
	const [searchByTitle, setSearchByTitle] = useState(null);

	// Get products by category
	const [searchByCategory, setSearchByCategory] = useState(null);

	const filteredItemsByTitle = (items, searchByTitle) => {
		return items?.filter((item) =>
			item.title.toLowerCase().includes(searchByTitle.toLowerCase())
		);
	};

	const filteredItemsByCategory = (items, searchByCategory) => {
		return items?.filter((item) =>
			item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
		);
	};

	const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
		if (searchType === "BY_TITLE") {
			return filteredItemsByTitle(items, searchByTitle);
		}

		if (searchType === "BY_CATEGORY") {
			return filteredItemsByCategory(items, searchByCategory);
		}

		if (searchType === "BY_TITLE_AND_CATEGORY") {
			return filteredItemsByCategory(items, searchByCategory).filter((item) =>
				item.title.toLowerCase().includes(searchByTitle.toLowerCase())
			);
		}

		if (!searchType) {
			return items;
		}
	};

	useEffect(() => {
		if (searchByTitle && searchByCategory)
			setFilteredItems(
				filterBy(
					"BY_TITLE_AND_CATEGORY",
					items,
					searchByTitle,
					searchByCategory
				)
			);
		if (searchByTitle && !searchByCategory)
			setFilteredItems(
				filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
			);
		if (!searchByTitle && searchByCategory)
			setFilteredItems(
				filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
			);
		if (!searchByTitle && !searchByCategory)
			setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
	}, [items, searchByTitle, searchByCategory]);

	// Account, Login and logout related elements

	const [account, setAccount] = useState({});
	const login = (username, password) => {
		let accounts = JSON.parse(localStorage.getItem("accounts"));
		let account = accounts.find((account) => account.username === username);
		if (!account) {
			throw new Error("User doesn't exist");
		} else if (account.password != password) {
			throw new Error("Wrong password!");
		} else {
			localStorage.setItem("account", JSON.stringify({ username, password, email: account.email }));
			setAccount({ username, password, email: account.email });
		}
	};
	const logout = () => {
		localStorage.setItem("account", null);
		setAccount({});
	};
	const signUp = (username, email, password) => {
		// console.log({username, email, password})
		let accounts = JSON.parse(localStorage.getItem("accounts"));
		if (accounts) {
			// user/email already exist
			// console.log(accounts.some(a.username === username))
			if (accounts.some((a) => a.username === username)) {
				throw new Error("User already exists");
			}
			// new user
			accounts.push({ username, email, password });
		} else {
			accounts = [{ username, email, password }];
		}
		localStorage.setItem("accounts", JSON.stringify(accounts));

		// everything okay
		login(username, password);
	};

	useEffect(() => {
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((response) => response.json())
			.then((data) => setItems(data));
		
		const account = JSON.parse(localStorage.getItem('account'))
		if (!!account) {
			login(account.username, account.password)
		}
	}, []);

	const isUserLoggedIn = !!account.username

	return (
		<ShoppingCartContext.Provider
			value={{
				count,
				setCount,
				openProductDetail,
				closeProductDetail,
				isProductDetailOpen,
				productToShow,
				setProductToShow,
				cartProducts,
				setCartProducts,
				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,
				order,
				setOrder,
				items,
				setItems,
				searchByTitle,
				setSearchByTitle,
				filteredItems,
				searchByCategory,
				setSearchByCategory,
				account,
				login,
				logout,
				signUp,
				isUserLoggedIn,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
