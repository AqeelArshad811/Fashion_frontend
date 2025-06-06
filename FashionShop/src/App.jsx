import React from 'react'
import {HomeLayout,Register,Login,Error,Landing,Products,SingleProduct,Cart,About, Checkout,Profile} from "./pages"
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyUser from './pages/VerifyUser'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

///userside loaders
import { loader as productsLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'


///these are the admin routes
import {AdminLayout,AdminDashboard,ManageProducts,ManageOrders,AdminReviews,ManageUsers} from './pages/admin'


///adminside loaders
import { loader as adminProductsLoader } from './pages/admin/ManageProducts'
import { ToastContainer } from "react-toastify";
import { AdminAddProducts } from './components/Admin'
import { MyProvider } from './components/Admin/MyContext'



// import { loader as ManageProductsLoader } from './pages/admin/ManageProducts'

import { TryRoom } from './pages'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    children:[
      {
        index:true,
        element: <Landing/>,
        loader:productsLoader,
        errorElement: <Error/>
      },
      {
        path:"products",
        loader:productsLoader,
        element:<Products/>,
      },
      {
        path:"singleproduct/:id",
        loader:singleProductLoader,
        element:<SingleProduct/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"checkout",
        element:<Checkout/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"tryroom",
        element: <TryRoom/>
      },
      {
        path:"/profile",
        element:<Profile/>,
        errorElement:<Error/>
      },

    ]
  },
  {
    path:"/admin",
    element:<AdminLayout/>,
    children:[
      {
        index:true,
        element:<AdminDashboard/>
      },
      {
        index:true,
        path:"products",
        loader:adminProductsLoader,
        element:<ManageProducts/>
      },
      {
        path:"addproduct",
        element:<AdminAddProducts/>
      },
      {
        path:"users",
        element:<ManageUsers/>
      },
      {
        path:"orders",
        element:<ManageOrders/>
      },
      {
        path:"reviews",
        element:<AdminReviews/>
      }
      
    ]
    
  },
  {
    path:"/register",
    element:<Register/>,
    errorElement:<Error/>
  },
  {
    path:"/login",
    element:<Login/>,
    errorElement:<Error/>,

  },
  {
    path:"/forgotPassword",
    element:<ForgotPassword/>,
    errorElement:<Error/>
  },
  {
    path:"/reset-password/:token",
    element:<ResetPassword/>,
    errorElement:<Error/>
  },
  {
    path:"/verify-user",
    element:<VerifyUser/>,
    errorElement:<Error/>
  },
  
  
],
{
  future: {
    v7_startTransition: true,
  },
}

)

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'



const stripePromise = loadStripe("pk_test_51Qt5f1IAryIsUHT2nPjN4107b3zi0mUPd9b2LyVN6zj1QaTARwUxzxn3ng06heGxkRd0mYb6iZIS2So7YZyypXoG00ijl0rH8e")

const App = () => {
  return (
  <>
  <Elements stripe={stripePromise}>
    <MyProvider>
      <RouterProvider router={router}/>
      <ToastContainer />
    </MyProvider>
  </Elements>
  </>
  )
}

export default App