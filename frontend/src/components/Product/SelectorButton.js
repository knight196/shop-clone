import React from 'react'
import './Product.css'

export default function SelectorButton({att, active, type, handleClick}) {
  return (
    <div onClick={()=> handleClick(type,att)} className={active ? "selectorItem btnactive" : "selectorItem"}>
      {att}
    </div>
  )
}
