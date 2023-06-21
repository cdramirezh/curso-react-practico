import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

const RouteProtector = ({ children }) => {
	const context = useContext(ShoppingCartContext);
	if (!context.isUserLoggedIn) {
		return <Navigate to="/log-in" replace />;
	}
	return children;
};

export { RouteProtector };
