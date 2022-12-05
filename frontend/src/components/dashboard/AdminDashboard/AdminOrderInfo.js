import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useStateValue } from '../../../StateProvider'
import {useParams} from 'react-router-dom'

export default function AdminOrderInfo() {
 
 const [{user},dispatch] = useStateValue();

 const {id} = useParams();
 const [orders,setorders] = useState([])

 const fetchData = async () => {
  const res = await axios.get(`/api/orders/_id/${id}`)
  setorders(res.data)
 }

 useEffect(() => {
  fetchData(orders.orders)
 },[orders.orders])

 const [refund,setrefund] = useState(orders)

 const deletelist = async (id) => {
  await axios.delete(`/api/orders/${id}`)
  toast.success("User's order has been deleted successfully")
  setTimeout(function (){
   window.location.href="/admin/dashboard"
  },1500)
 }

 const refunded = async (id) => {
  await axios.put(`/api/orders/${id}`)
  await axios.post('/orders/addusermessage', {
    order_id:orders?._id,
    username:orders?.username,
    message:"We've got it. Your Refund is on its way to you"
  })
  await axios.post('/orders/adminmessage', {
    order_id:orders?._id,
    username:orders?.username,
    message:`You have refunded ${orders?.username} order`
  })
  toast.success("You have successfully refunded customer's orders")
  setTimeout(function() {
    window.location.href="/admin/dashboard"
  },1500)
 } 

 const [delivered, setdelivered] = useState(orders)

 const deliveredItem = async (id) => {

await axios.put(`/api/ordersdeliver/${id}`)
await axios.post('/orders/addusermessage', {
  order_id:orders?._id,
  username:orders?.username,
  message:'Delivered'
})

await axios.post('/orders/adminmessage', {
  order_id:orders?._id,
  username:orders?.username,
  message:`${orders?.username} order has been delivered`
})

toast.success('Delivered')
setTimeout(function(){
  window.location.href="/admin/dashboard"
})

 }

 const [cancelOrder, setcancelOrder] = useState(orders)

 const cancel = async (id) => {
  await axios.put(`/orders/get/${id}`)
  await axios.post('/orders/addusermessage', {
    order_id:orders?._id,
    username:orders?.username,
    message:'Your order has been cancelled'
  })
  await axios.post('/orders/adminmessage', {
    order_id:orders?._id,
    username:orders?.username,
    message:`You have cancelled ${orders?.username} order`
  })
  toast.success("You have cancelled user's order");
  setTimeout(function(){
  window.location.href="/admin/dashboard"
  },1500)
  }

 
 
  return (
    <div>

    <div className="d-flex order-details">
    
    <div className="bg-white bg-opacity-50 orders-info p-2">
    
    <h1>Order Details</h1>
    <hr></hr>
    <div className="d-flex justify-content-between orders-date">
      
      <div>
        <h5>Placed Order</h5>
        <p>Date: {orders.createdAt?.slice(0,10)}</p>
      </div>
    
      <div className="text-center">
        <h5>Time</h5>
        <p>{orders.createdAt?.slice(11,16)}</p>
      </div>
    
      <div>
        <h5>Order Id</h5>
        <p>{orders._id}</p>
      </div>
    
    </div>
    
    <hr></hr>
    
            {orders.products?.map((item)=> (
              <div style={{border:'1px solid darkgray'}} className="d-flex my-1 px-2 align-items-center justify-content-between orders-list">
    
              <div className="py-2">
                <img src={item.image} alt=""/>
              </div>
    
                <div className="w-50 px-2 text-center">
                <p5>Title</p5>
                <br></br>
                <p2>{item.title}</p2>
                </div>
    
                <div className="w-50 text-center">
                  <p5>Price</p5>
                  <p>£{item.price}</p>
                </div>
    
                <div className="text-center">
                  <p5>Storage</p5>
                  <p>{item.storage}</p>
                </div>
    
              </div>
         ))}
    
    {/* <p className={orders.Cancel === false ? 'order-cancelled': 'order-cancelled show'}>{orders.Refund === true ? 'REFUNDED' : 'ORDERCANCELLED'}</p>
       */}
     
 <div className={orders.Cancel === true ? 'd-none' : 'd-block'}>
      <p className={delivered === orders._id === orders.Delivered === true? 'delivered': 'delivered show'}>{orders.Refund === true ? 'REFUNDED' : 'DELIVERED'}</p>
 </div>
 
      <p className={cancelOrder === orders._id === orders.Cancel === true ? 'order-cancelled': 'order-cancelled show'}>ORDERCANCELLED</p>
     
         </div>
    
    <div className="bg-white bg-opacity-50 px-2 py-2 orders-address">
        
        <div>
    
      <h5>Customer's Address</h5>
      <hr></hr>
        <p>Username: {orders?.username}</p>
         <p>StreetName: {orders.address?.street}</p>
         <p>City: {orders.address?.city}</p>
         <p>PostCode: {orders.address?.postcode}</p>
         <p>Contact No: {orders.address?.phone}</p>
        </div>
    
        <hr></hr>
    
    <div className="d-flex justify-content-between align-items-center">
      <h5>TotalPrice</h5>
      <p>£{orders.amount}</p>
    </div>

    <div>
{orders.paymentCreate?.map((item) => (
  <>
  <hr></hr>
  <small style={{fontWeight:'bold'}}>Payment Info</small>
  <div className="d-flex justify-content-between align-items-center">
  <small>Card: <i className={`h6 fa-brands fa-cc-${item.card.brand}`}></i></small>
  <small>Ending in: {item.card.last4}</small>
  </div>
  </>
))}
</div>
    
    <hr></hr>
    
    
        <div>
          <h5>Actions</h5>
          <div className="d-flex justify-content-between">
          <button className="border-0 px-2 m-1 bg-danger btn" onClick={()=> deletelist(orders._id)}>Delete</button>
          
          <div className={orders.Delivered === true ? 'd-none' : 'd-block'}>
          <button className={cancelOrder === orders._id === orders.Cancel === true ? 'd-block btn px-2 bg-warning border-0 m-1' : "d-none" } onClick={()=> {cancel(orders._id);setcancelOrder(orders._id,!cancelOrder)}}>Cancel</button>
          </div>
          
          <div className={orders.Delivered === true ? 'd-block' : 'd-none'}>
          <button style={{position:'relative',zIndex:'10'}} className={refund === orders._id === orders.Refund === true ? "my-2 px-2 bg-secondary btn border-0 text-white" : 'd-none'} onClick={()=> {refunded(orders._id);setrefund(orders._id,!refund)}}>Refund</button>
          </div>

          <button style={{position:'relative',zIndex:'10'}} className={delivered === orders._id === orders.Delivered === true ? "my-2 px-2 bg-success btn border-0 text-white" : 'd-none'} onClick={()=> {deliveredItem(orders._id);setdelivered(orders._id,!delivered)}}>Delivered</button>
          
          </div>
    
    
        </div>
    
    
    </div>
            
         </div>
        </div>
  )
}
