import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from '../pages/Home';
import Signup from "../pages/Signup";
import SignIn from "../pages/SignIn";
import Products from "../components/Products";
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";

function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
          errorElement: <ErrorPage/>
        },
        {
          path: "/signup",
          element: <Signup/>,
        },
        {
          path: "/signin",
          element: <SignIn/>,
        },
        {
          path: "/product/:id",
          element: <Products/>,
        },
        {
          path: "/cart",
          element: <Cart/>,
        }
      ]);
  return (
    <RouterProvider router={router} />

  )
}

export default Router
