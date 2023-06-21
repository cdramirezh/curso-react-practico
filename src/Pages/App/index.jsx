import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import { LogIn } from '../LogIn'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import { SignUp } from '../SingUp'
import Navbar from '../../Components/Navbar'
import { RouteProtector } from '../../Components/RouteProtector'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/clothes', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/electronics', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/furnitures', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/toys', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/others', element: <RouteProtector><Home /></RouteProtector>},
    { path: '/my-account', element: <RouteProtector><MyAccount /></RouteProtector> },
    { path: '/my-order', element: <RouteProtector><MyOrder /></RouteProtector>},
    { path: '/my-orders', element: <RouteProtector><MyOrders /></RouteProtector>},
    { path: '/my-orders/last', element: <RouteProtector><MyOrder /></RouteProtector>},
    { path: '/my-orders/:id', element: <RouteProtector><MyOrder /></RouteProtector>},
    { path: '/sign-in', element: <SignIn /> },
		{ path: '/sign-up', element: <SignUp /> },
		{ path: '/log-in', element: <LogIn /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
