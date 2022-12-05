import React,{useEffect} from 'react'
import './Checkout.css'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../../StateProvider'
import Subtotal from '../Subtotal/Subtotal'

function Checkout() {

  let [{basket,user}, dispatch] = useStateValue()

 
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  },[basket])

  return (
<>

   {basket.length === 0 && (<p className="text-center h1">Your Cart is Empty</p>) }
{basket.length !== 0 && (

  
  <div className="checkout h-100 bg-white rounded-1 bg-opacity-50">

     <div className='checkout__left'>

      
    
        <h2 className="checkout__title">Your shopping basket</h2>
      

        {basket.map(item => (
          <CheckoutProduct
          slug={item.slug}
          title={item.title}
            image={item.image}
            color={item.color}
            storage={item.size}
            price={item.price}
          />
          ))}

      

     </div>

<div className='checkout__right'>
    <Subtotal/>
</div>

    </div>

)}      
</>
  )
}

export default Checkout
