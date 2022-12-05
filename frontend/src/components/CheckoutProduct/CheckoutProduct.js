import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from '../../StateProvider'

function CheckoutProduct({slug,image,title,price,color,storage}) {

const [{basket}, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            slug:slug,
        })
    }

  return (
    <div className='checkoutProduct'>

      <div className="bg-white mx-1">
      <img className='checkoutProduct__image img-fluid' src={image} alt=""/>
      </div>
    
    <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p>{color}</p>
         <p>{storage}</p>
            <strong>£{price}</strong>

<div>
    <button className="px-2 bg-primary border-0 rounded-1 text-white" onClick={removeFromBasket}>Remove</button>
</div>

    </div>


    
    </div>
  )
}


export default CheckoutProduct
