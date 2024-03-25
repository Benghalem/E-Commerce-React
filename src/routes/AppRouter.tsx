import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Layouts
import MainLayout from '@layouts/MainLayout/MainLayout'
// lazy Pages

const Home = lazy(() => import('@pages/Home'))
const Wishlist = lazy(() => import('@pages/Wishlist'))
const Categories = lazy(() => import('@pages/Categories'))
const AboutUs = lazy(() => import('@pages/AboutUs'))
const Products = lazy(() => import('@pages/Prodects'))
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const Cart = lazy(() => import('@pages/Home'))
const Error = lazy(() => import('@pages/Error'))
// normal Pages

/* import Home from '@pages/Home'
import Wishlist from '@pages/Wishlist'
import Categories from '@pages/Categories'
import AboutUs from '@pages/AboutUs'
import Products from '@pages/Prodects'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Error from '@pages/Error'
import Cart from '@pages/Cart'
 */

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <Error/>,
      children: [
        {
            index: true,
            element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home/>,
            </Suspense> 
            )
          },
          {
            path: "cart",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Cart/>,
              </Suspense> 
              )
          },
          {
            path: "wishlist",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Wishlist/>,
              </Suspense> 
              )
          },
          {
            path: "categories",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Categories/>,
              </Suspense> 
              )
          },
          {
            path: "categories/products/:prefix",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Products/>,
              </Suspense> 
              ),
            loader: ({ params }) => {
              if (
                typeof params.prefix !== "string" ||
                !/^[a-z]+$/i.test(params.prefix)
              ) {
                throw new Response("Bad Request", {
                  statusText: "Category not found",
                  status: 400,
                });
              }
              return true;
            },
          },
          {
            path: "about-us",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <AboutUs/>,
              </Suspense> 
              )
          },
          {
            path: "login",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Login/>,
              </Suspense> 
              )
          },
          {
            path: "register",
            element:  (
              <Suspense fallback={<div>Loading...</div>}>
                <Register/>,
              </Suspense> 
              )
          }
      ]
    }
  ])

const AppRouter = () => {
  return  <RouterProvider router={router}/>}

export default AppRouter