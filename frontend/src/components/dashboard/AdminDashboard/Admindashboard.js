import axios from 'axios'
import React,{useEffect, useState} from 'react'
import '../dashboard.css'
import {logout} from '../../../helpers/auth'
import { useNavigate } from 'react-router-dom'
import {useStateValue} from '../../../StateProvider'
import  {toast} from 'react-toastify'
import CreateProduct from './Createproducts'
import AdminOrders from './AdminOrders'
import Uploadlist from './Uploadlist'
import Adminmessage from './Adminmessage'

export default function Admindashboard() {
  
  const navigate = useNavigate();
   
  const [{user}, dispatch] = useStateValue();

  const signOut = () => {
    logout(() => {
  
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/");
      toast.success('You have logged out successfully')
    })
  };
  

  const [toggleState,setToggleState] = useState(1)

const toggleTab = (index) => {
  setToggleState(index)
}

const [users,setUsers] = useState([]);

const getUsers = async () => {
  const res = await axios.get('/api/users');
  setUsers(res.data.users)
}

useEffect(() => {
  getUsers()
},[])


  return (
    <div className="container-fluid">

    <div className="tabs-block">
      <div className={toggleState ===1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Profile</div>
      <div className={toggleState ===2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Users List</div>
      <div className={toggleState ===3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>User Orders</div>
      <div className={toggleState ===4 ? "active-tabs" : "tabs"} onClick={() => toggleTab(4)}>Upload Files</div>
      <div className={toggleState ===5 ? "active-tabs" : "tabs"} onClick={() => toggleTab(5)}>Upload List</div>
      <div className={toggleState ===6 ? "active-tabs" : "tabs"} onClick={() => toggleTab(6)}>Message</div>

    </div>

    <div className="content-tabs">

      <div className={toggleState === 1 ? "content active-content": "content"}>

      <div className="mt-5">
  <h5>Profile</h5>
    <span style={{fontSize:'150px'}}><i className="fa-solid fa-user"></i></span>
    <div>
      <p>Username: <span>{user.username}</span></p>      
    </div>
    <button className="border-0 py-1 btn px-2 bg-primary text-white" onClick={signOut}>Sign Out</button>
  </div>

</div>

<div className={toggleState === 2 ? "content active-content" : "content"}>
      <div className="d-flex justify-content-around">
      <p>Name</p>
      <p>Email</p>
  </div>

    <div className="d-flex justify-content-around">
      <div style={{width:"200px"}}>
        {users.length>0 && users.slice(1).map((user)=> <p>{user.username}</p>)}
      </div>
<div>
        {users.length>0 && users.slice(1).map((user)=> <p>{user.email}</p>)}

</div>

        </div>


        </div>


<div className={toggleState === 3? "content active-content" : "content"}>
<AdminOrders/>
</div>

    </div>

    <div className={toggleState === 4? "content active-content" : "content"}>

    <CreateProduct/>

    </div>

    <div className={toggleState === 5? "content active-content" : "content"}>

    <Uploadlist/>

    </div>

    <div className={toggleState === 6? "content active-content" : "content"}>

<h5 className="text-center">Message</h5>

   <Adminmessage/>

</div>


    </div>
  )
}
