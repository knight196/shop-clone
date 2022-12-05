import React,{useReducer,useState,useEffect} from 'react'
import {Route,Routes} from 'react-router-dom'
import Products from '../components/Product/Product'
import Login from '../components/Account/Login'
import Home from '../components/Home/Home'
import ProductDetail from '../components/Product/ProductDetail'
import Checkout from '../components/Checkout/Checkout'
import Payment from '../components/Payment/Payment'
import Address from '../components/Address/Address'
import Signup from '../components/Account/SignUp'
import Userdashboard from '../components/dashboard/Userdashboard/Userdashboard'
import Admindashboard from '../components/dashboard/AdminDashboard/Admindashboard' 
import UserOrderInfo from '../components/dashboard/Userdashboard/OrdersInfo'
import AdminOrderInfo from '../components/dashboard/AdminDashboard/AdminOrderInfo'
import products from '../Data'
import Contact from '../components/Contact/Contact.js'
import Usercontactmsg from '../components/dashboard/Userdashboard/Usercontactmsg'
import AdminContactmsg from '../components/dashboard/AdminDashboard/AdminContactmsg'

import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


export default function RootChange() {


  const stripePromise = loadStripe('pk_test_51KsUrvGU7oHqY8oqn6aBdUfDfEiYScOmmQRVpizi8LNJoj7gM40t6rjQjbIxMtIWeTOm1oxOWzdr5JmRL0GCLBQ900J5HsnXVw')



  return (
    <div>
    
        <Routes>
          
        <Route path="/"  element={<Home products={products}/>}></Route>
          <Route path="/Product" element={<Products products={products}/>}></Route>
          <Route path="/Checkout"  element={<Checkout   products={products}/>}></Route>
          <Route path="/Address" element={<Address/>}></Route>
          <Route path="/Login"  element={<Login />}></Route>
          <Route path="/Signup"  element={<Signup />}></Route>
          <Route path="/user/dashboard" element={<Userdashboard/>}/>
          <Route path="/admin/dashboard" element={<Admindashboard/>}/>
           <Route  path="/api/products/slug/:slug" element={<ProductDetail products={products}/>}/>
           <Route  path="/orders/get/_id/:id" element={<UserOrderInfo/>}/>
           <Route  path="/orders/addcontactmsg/_id/:id" element={<Usercontactmsg/>}/>
           <Route  path="/api/addcontactmsg/_id/:id" element={<AdminContactmsg/>}/>
           <Route  path="/api/orders/_id/:id" element={<AdminOrderInfo/>}/>
           <Route  path="/payment" element={<Elements stripe={stripePromise}><Payment/></Elements>}/>
           <Route  path="/Contact" element={<Contact/>}/>
        
        </Routes>
 
    </div>
  )
}
